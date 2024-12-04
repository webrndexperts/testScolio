<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class XrayResultsParents extends Model
{
    protected $table = 'xray_results_parents';
    protected $fillable = ['slug','created_at','case_number','updated_at'];
    use HasFactory;
}
