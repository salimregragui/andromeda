<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Message;
use Faker\Generator as Faker;

$factory->define(Message::class, function (Faker $faker) {
    return [
        //
        'discussion_id' => factory(App\Discussion::class),
        'user_id_1' => 1,
        'user_id_2' => factory(App\User::class),
        'text' => $faker->sentence(),
        'attachment' => 'none',
        'read' => 0,
    ];
});
