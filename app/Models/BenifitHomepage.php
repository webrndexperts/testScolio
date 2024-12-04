<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BenifitHomepage extends Model
{
    protected $table = 'homepage_benifits_clinic';
    protected $fillable=['homebenifit_parent_id','count_numbers','post_type','video_url','title','lang','slug','description','photo','status'];


    public static function getAllBenifitHomePage(){
        return BenifitHomepage::orderBy('id','ASC')->paginate(10);
    }
	public static function getAllBenifitLanguageApi($lang='en_SG'){
        return BenifitHomepage::where('post_type', 'benifits-clinic')->where('lang',$lang)->orderBy('id','ASC')->take(8)->get();
    }
	public static function getAllNonTreatmentLanguageApi($lang='en_SG'){
        return 	BenifitHomepage::where('post_type', 'non-treatment')->where('lang', $lang)->orderBy('id', 'ASC')->take(3)->get();
    }
	public static function getAllSpecailOfferLanguageApi($lang='en_SG'){
        return 	BenifitHomepage::where('post_type', 'specail-offer')->where('lang', $lang)->orderBy('id', 'ASC')->get();
    }
	
	public static function getAllPraisePatientsLanguageApi($lang='en_SG'){
        return 	BenifitHomepage::where('post_type', 'praise-from-patients')->where('lang', $lang)->orderBy('id', 'ASC')->get();
    }
    public static function countActivePost(){
        $data=BenifitHomepage::where('status','active')->count();
        if($data){
            return $data;
        }
        return 0;
    }
}
