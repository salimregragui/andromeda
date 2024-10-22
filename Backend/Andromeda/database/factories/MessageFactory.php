<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Message;
use Faker\Generator as Faker;

$factory->define(Message::class, function (Faker $faker) {
    return [
        //
        'discussion_id' => factory(App\Discussion::class),
        'user_id' => 1,
        'text' => $faker->sentence(),
        'read' => 0,
    ];
});
