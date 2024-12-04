<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
	protected $table = 'pages';
    protected $fillable=['page_parent_id','title','summary','lang','post_type','services_type','video_url','description','photo','slug','added_by','status','seo_meta_title','seo_meta_description','seo_meta_tag'];

    public function author_info(){
        return $this->hasOne('App\User','id','added_by');
    }
    public static function getAllPage(){
        return Page::with(['author_info'])->orderBy('id','DESC')->paginate(10);
    }
	public static function getAllPageLanguageApi($lang='en_SG'){
        return Page::where('lang',$lang)->orderBy('id','ASC')->get();
    }
	
	   public static function getPageBySlug($slug){
        return Page::where('slug',$slug)->where('status','active')->first();
    }
	
    public static function countActivePage(){
        $data=Page::where('status','active')->count();
        if($data){
            return $data;
        }
        return 0;
    }
}
