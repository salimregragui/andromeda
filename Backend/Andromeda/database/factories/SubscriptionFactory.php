<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Subscription;
use Faker\Generator as Faker;

$factory->define(Subscription::class, function (Faker $faker) {
    return [
        //
            'user_id' => 1,
            'date_end' => $faker->dateTimeBetween('now', '+1 years'),

    ];
});
