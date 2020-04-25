<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Course;
use Faker\Generator as Faker;

$factory->define(Course::class, function (Faker $faker) {
    return [
        //
        'user_id' => factory(App\User::class),
        'name'=> $faker->sentence(),
        'description' => $faker->paragraph(),
    ];
});
