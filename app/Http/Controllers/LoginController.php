<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function index(){
        return $this->if_logged();
    }

    function if_logged()
    {
        if (isset($_COOKIE['tg_user'])) {
            $auth_data_json = urldecode($_COOKIE['tg_user']);
            $auth_data = json_decode($auth_data_json, true);
            return view('logged');
        }
        return view('welcome');
    }
    public function login(){

        if (isset($_COOKIE['tg_user'])){
            return redirect('/');
        }
            try {
            $auth_data = $this->checkTelegramAuthorization($_GET);
            $this->saveTelegramUserData($auth_data);
            return redirect('/');
        } catch (Exception $e) {
            die ($e->getMessage());
        }
    }

    public function logout(){
        setcookie('tg_user', '');
        return redirect('/');
    }

    function checkTelegramAuthorization($auth_data) {
        $check_hash = $auth_data['hash'];
        unset($auth_data['hash']);
        $data_check_arr = [];
        foreach ($auth_data as $key => $value) {
            $data_check_arr[] = $key . '=' . $value;
        }
        sort($data_check_arr);
        $data_check_string = implode("\n", $data_check_arr);
        $secret_key = hash('sha256', env('TELEGRAM_BOT_TOKEN'), true);
        $hash = hash_hmac('sha256', $data_check_string, $secret_key);
        if (strcmp($hash, $check_hash) !== 0) {
            throw new Exception('Data is NOT from Telegram');
        }
        if ((time() - $auth_data['auth_date']) > 86400) {
            throw new Exception('Data is outdated');
        }
        return $auth_data;
    }
    function saveTelegramUserData($auth_data) {
        $auth_data_json = json_encode($auth_data);
        setcookie('tg_user', $auth_data_json);
    }



}
