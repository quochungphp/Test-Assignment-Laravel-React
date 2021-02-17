<?php

namespace App\Repositories\User;

use App\Repositories\BaseRepository;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    // Get mactching current model
    public function getModel()
    {
        return \App\Models\User::class;
    }

    // Return data list
    public function getList($arraySearch = [])
    {
        $query = $this->model::leftJoin('organisations as org', 'users.org_id', '=', 'org.id')
                            ->orderBy('id', 'DESC');

        if (count($arraySearch) > 0) {
            $query->where(function ($query) use ($arraySearch) {
                if (isset($arraySearch['org_id'])) {
                    if ($arraySearch['org_id'] > 0) {
                        $query->where('users.org_id', $arraySearch['org_id']);
                    }
                }
                if (isset($arraySearch['name'])) {
                    $query->where('users.name', 'LIKE', "%{$arraySearch['name']}%");
                }
            });
        }
        return $query->get(['users.*', 'org.name as group_name']);
    }

    // Delete item, but don't remove admin group and itself
    public function deleteUser($id)
    {
        $result = $this->find($id);
        if ($result->org_id === 2) {
            if ($result) {
                $result->delete();
                return true;
            }
        }
        return false;
    }
}
