<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Progression;
use Faker\Generator as Faker;

$factory->define(Progression::class, function (Faker $faker) {
    return [
        //
        'user_id' => 1,
        'course_id' => 1,
        'chapter_id' => 1,
    ];
});
