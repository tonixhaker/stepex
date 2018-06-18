<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::any(env('TELEGRAM_BOT_TOKEN').'/webhook', "TelegramController@webhook");
Route::post('/get_current_user', 'UserController@getCurrentUser');
Route::post('/get_current_rating', 'RatingController@getUsrRating');

Route::post('/get_translation','TranslateController@translateText');
Route::get('/get_langs_list','TranslateController@getLangs');

Route::post('/get_learned_words', 'WordsController@getLearnedWords');
Route::post('/get_not_learned_words', 'WordsController@getNotLearnedWords');
Route::post('/get_learned_words_page', 'WordsController@getLearnedWordsPage');
Route::post('/get_not_learned_words_page', 'WordsController@getNotLearnedWordsPage');
Route::post('/forget_word','WordsController@forgetWord');
Route::post('/learn_word','WordsController@learnWord');
Route::post('/get_random_word','WordsController@getRandom');

Route::post('/get_next','WordsController@nextWord');
Route::post('/check_word','WordsController@checkWord');

Route::post('/start_test','WordsController@startTest');
Route::post('/start_test_force','WordsController@startTestForce');
