<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function getUsrRating(Request $request){
        $user = User::where('uid',$request->uid)->first();
        if($user) {
            $rating = $user->rating()->first();
            return $rating;
        }
        else{
            return response("User not found",404);
        }
    }
}
