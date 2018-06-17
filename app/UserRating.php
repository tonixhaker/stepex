<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserRating extends Model
{
    protected $fillable = [
        'tests_count','true_answers','false_answers', 'totalrating'
    ];

    protected $appends = [
        'user',
        'words_count',
        'total_words_count',
        'total_users_count',
        'users_smarter',
        'users_dumber',
        'same_rating'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function getUserAttribute(){
        return $this->user()->first();
    }

    public function getWordsCountAttribute(){
        return $this->user->words()->count();
    }

    public function getTotalWordsCountAttribute()
    {
        return Word::get()->count();
    }

    public function getTotalUsersCountAttribute()
    {
        return User::get()->count();
    }

    public function getUsersDumberAttribute()
    {
        $rating = $this->totalrating;
        return User::whereHas('rating', function ($query) use($rating) {
            $query->where('totalrating', '<', $rating);
        })->get()->count();
    }

    public function getUsersSmarterAttribute()
    {
        $rating = $this->totalrating;
        return User::whereHas('rating', function ($query) use($rating) {
            $query->where('totalrating', '>', $rating);
        })->get()->count();
    }

    public function getSameRatingAttribute()
    {
        $rating = $this->totalrating;
        $id = $this->id;

        return User::whereHas('rating', function ($query) use($rating, $id) {
            $query->where('totalrating', '=', $rating);
            $query->where('user_id','!=',$id);
        })->get()->count();
    }


}
