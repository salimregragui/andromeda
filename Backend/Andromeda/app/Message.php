<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    //
    protected $guarded = [];

    public function UserSender()
    {
        return $this->belongsTo(User::class,'user_id_1');
    }

    public function UserReceiver()
    {
        return $this->belongsTo(User::class,'user_id_2');
    }

    public function Discussion()
    {
        return $this->belongsTo(Discussion::class);
    }
}
