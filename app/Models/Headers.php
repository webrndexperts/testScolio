<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Headers extends Model
{
	protected $table = 'header_list';
	
    protected $fillable=['header_parent_id','title','header_main_title','header_submenu_title','lang','description','photo','slug','status','created_at','updated_at'];


    public function header_main_titleinfo(){
        return $this->hasOne('App\Models\HeaderMainTitle','id','header_main_title');
    }
	public function mainHeading()
    {
        return $this->belongsTo(HeaderMainTitle::class, 'header_main_title', 'id');
    }

    public function submenuHeading()
    {
        return $this->belongsTo(HeaderSubMenu::class, 'header_submenu_title', 'id');
    }
	
	
	public function header_submenu_title_info(){
        return $this->hasOne(HeaderSubMenu::class,'id','header_submenu_title');
    }
    public static function getAllHeader(){
        return Headers::with(['header_main_titleinfo','header_submenu_title_info'])->orderBy('id','DESC')->paginate(10);
    }
	public static function getAllHeaderByLanguageApi($lang='en_SG'){
        return Headers::with(['header_main_titleinfo','header_submenu_title_info'])->where('lang',$lang)->orderBy('id','DESC')->get();
    }
	
    public static function countActivePost(){
        $data=Headers::where('status','active')->count();
        if($data){
            return $data;
        }
        return 0;
    }
}
