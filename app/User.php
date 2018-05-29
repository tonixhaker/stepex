<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'fname','lname','uname','chat_id', 'status', 'current'
    ];

    protected $hidden = [
    ];

    public function words()
    {
        return $this->hasMany('App\UserWords');
    }

    public function words_id(){
        return $this->words()->pluck('word_id')->toArray();
    }

    public function rating()
    {
        return $this->hasOne('App\UserRating');
    }
}
