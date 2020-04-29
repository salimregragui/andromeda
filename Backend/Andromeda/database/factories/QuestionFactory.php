<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Question;
use Faker\Generator as Faker;

$factory->define(Question::class, function (Faker $faker) {
    return [
        //
        'quiz_id' => 1,
        'question' => $faker->sentence(),
        'response_1' =>  $faker->sentence(),
        'response_2' =>  $faker->sentence(),
        'response_3' =>  $faker->sentence(),
        'response_correct' => $faker->sentence(),
    ];
});
