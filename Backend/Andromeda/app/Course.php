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

    public function Resources()
    {
        return $this->hasMany(Resource::class);
    }

    public function Followed()
    {
        // permet de lister les utilisateur qui suivent ce cour
        return $this->belongsToMany('App\User')->using('App\Course_user');
    }

}
