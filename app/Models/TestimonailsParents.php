<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestimonailsParents extends Model
{
    protected $table = 'testimonials_parents';
    protected $fillable = ['slug','created_at','client_name','client_email','company_name','company_website','case_number','updated_at'];
    use HasFactory;
}
