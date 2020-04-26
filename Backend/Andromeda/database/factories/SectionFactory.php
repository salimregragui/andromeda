<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Section;
use Faker\Generator as Faker;

$factory->define(Section::class, function (Faker $faker) {
    return [
        //
        'name'=> $faker->sentence(),
        'course_id' => factory(App\Course::class)->create(),
        'number'=> $faker->randomDigitNotNull(),
    ];
});
