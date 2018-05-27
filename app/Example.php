<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Example extends Model
{
    public function word()
    {
        return $this->belongsTo('App\Word');
    }
}
