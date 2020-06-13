<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    //
    protected $guarded = [];

    public function Comment()
    {
        return $this->belongsTo(Comment::class);
    }
    public function User()
    {
        return $this->belongsTo(User::class);
    }
    public function Likes()
    {
        return $this->hasMany(Like::class)->latest();

    }
}
