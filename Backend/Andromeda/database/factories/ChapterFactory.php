<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Chapter;
use Faker\Generator as Faker;

$factory->define(Chapter::class, function (Faker $faker) {
    return [
        //
        'name'=> $faker->sentence(),
        'number'=> $faker->randomDigitNotNull(),
        'section_id'=> factory(App\Section::class)->create(),
        'video'=> 'link_test',
    ];
});
