<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApiUsersTest extends TestCase
{
    /**
     * A basic feature test create a new user.
     *
     * @return void
     */
    public function testCreateUser()
    {
        $num = rand(10, 1000);
        $userData = [
            "name"          => "John Doe $num",
            "email"         => "doe$num@example.com",
            "password"      => "demo12345",
            "org_id"        => 1
        ];
        $this->json('POST', 'api/user/create', $userData, ['Accept' => 'application/json'])
        ->assertStatus(200)
        ->assertJsonStructure([
            "action",
            "data" => [],
            "status"
        ]);
    }
    /**
     * A basic feature test update user info
     *
     * @return void
     */
    public function testUpdateUser()
    {
        $userData = [
            "name"          => "User 2",
            "email"         => "user2@gmail.com",
            "password"      => "demo12345123",
            "org_id"        => 2
        ];
        $id = 4;
        $this->json('PUT', "api/user/update/$id", $userData, ['Accept' => 'application/json'])
        ->assertStatus(200)
            ->assertJsonStructure([
                "action",
                "data" => [],
                "status"
            ]);
    }

    /**
     * A basic feature test get user info
     *
     * @return void
     */
    public function testGetInfoUser()
    {
        $id = 1;
        $this->json('GET', "api/user/get-info/$id", ['Accept' => 'application/json'])
        ->assertStatus(200)
            ->assertJsonStructure([
                "data" => [
                    "created_at",
                    "email",
                    "name",
                    "id",
                    "org_id",
                    "updated_at"
                ]
            ]);
    }
    /**
     * A basic feature test delete a user
     *
     * @return void
     */

    public function testDeleteUser()
    {
        $id = 6;
        $this->json('DELETE', "api/user/delete/$id", ['Accept' => 'application/json'])
        ->assertStatus(200)
        ->assertJsonStructure([
            "action",
            "data"
        ]);
    }
}
