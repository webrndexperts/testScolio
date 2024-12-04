<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FooterParents extends Model
{
    protected $table = 'footer_parents';
    protected $fillable = ['slug','created_at','updated_at'];
    use HasFactory;
}
