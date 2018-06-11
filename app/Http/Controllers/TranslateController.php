<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TranslateController extends Controller
{
    public function translateText(Request $request){
        return response()->json(['to_text'=>'translation!']);
    }
}
