<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoogleReviews extends Model
{
    protected $table = 'google_reviews';
    protected $fillable = ['name','description','image','publish_date','lang','created_at','updated_at'];
    use HasFactory;
}