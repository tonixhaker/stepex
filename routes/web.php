<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function(){
    return redirect('/user');
});
Route::get('/user', 'LoginController@index');
Route::get('/statistic', 'LoginController@index');
Route::get('/words', 'LoginController@index');
Route::get('/logout', 'LoginController@logout');
Route::get('/login', 'LoginController@login');
Route::get('/translator', 'LoginController@index');
Route::get('/learn_words', 'LoginController@index');

Route::any('adminer', '\Miroc\LaravelAdminer\AdminerController@index');

//Route::group([
//    'middleware' => ['api', 'cors'],
//    ], function ($router) {
//    Route::get('/get_current_user', 'UserController@getCurrentUser');
//});
