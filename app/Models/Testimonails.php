<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonails extends Model
{
    protected $table = 'testimonials';
    protected $fillable=['testimonials_parent_id','title','testimonials_cat_id','lang','description','photo','video_url','added_by','status','summary','slug','seo_meta_title','seo_meta_description','seo_meta_tag','client_name','company_name'];

    public function cat_info(){
        return $this->hasOne('App\Models\TestimonailsCategory','id','testimonials_cat_id');
    }

    public function author_info(){
        return $this->hasOne('App\User','id','added_by');
    }
    public static function getAllTestimonails(){
        return Testimonails::with(['author_info'])->orderBy('id','DESC')->paginate(10);
    }
    public static function countActiveTestimonail(){
        $data=Testimonails::where('status','active')->count();
        if($data){
            return $data;
        }
        return 0;
    }
}
