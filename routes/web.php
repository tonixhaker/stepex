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

Route::get('/', 'LoginController@index');
Route::get('/user', 'LoginController@index');
Route::get('/statistic', 'LoginController@index');
Route::get('/words', 'LoginController@index');
Route::get('/logout', 'LoginController@logout');
Route::get('/login', 'LoginController@login');
