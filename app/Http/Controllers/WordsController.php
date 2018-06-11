<?php

namespace App\Http\Controllers;

use App\User;
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
}
