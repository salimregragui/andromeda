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
    public function Responses()
    {
        return $this->hasMany(Response::class);
    }
    public function Likes()
    {
        return $this->hasMany(Like::class)->latest();

    }
}
