<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Word extends Model
{
    use Notifiable;

    protected $fillable = [
        'eng','ru','transcription'
    ];

    protected $hidden = [
    ];

    public function examples()
    {
        return $this->hasMany('App\Example');
    }
}
