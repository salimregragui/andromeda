<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    //
    protected $guarded = [];

    public function Section()
    {
        return $this->belongsTo(Section::class);
    }

    public function Questions()
    {
        return $this->hasMany(Question::class);
    }
}
