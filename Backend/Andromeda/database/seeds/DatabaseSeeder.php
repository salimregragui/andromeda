<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        factory(App\Chapter::class)->create();
        factory(App\Summary::class)->create();
        factory(App\Subscription::class)->create();
        factory(App\Course_user::class)->create();
        factory(App\Result::class)->create();
        factory(App\Resource::class)->create();
        factory(App\Question::class)->create();
        factory(App\Notification::class)->create();
        factory(App\Message::class)->create();
        factory(App\Bug::class)->create();
        // je lie les utilisateur 1 et 2 a la premiere discussion
        $u=App\User::find(1);
        $u->Discussions()->attach(App\Discussion::find(1));
        $u=App\User::find(2);
        $u->Discussions()->attach(App\Discussion::find(1));
    }
}
