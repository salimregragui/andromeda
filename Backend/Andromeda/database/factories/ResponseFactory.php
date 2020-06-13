<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Response;
use Faker\Generator as Faker;

$factory->define(Response::class, function (Faker $faker) {
    return [
        "comment_id" => 1,
        "user_id" => 1,
        "content" => $faker->sentence(),
    ];
});
