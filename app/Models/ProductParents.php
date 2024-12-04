<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductParents extends Model
{
	protected $table = 'product_parent';
    protected $fillable = ['slug','created_at','updated_at'];
    use HasFactory;
}
