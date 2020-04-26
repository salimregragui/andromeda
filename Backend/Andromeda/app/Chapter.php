<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    //
    protected $guarded = [];

    public function Section()
    {
        return $this->belongsTo(Section::class);
    }
}
