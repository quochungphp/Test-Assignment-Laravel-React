<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Update
        User::chunk(50, function ($users) {
            foreach ($users as $user) {
                $user->update(['org_id' => 2]);
            }
        });
        // Create users
        $this->createUsers();
    }

    public function  createUsers() {
        $users = [
            [
                "name" => "admin1",
                "email"    => "admin1@gmail.com",
                "password" =>  Hash::make('123456@abc'),
                "org_id"   => 1
            ],
            [
                "name" => "admin2",
                "email"    => "admin2@gmail.com",
                "password" =>  Hash::make('123456@abc'),
                "org_id"   => 1
            ],
            [
                "name" => "user1",
                "email"    => "user1@gmail.com",
                "password" =>  Hash::make('123456@abc'),
                "org_id"   => 2
            ],
            [
                "name" => "user2",
                "email"    => "user2@gmail.com",
                "password" =>  Hash::make('123456@abc'),
                "org_id"   => 2
            ],
            [
                "name" => "user3",
                "email"    => "user3@gmail.com",
                "password" =>  Hash::make('123456@abc'),
                "org_id"   => 2
            ],
            [
                "name" => "user4",
                "email"    => "user4@gmail.com",
                "password" =>  Hash::make('123456@abc'),
                "org_id"   => 2
            ],
            [
                "name" => "user5",
                "email"    => "user5@gmail.com",
                "password" =>  Hash::make('123456@abc'),
                "org_id"   => 2
            ]
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }

}
