<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Footer extends Model
{
   	protected $table = 'footer_menu_list';
    protected $fillable=['footer_parent_id','title','lang','slug','status'];


    public static function getAllFooter(){
        return Footer::orderBy('id','ASC')->get();
    }
	public static function getAllFooterByLanguageApi($lang='en_SG'){
        return Footer::where('lang',$lang)->orderBy('id','DESC')->get();
    }
	
    public static function countActivePost(){
        $data=Footer::where('status','active')->count();
        if($data){
            return $data;
        }
        return 0;
    }
}
