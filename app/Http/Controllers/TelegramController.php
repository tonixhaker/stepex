<?php
namespace App\Http\Controllers;
use App\User;
use App\UserRating;
use App\UserWords;
use App\Word;
use Illuminate\Http\Request;
use SimpleXMLElement;
use Telegram\Bot\Laravel\Facades\Telegram;
use Telegram\Bot\Api;
class TelegramController extends Controller
{
    public function webhook(){
        $update = Telegram::getWebhookUpdates();
        error_log($update);
        try {
            $user = User::where('uid','=', $update['message']['from']['id'])->first();
            if($user && !isset($user->chat_id)){
                $user->chat_id = isset($update['message']['chat']['id']) ? $update['message']['chat']['id'] : null;
                $user->save();
            }
            if(isset($update['message']['entities'][0]['type']) && $update['message']['entities'][0]['type']=='bot_command') {
                $this->commandsHandler($update);
            }
            else if(isset($update['message']['text']) && $user){
                $this->userroute($update['message']['text'], $user);
            }
            else if(isset($update['message']['connected_website'])){
                if($user){
                    $response = Telegram::sendMessage([
                        'chat_id' => $user->chat_id,
                        'text' => "C возвращением!) Как у людей говорят: 'Я скучал без тебя =)'"
                    ]);
                }
            }
            else{
                $this->wrong_input($update);
            }
        }
        catch (\Exception $e){
            error_log($e);
        }
        return 'ok';
    }
    public function commandsHandler($update){
        switch ($update['message']['text']){
            case '/start':$this->start_command($update);break;
            default:$this->wrong_command($update);break;
        }
    }
    public function check_chat_id($update){
        $user = User::where('uid','=', $update['message']['from']['id'])->first();
        if($user && ! $user->chat_id){
            $user->chat_id = $update['message']['chat']['id'];
            $user->save();
        }else{
            $user = $this->newUser($update);
        }

        return $user;
    }

    public function newUser($update){
        $user = new User();
        $user->fname = isset($update['message']['from']['first_name']) ? $update['message']['from']['first_name'] : null;
        $user->lname = isset($update['message']['from']['last_name']) ? $update['message']['from']['last_name'] : null;
        $user->uname = isset($update['message']['from']['username'])? $update['message']['from']['username']:null;
        $user->chat_id = isset($update['message']['chat']['id']) ? $update['message']['chat']['id'] : null;
        $user->uid = isset($update['message']['from']['id']) ? $update['message']['from']['id'] : null;
        $user->status = 'menu';
        $user->save();
        $rating = new UserRating();
        $rating->user_id = $user->id;
        $rating->save();
        return $user;
    }

    public function start_command($update){
        $user = User::where('uid','=',$update['message']['from']['id'])->first();
        if(!$user){
            $user = $this->newUser($update);
            $this->main_menu($user, 'Привет '.$user->fname."! Я помогу тебе пополнить словарный запас и перевести текст в экстренной ситуации. Пиши мне в любое время, не стесняйся");
        }
        elseif ($user && ! $user->chat_id){
            $user->chat_id = $update['message']['chat']['id'];
            $user->save();
        }
        else{
            $this->main_menu($user);
        }
        return 'ok';
    }
    public function main_menu($user, $msg = "Ты в главном меню"){
        $keyboard = [
            ['Изучить новые слова'],
            ['Повторить изученные']
        ];
        $reply_markup = Telegram::replyKeyboardMarkup([
            'keyboard' => $keyboard,
            'resize_keyboard' => true,
            'one_time_keyboard' => true
        ]);
        $response = Telegram::sendMessage([
            'chat_id' => $user->chat_id,
            'text' => $msg,
            'reply_markup' => $reply_markup
        ]);
    }
    public function wrong_input($update){
        $response = Telegram::sendMessage([
            'chat_id' => $update['message']['chat']['id'],
            'text' => 'Прошу прощения, я всего лишь бот помогающий изучать Английский и мой разработчик запретил мне отвечать на подобные сообщения.',
        ]);
    }
    public function wrong_command($update){
        $response = Telegram::sendMessage([
            'chat_id' => $update['message']['chat']['id'],
            'text' => 'Не знаю я таких команд, sorry).',
        ]);
    }

    public function breakTestOrLearn($user){
        $user->status = 'menu';
        $user->count = 0;
        $user->failed = 0;
        $user->current = null;
        $user->words()->where('passed','=', 0)->delete();
        $user->save();

    }

    public function userroute($text, $user){
        if($user->status == 'test') {
            $this->user_test($user);
        }
        else if($user->status == 'word') {
            $this->check_word($text,$user);
        }
        elseif($user->status =='learn'){
            switch ($text) {
                case 'Знаю':
                    $this->learn_new($user);
                    break;
                case 'Изучить':
                    $this->save_word_to_user($user);
                    break;
                case 'МНЕ НАДОЕЛО!':
                    $this->breakTestOrLearn($user);
                    break;
                default:
                    $this->sentwordagain($user);
                    break;
            }
        }
        else{
            switch ($text) {
                case 'Изучить новые слова':
                    $this->init_learn($user);
                    break;
                case 'Повторить изученные':
                    $this->init_repeat($user);
                    break;
                default: $this->translate($text,$user);
            }
        }
    }
    public function sentwordagain($user){
        $keyboard = [
            ['Изучить'],
            ['Знаю'],
            ['МНЕ НАДОЕЛО!']
        ];
        $reply_markup = Telegram::replyKeyboardMarkup([
            'keyboard' => $keyboard,
            'resize_keyboard' => true,
            'one_time_keyboard' => true
        ]);
        $word = Word::find($user->current);
        $examples = $word->examples()->take(4)->get();
        $text = "<b>".$word->eng."</b>";
        if(isset($word->transcription)){
            $text = $text."<b> [".$word->transcription."]</b>";
        }
        $text = $text." - <i>".$word->ru."</i>\n\n";
        if(count($examples)>0) {
            $text = $text . "<b>Примеры использования:</b>\n";
            foreach ($examples as $example) {
                $text = $text . $example->eng . " - <i>" . $example->ru . "</i>\n";
            }
        }
        $response = Telegram::sendMessage([
            'chat_id' => $user->chat_id,
            'parse_mode'=>'html',
            'text' => $text,
            'reply_markup' => $reply_markup
        ]);
    }
    public function learn_new($user){
//        if($user->count<=1){
//            $user->status = 'test';
//            $user->save();
//            $this->user_test();
//            return 'ok';
//        }
        $user_word = new UserWords();
        $user_word->user_id = $user->id;
        $user_word->word_id = $user->current;
        $user_word->passed = 1;
        $user_word->save();
        $user->current = Word::whereNotIn('id', $user->words_id())->inRandomOrder()->first()->id;
        $user->save();
        $this->sentwordagain($user);
    }
    public function user_test($user){
        $cur_word_id = $user->words()->where('passed','=', 0)->inRandomOrder()->first();
        if(!$cur_word_id){
            $res = (10 - $user->failed)*10;
            $user->status = 'menu';
            $user->failed = 0;
            $user->save();
            if($res<0)
                $res = 0;
            $rating  = $user->rating()->first();
            $rating->totalrating += $res/100;
            $rating->save();
            $this->main_menu($user, "Тест пройден с результатом ".$res."%");
            return 'ok';
        }
        $cur_word_id = $cur_word_id->word_id;
        $cur_word = Word::where('id','=',$cur_word_id)->first();
        $user->status = 'word';
        $user->current = $cur_word_id;
        $user->save();
        $answers = [];
        $wrong = Word::where('id','!=',$user->current)->inRandomOrder()->take(3)->get();
        foreach ($wrong as $word){
            array_push($answers,$word->ru);
        }
        array_push($answers,$cur_word->ru);
        shuffle($answers);
        $keyboard = [
            [$answers[0], $answers[1]],
            [$answers[2], $answers[3]],
            ['МНЕ НАДОЕЛО!']
        ];
        $reply_markup = Telegram::replyKeyboardMarkup([
            'keyboard' => $keyboard,
            'resize_keyboard' => true,
            'one_time_keyboard' => true
        ]);
        $word = Word::find($user->current);
        $examples = $word->examples()->take(4)->get();
        $text = "<b>".$word->eng."</b>";
        $response = Telegram::sendMessage([
            'chat_id' => $user->chat_id,
            'parse_mode'=>'html',
            'text' => $text,
            'reply_markup' => $reply_markup
        ]);
    }
    public function save_word_to_user($user){
        if($user->count<=1){
            $rating = $user->rating()->first();
            $rating->tests_count += 1;
            $rating->save();
            $user->status = 'test';
            $user->save();
            $this->user_test($user);
            return 'ok';
        }
        $user_word = new UserWords();
        $user_word->user_id = $user->id;
        $user_word->word_id = $user->current;
        $user_word->passed = 0;
        $user_word->save();
        $user->count -= 1;
        $user->current = Word::whereNotIn('id',$user->words_id())->inRandomOrder()->first()->id;
        $user->save();
        $this->sentwordagain($user);
    }
    public function init_learn($user){
        $user->status = 'learn';
        $user->count = 10;
        $user->current = Word::whereNotIn('id',$user->words_id())->inRandomOrder()->first()->id;
        $user->save();
        $this->sentwordagain($user);
    }
    public function init_repeat($user){
        if($user->words()->count()<10){
            $this->main_menu($user, "Изучи хотя бы 10 слов =)");
            return 'ok';
        }
        $words = $user->words()->inRandomOrder()->take(10)->get();
        if(count($words)==0){
            $response = Telegram::sendMessage([
                'chat_id' => $user->chat_id,
                'text' => "Пока не изучено ни одного слова, повторять нечего."
            ]);
            return 'ok';
        }
        foreach ($words as $word){
            $word->passed = 0;
            $word->save();
        }
        $user->status = 'test';
        $user->failed=0;
        $user->save();
        $this->user_test($user);
    }
    public function check_word($text,$user){
        if($text=="МНЕ НАДОЕЛО!"){
            $this->breakTestOrLearn($user);
            $this->main_menu($user,"Окей, в другой раз)");
            return 'ok';
        }
        if(Word::where('id','=',$user->current)->first()->ru != $text){
            $user->failed += 1;
            $user->save();
            $rating = $user->rating()->first();
            $rating->false_answers+=1;
            $rating->save();
            $word = Word::where('id','=',$user->current)->first();
            $examples = $word->examples()->take(4)->get();
            $text = "К сожалению ответ не верный, ничего страшного, просто запомни это слово. \n\n<b>".$word->eng." [".$word->transcription."]</b> - "."<i>".$word->ru."</i>";
            $text = $text."\n\n<b>Примеры использования:</b>\n";
            foreach ($examples as $example){
                $text = $text.$example->eng." - <i>".$example->ru."</i>\n";
            }
            $response = Telegram::sendMessage([
                'chat_id' => $user->chat_id,
                'parse_mode'=>'html',
                'text' => $text
            ]);
        }
        else{
            $userword = UserWords::where('word_id','=',$user->current)->where('user_id','=',$user->id)->first();
            $userword->passed = 1;
            $userword->save();
            $rating = $user->rating()->first();
            $rating->true_answers+=1;
            $rating->save();
        }
        $this->user_test($user);
    }
    function translate($text,$user)
    {
//        $response = Telegram::sendMessage([
//            'chat_id' => $user->chat_id,
//            'text' => 'Сейчас, только в словарик подсмотрю, сек'
//        ]);
        try {
            $sURL = "https://translate.yandex.net/api/v1.5/tr/detect?key=" . env("TRANSLATE") . "&text=" . $text;
            $xml = simplexml_load_file($sURL);
            $from_lang = $xml['lang'];
            if ($from_lang == 'en') {
                $to_lang = 'ru';
            } else {
                $to_lang = 'en';
            }
            $sURL = "https://translate.yandex.net/api/v1.5/tr/translate?key=" . env("TRANSLATE") . "&text=" . $text . "&lang=" . $from_lang . "-" . $to_lang . "&format=plain";
            $xml = simplexml_load_file($sURL);
            $res = (string)$xml->text;
            $response = Telegram::sendMessage([
                'chat_id' => $user->chat_id,
                'text' => $res
            ]);
        }catch (\Exception $e){
            $response = Telegram::sendMessage([
                'chat_id' => $user->chat_id,
                'text' => "Я запутался, отправь текст покороче или попробуй еще разок. Не злись)"
            ]);
        }
        return 'ok';
    }
}
//"post-install-cmd": [
//    "Illuminate\\Foundation\\ComposerScripts::postInstall",
//    "php artisan optimize",
//    "php artisan migrate --force"
//]