<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    //
    protected $guarded = [];

    public function Course()
    {
        return $this->belongsTo(Course::class);
    }
}
