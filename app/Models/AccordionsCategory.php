<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccordionsCategory extends Model
{
    protected $table = 'accordions_category';
    protected $fillable=['title','slug','status'];

    public function accordions_results(){
        return $this->hasMany('App\Models\Accordions','accordions_cat_id','id')->where('status','active');
    }

    public static function getBlogByCategory($slug){
        return AccordionsCategory::with('accordions_results')->where('slug',$slug)->first();
    }
    use HasFactory;
}
