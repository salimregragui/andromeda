<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Result;
use Faker\Generator as Faker;

$factory->define(Result::class, function (Faker $faker) {
    return [
        //
        'user_id'=> 1,
        'quiz_id' => factory(App\Quiz::class),
        'rating' => 16,
    ];
});
