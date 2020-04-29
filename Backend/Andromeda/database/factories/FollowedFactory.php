<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Course_user;
use Faker\Generator as Faker;

$factory->define(Course_user::class, function (Faker $faker) {
    return [
        //

        'course_id' => 1,#factory(App\Course::class),
        'user_id' => 1,#factory(App\User::class),
    ];
});
