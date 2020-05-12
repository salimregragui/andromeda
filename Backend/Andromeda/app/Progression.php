<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Chapter;
use App\Course;

class Progression extends Model
{
    //
    protected $guarded = [];

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function Chapter()
    {
        return Chapter::where('id',$this->chapter_id)->first();
    }

    public function Course()
    {
        // a confirmer un user ne peut avoir plusieur progression dans le meme cours
        return Course::where('id',$this->course_id)->first();
    }
}
