<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    //
    protected $guarded = [];
    
    public function User()
    {
        return $this->hasOne(User::class);
    }
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
}
