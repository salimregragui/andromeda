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
    
    public function results()
    {
        return $this->hasMany(Result::class);
    }

    public function Result(User $user)
    {
        return Result::where(['user_id' => $user->id , 'quiz_id' => $this->id])->first();
    }
}
