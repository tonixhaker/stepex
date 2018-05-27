<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'fname','lname','uname','chat_id'
    ];

    protected $hidden = [
    ];

    public function words()
    {
        return $this->hasMany('App\UserWords');
    }

    public function rating()
    {
        return $this->hasOne('App\UserRating');
    }
}
