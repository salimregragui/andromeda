<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Summary;
use Faker\Generator as Faker;

$factory->define(Summary::class, function (Faker $faker) {
    return [
        //
        'section_id' => 1,
        'content'=> $faker->paragraph(),
    ];
});
