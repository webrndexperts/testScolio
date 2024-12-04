<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccordionsParents extends Model
{
    protected $table = 'accordions_parents';
    protected $fillable = ['slug','created_at','updated_at'];
    use HasFactory;
}
