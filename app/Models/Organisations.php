<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class Organisations extends Model
{
    protected $table = 'organisations';

    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'policy'
    ];

    /**
     * Get the policy attribute
     *
     * @param  string  $value
     * @return unserialize
     */
    public function getPolicyAttribute($value)
    {
        return unserialize($value);
    }
}
