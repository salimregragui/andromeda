<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Resource;
use Faker\Generator as Faker;

$factory->define(Resource::class, function (Faker $faker) {
    return [
        //
        'course_id' => 1,
        'type' => 'image',
        'name' => $faker->sentence(),
        'attachment' => 'link.jpg',
    ];
});
