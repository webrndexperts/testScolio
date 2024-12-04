<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeaderParents extends Model
{
    protected $table = 'header_parents';
    protected $fillable = ['slug','created_at','updated_at','title_type'];
    use HasFactory;
}
