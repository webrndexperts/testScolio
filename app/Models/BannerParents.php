<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BannerParents extends Model
{
    protected $table = 'banners_parents';
    protected $fillable = ['slug','created_at','updated_at'];   
   use HasFactory;
}
