<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Telegram\Bot\Laravel\Facades\Telegram;
use Telegram\Bot\Api;

class TelegramController extends Controller
{

    public function webhook(){
        $update = Telegram::getWebhookUpdates();
//        error_log($update);
        try {
            if(isset($update['message']['entities'][0]['type']) && $update['message']['entities'][0]['type']=='bot_command') {
                $this->commandsHandler($update);
            }
            if(isset($update['message']['photo']) || isset($update['message']['sticker']) || isset($update['message']['document'])){
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

    public function start_command($update){
        //error_log('ok');
        $user = User::where('uid','=',$update['message']['from']['id'])->first();
        if(!$user){
            $user = new User();
            $user->fname = $update['message']['from']['first_name'];
            $user->lname = $update['message']['from']['last_name'];
            $user->uname = $update['message']['from']['username'];
            $user->chat_id = $update['message']['chat']['id'];
            $user->uid = $update['message']['from']['id'];
            $user->save();
            $this->new_user_response($user);
        }
        else{
            $this->main_menu($user);
        }
        return 'ok';
    }

    public function  new_user_response($user){

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
            'text' => 'Привет '.$user->fname."! Я помогу тебе пополнить словарный запас и перевести текст в экстренной ситуации. Пиши мне в любое время, не стесняйся",
            'reply_markup' => $reply_markup
        ]);
    }

    public function main_menu($user){
        $keyboard = [
            ['@ Изучить новые слова @'],
            ['@ Повторить изученные @']
        ];

        $reply_markup = Telegram::replyKeyboardMarkup([
            'keyboard' => $keyboard,
            'resize_keyboard' => true,
            'one_time_keyboard' => true
        ]);

        $response = Telegram::sendMessage([
            'chat_id' => $user->chat_id,
            'text' => 'Вы в главном меню',
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
            'text' => 'Не знаю я таких команд, простите.',
        ]);
    }

}
