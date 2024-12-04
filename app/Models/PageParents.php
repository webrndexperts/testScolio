<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageParents extends Model
{
    protected $table = 'pages_parents';
    protected $fillable = ['slug','created_at','updated_at'];
    use HasFactory;
}
