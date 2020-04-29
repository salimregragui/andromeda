<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Bug;
use Faker\Generator as Faker;

$factory->define(Bug::class, function (Faker $faker) {
    return [
        //
        'user_id' => 1,
        'attachment' => 'bug.jpg',
        'approved' => 0,
        'repaired' => 0,
    ];
});
