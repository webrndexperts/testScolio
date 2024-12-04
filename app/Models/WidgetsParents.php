<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WidgetsParents extends Model
{
	protected $table = 'widgtes_parents';
    protected $fillable = ['slug','widgets_type','created_at','updated_at'];
    use HasFactory;
}
