<?php

namespace App\Http\Controllers;

use App\User;
use App\UserRating;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index(){
        //return view('welcome');
        //return view('logged');
        return $this->if_logged();
    }

    function if_logged()
    {
        if (isset($_COOKIE['tg_user'])) {
            $auth_data_json = urldecode($_COOKIE['tg_user']);
            $auth_data = json_decode($auth_data_json, true);
            $this->checkUser($auth_data);
            return view('logged');
        }
        return view('welcome');
    }

    public function checkUser($auth_data){
        $user = User::where('uid',$auth_data['id'])->first();
        if(!$user){
            $user = new User();
            $user->fname = isset($auth_data['first_name']) ? $auth_data['first_name'] : null;
            $user->lname = isset($auth_data['last_name']) ? $auth_data['last_name'] : null;
            $user->uname = isset($auth_data['username']) ? $auth_data['username'] : null;
            $user->uid = isset($auth_data['id']) ? $auth_data['id'] : null;
            $user->photo_url = isset($auth_data['photo_url']) ? $auth_data['photo_url'] : null;
            $user->status = 'menu';
            $user->save();
            $rating = new UserRating();
            $rating->user_id = $user->id;
            $rating->save();
        }
        else{
            if(isset($auth_data['photo_url'])) {
                $user->photo_url = $auth_data['photo_url'];
                $user->save();
            }
        }
        Auth::loginUsingId($user->id);
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
        if (isset($_SERVER['HTTP_COOKIE'])) {
            $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
            foreach($cookies as $cookie) {
                $parts = explode('=', $cookie);
                $name = trim($parts[0]);
                setcookie($name, '', time()-1000);
                setcookie($name, '', time()-1000, '/');
            }
        }
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
