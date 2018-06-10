<?php

namespace App\Http\Controllers;

use App\User;
use App\Word;
use Illuminate\Http\Request;

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
}
