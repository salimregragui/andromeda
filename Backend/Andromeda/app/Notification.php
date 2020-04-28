<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    //
    protected $guarded =[];

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
