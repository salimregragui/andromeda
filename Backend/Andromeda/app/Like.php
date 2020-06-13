<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $guarded =[];

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function Comment()
    {
        return $this->belongsTo(Comment::class);
    }
    public function response()
    {
        return $this->belongsTo(Response::class);
    }
}
