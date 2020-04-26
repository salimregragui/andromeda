<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    //
    protected $guarded = [];

    public function User()
    {
        return $this->belongsTO(User::class);
    }

    public function Sections()
    {
        return $this->hasMany(Section::class);
    }
}
