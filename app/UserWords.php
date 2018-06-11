<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserWords extends Model
{
    protected $appends = [
        'eng',
        'ru',
        'transcription',
        'examples'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function word(){
        return $this->hasOne(Word::class, 'id','word_id');
    }

    public function getEngAttribute()
    {
        return Word::find($this->word_id)->eng;
    }

    public function getRuAttribute()
    {
        return Word::find($this->word_id)->ru;
    }

    public function getTranscriptionAttribute()
    {
        return Word::find($this->word_id)->transcription;
    }

    public function getExamplesAttribute()
    {
        return Word::find($this->word_id)->examples()->take(4)->get();
    }
}
