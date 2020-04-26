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
        return $this->hasMany(Chapter::class);
    }

    public function Summary()
    {
        return $this->hasOne(Summary::class);
    }
}
