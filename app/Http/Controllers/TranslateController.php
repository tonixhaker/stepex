<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TranslateController extends Controller
{
    public function translateText(Request $request){
        //return response()->json(['to_text'=>'translation!']);
        $from_lang = $request->from_lang;
        $to_lang = $request->to_lang;
        $from_text = $request->from_text;

        if($from_lang == 'auto'){
            $sURL = "https://translate.yandex.net/api/v1.5/tr/detect?key=" . env("TRANSLATE") . "&text=" . $from_text;
            $xml = simplexml_load_file($sURL);
            $from_lang = $xml['lang'];
        }
        $sURL = "https://translate.yandex.net/api/v1.5/tr/translate?key=" . env("TRANSLATE") . "&text=" . $from_text . "&lang=" . $from_lang . "-" . $to_lang . "&format=plain";
        $xml = simplexml_load_file($sURL);
        $res = (string)$xml->text;

        return response()->json([
            'to_text' => $res
        ]);

    }
}
