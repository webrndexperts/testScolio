<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestimonailsCategory extends Model
{
    protected $table = 'testimonials_categories';
    protected $fillable=['title','slug','status'];

    public function testimonials_results(){
        return $this->hasMany('App\Models\Testimonials','testimonials_cat_id','id')->where('status','active');
    }

    public static function getBlogByCategory($slug){
        return TestimonailsCategory::with('testimonials_results')->where('slug',$slug)->first();
    }
}
