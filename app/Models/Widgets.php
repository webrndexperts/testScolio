<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Widgets extends Model
{
	
	protected $table = 'widgtes';
	protected $fillable=['widget_parent_id','title','lang','description','photo','status','slug','widgets_type'];
    
	public static function getWidgetsHomePage(){
        return Widgets::orderBy('id','ASC')->paginate(10);
    }
	
	public static function getAllWidgetsLanguageApi($lang='en_SG'){
        return Widgets::where('lang',$lang)->orderBy('id','ASC')->get();
    }
	
	public static function getAllContactInfoLanguageApi($lang='en_SG'){
        return 	Widgets::where('widgets_type', 'Contact Info')->where('lang', $lang)->orderBy('id', 'ASC')->take(1)->get();
    }
	
	public static function getAllTelephoneLanguageApi($lang='en_SG'){
        return 	Widgets::where('widgets_type', 'Telephone')->where('lang', $lang)->orderBy('id', 'ASC')->take(1)->get();
    }
	
	
	public static function getAllOpeningHoursLanguageApi($lang='en_SG'){
        return 	Widgets::where('widgets_type', 'Opening Hours')->where('lang', $lang)->orderBy('id', 'ASC')->take(1)->get();
    }

	public static function getAllScoliosisResultsLanguageApi($lang='en_SG'){
        return 	Widgets::where('widgets_type', 'Scoliosis Results')->where('lang', $lang)->orderBy('id', 'ASC')->take(1)->get();
    }
	
	public static function getAllBottomImageApi($lang='en_SG'){
        return 	Widgets::where('widgets_type', 'Bottom Image')->where('lang', $lang)->orderBy('id', 'ASC')->take(1)->get();
    }
	
	public static function getAllOurPromiseLanguageApi($lang='en_SG'){
        return 	Widgets::where('widgets_type', 'Our Promise')->where('lang', $lang)->orderBy('id', 'ASC')->take(1)->get();
    }
	
	
      public static function countActivePost(){
        $data=Widgets::where('status','active')->count();
        if($data){
            return $data;
        }
        return 0;
    }
}
