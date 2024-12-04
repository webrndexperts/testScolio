<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class XrayResults extends Model
{
    protected $fillable=['xray_parent_id','title','lang','description','photo','video_url','added_by','status','slug','xray_cat_id','case_number','age','curve_degree','seo_meta_title','seo_meta_description','seo_meta_tag'];

    public function cat_info(){
        return $this->hasOne('App\Models\XrayResultsCategory','id','xray_cat_id');
    }

    public function author_info(){
        return $this->hasOne('App\User','id','added_by');
    }
    public static function getAllXrayResults(){
        return XrayResults::with(['author_info'])->orderBy('id','DESC')->paginate(10);
    }
    public static function countActivePost(){
        $data=XrayResults::where('status','active')->count();
        if($data){
            return $data;
        }
        return 0;
    }
}
