<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Comment;
use Faker\Generator as Faker;

$factory->define(Comment::class, function (Faker $faker) {
    return [
        //
        "chapter_id" => 1,
        "user_id" => 1,
        "content" => $faker->sentence(),
    ];
});
