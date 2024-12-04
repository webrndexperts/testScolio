<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accordions extends Model
{
    protected $table = 'accordions';
    protected $fillable=['accordions_parent_id','title','accordions_cat_id','lang','slug','description','added_by','status'];

    public function accordions_info(){
        return $this->hasOne('App\Models\AccordionsCategory','id','accordions_cat_id');
    }

    public function author_info(){
        return $this->hasOne('App\User','id','added_by');
    }
    public static function getAllAccordions(){
        return Accordions::with(['author_info','accordions_info'])->orderBy('id','DESC')->paginate(10);
    }
	
	public static function pagesbyFaqAccordions($slug,$language){
        return Accordions::with(['author_info','accordions_info'])->where('lang',$language)->whereHas('accordions_info', function ($query) use ($slug) {
                $query->where('slug', $slug);
            })->orderBy('id','ASC')->get();
    }
	
    public static function countActiveAccordion(){
        $data=Accordions::where('status','active')->count();
        if($data){
            return $data;
        }
        return 0;
    }
}
