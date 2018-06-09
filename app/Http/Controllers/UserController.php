<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function getCurrentUser(Request $request){
        //dd($request->uid);
        return User::where('uid',$request->uid)->first();
    }

}
