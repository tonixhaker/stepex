<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function getUsrRating(Request $request){
        $user = User::where('uid',$request->uid)->first();
        $rating = $user->rating()->first();
        return $rating;
    }
}
