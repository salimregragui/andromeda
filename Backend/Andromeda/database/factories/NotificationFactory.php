<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Notification;
use Faker\Generator as Faker;

$factory->define(Notification::class, function (Faker $faker) {
    return [
        //
        'user_id' => 1,
        'content' => $faker->sentence(),
        'type' => 'text',
        'seen' => 0,
    ];
});
