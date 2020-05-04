<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    //
    protected $guarded = [];

    public function Course()
    {
        return $this->belongsTo(Course::class);
    }

    public function Chapters()
    {
        return $this->hasMany(Chapter::class)->orderBy('number', 'asc');
    }

    public function Summary()
    {
        return $this->hasOne(Summary::class);
    }

    public function Quiz()
    {
        return $this->hasOne(Quiz::class);
    }
}
