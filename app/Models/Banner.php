<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $fillable=['title','slug','description','photo','status','banner_parent_id','lang','page_type'];
}
