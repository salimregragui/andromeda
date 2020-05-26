<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    //
    protected $guarded = [];

    public function Chapter()
    {
        return $this->belongsTo(Chapter::class);
    }
    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
