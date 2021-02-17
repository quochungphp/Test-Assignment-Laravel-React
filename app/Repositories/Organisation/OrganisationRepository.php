<?php

namespace App\Repositories\Organisation;

use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\DB;

class OrganisationRepository extends BaseRepository
{
    // Get matching model
    public function getModel()
    {
        return \App\Models\Organisations::class;
    }
    // Return data list
    public function getList()
    {
        $query = $this->model
                      ->from('organisations as org')
                      ->leftJoin('users', 'org.id', '=' , 'users.org_id')
                      ->select('org.*', DB::raw("count(users.id) as total_user"))
                      ->groupBy('org.id')
                      ->orderBy('id', 'DESC');
        return $query->get();
    }
}
