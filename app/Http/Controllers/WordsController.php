<?php

namespace App\Http\Controllers;

use App\User;
use App\UserWords;
use App\Word;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class WordsController extends Controller
{
    public function getLearnedWords(Request $request){
        $user = User::where('uid',$request->uid)->first();
        if($user) {
            return $user->words()->paginate(10);
        }
        else{
            return response("User not found",404);
        }
    }

    public function getNotLearnedWords(Request $request){
        $user = User::where('uid',$request->uid)->first();
        if($user) {
            $words = Word::whereNotIn('id', $user->words_id())->with('examples')->paginate(10);
            return $words;
        }
        else{
            return response("User not found",404);
        }
    }


    public function getNotLearnedWordsPage(Request $request){
        $user = User::where('uid',$request->uid)->first();
        if($user) {
            $per_page = $request->pageSize;
            $currentPage = $request->current;
            Paginator::currentPageResolver(function () use ($currentPage) {
                return $currentPage;
            });
            //$words = Word::whereNotIn('id', $user->words_id())->with('examples')->paginate($per_page);
            $query = Word::whereNotIn('id', $user->words_id())->with('examples');
            if($request->search) {
                $search = $request->search;

                $query->where('eng','like',"%{$search}%");
                $query->orWhere('ru','like',"%{$search}%");
                $query->orWhere('transcription','like',"%{$search}%");
            }
            return $query->paginate($per_page);
        }
        else{
            return response("User not found",404);
        }
    }

    public function getLearnedWordsPage(Request $request){
        $user = User::where('uid',$request->uid)->first();
        if($user) {
            $per_page = $request->pageSize;
            $currentPage = $request->current;
            Paginator::currentPageResolver(function () use ($currentPage) {
                return $currentPage;
            });
            //$user->words()->paginate($per_page);
            $query = $user->words();
            if($request->search) {
                $search = $request->search;
                $query->whereHas('word', function ($q) use ($search){
                    $q->where('eng','like',"%{$search}%");
                    $q->orWhere('ru','like',"%{$search}%");
                    $q->orWhere('transcription','like',"%{$search}%");
                });
            }
            return $query->paginate($per_page);
        }
        else{
            return response("User not found",404);
        }
    }

    public function forgetWord(Request $request){
        $user = User::find($request->user_id);
        if(!$user || !isset($request->word_id)){
            return response("User not found",404);
        }
        $user->words()->where('word_id',$request->word_id)->first()->delete();

    }

    public function learnWord(Request $request){
        $user = User::where('uid',$request->uid)->first();
        if(!$user || !isset($request->word_id)){
            return response("User not found",404);
        }

        $user_word = new UserWords();
        $user_word->user_id = $user->id;
        $user_word->word_id = $request->word_id;
        $user_word->passed = 1;
        $user_word->save();

    }

    public function getRandom(Request $request){
        $user = User::where('uid',$request->uid)->first();
        if(!$user){
            return response("User not found",404);
        }
        return Word::whereNotIn('id',$user->words_id())->inRandomOrder()->with('examples')->first();
    }

    public function startTest(Request $request){
        $user = User::where('uid',$request->uid)->first();
        if(!$user){
            return response("User not found",404);
        }

        $user->count = 10;
        $user->status = 'test';
        $user->failed=0;
        $user->save();
        return response()->json(['status'=>'success']);
    }

    public function nextWord(Request $request){
        $user = User::where('uid',$request->uid)->first();
        if(!$user){
            return response("User not found",404);
        }

        if($user->status!='test'){
            if($user->words()->count()>=10){
                $not_enough_words = false;
            }
            else{
                $not_enough_words = true;
            }
            return response()->json(['user_status'=>'main', "not_enough_words" => $not_enough_words]);
        }

        if($user->words()->count()<10){
            return response("Learn a fiew words please (at least 10)",404);
        }

        if($user->count>0){
            $word = $user->words()->inRandomOrder()->first();
            $fake = Word::where('id','!=',$word->id)->inRandomOrder()->take(3)->get();
            $user->site_current = $word->word_id;
            $user->save();

            $answers = [];
            foreach ($fake as $f){
                array_push($answers,$f->ru);
            }
            array_push($answers,$word->ru);
            shuffle($answers);
            if($user->words()->count()>=10){
                $not_enough_words = false;
            }
            else{
                $not_enough_words = true;
            }
            return response()->json([
                "word"=>$word,
                "fakes"=>$answers,
                "count"=>$user->count,
                "user_status"=>'test',
                "not_enough_words" => $not_enough_words
            ]);
        }
        $res = (10 -$user->failed) * 10;
        if($res<0)
        {
            $res=0;
            $user->status = 'main';
        }
        $rating  = $user->rating()->first();
        $rating->totalrating += $res/100;
        if(isset($user->site_current)){
            $rating->tests_count += 1;
            $user->current = null;
            $user->save();
        }
        $rating->save();
        return response()->json([
           "percent"=>$res,
            "user_status"=>'main',
            "count"=>0,
            "not_enough_words" => false
        ]);
    }

    public function checkWord(Request $request){
        $user = User::where('uid',$request->uid)->first();
        if(!$user || !$request->answer || !isset($user->site_current)){
            return response("User not found",404);
        }

        $word = Word::find($user->site_current)->ru;
        $rating = $user->rating()->first();
        $user->count-=1;
        $user->save();

        if($word == $request->answer){
            $rating->true_answers+=1;
            $rating->save();
            return response()->json(["previous_answer_status" => "success"]);
        }
        else{
            $user->failed += 1;
            $user->save();
            $rating->false_answers+=1;
            $rating->save();
            return response()->json(["previous_answer_status" => "wrong"]);
        }
    }


}
