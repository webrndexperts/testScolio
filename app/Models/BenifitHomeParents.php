<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BenifitHomeParents extends Model
{
    protected $table = 'homepage_benifits_parents';
    protected $fillable = ['slug','created_at','updated_at'];
    use HasFactory;
}
