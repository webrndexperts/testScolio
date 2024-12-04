<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Post;
class XrayResultsCategory extends Model
{
    protected $fillable=['title','slug','status'];

    public function xray_results(){
        return $this->hasMany('App\Models\XrayResults','xray_cat_id','id')->where('status','active');
    }

    public static function getBlogByCategory($slug){
        return XrayResultsCategory::with('xray_results')->where('slug',$slug)->first();
    }
}
