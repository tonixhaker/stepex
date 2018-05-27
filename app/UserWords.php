<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserWords extends Model
{
    public function word()
    {
        return $this->belongsTo('App\User');
    }
}
