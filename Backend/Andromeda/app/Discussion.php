<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Discussion extends Model
{
    //
    protected $guarded =[];

    public function Users()
    {
        return $this->hasMany(User::class);
    }

    public function Messages()
    {
        return $this->hasMany(Message::class);
    }
}