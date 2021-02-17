<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class OrganizationsTableSeeder extends Seeder
{
    public $_table = "organisations";
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table($this->_table)->truncate();

        $adminRoles = ["CREATE" => true,"READ" => true, "UPDATE" => true, "CHANGE" => true];
        $employeeRoles = ["CREATE" => false, "READ" => true, "UPDATE" => false, "CHANGE" => false];
        $guestRoles = ["CREATE" => false, "READ" => false, "UPDATE" => false, "CHANGE" => false];

        $data = [
            ['ADMIN', serialize($adminRoles)],
            ['EMPLOYEE ', serialize($employeeRoles)],
            ['GUEST', serialize($guestRoles)],
        ];


        foreach ($data as $el) {
            DB::table($this->_table)->insert([
                'name' => $el[0],
                'policy' => $el[1]
            ]);
        }
    }
}
