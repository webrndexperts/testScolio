<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accordions extends Model
{
    protected $table = 'accordions';
    protected $fillable=['accordions_parent_id','title','accordions_cat_id','lang','slug','description','added_by','status','intent', 'intent_order'];

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
        $accordions = Accordions::with(['author_info','accordions_info'])
            ->where('lang',$language)
            ->whereHas('accordions_info', function ($query) use ($slug) {
                $query->where('slug', $slug);
            })
            ->where('status', 'active')
            ->orderBy('intent_order','ASC')
            ->orderBy('id','ASC')
            ->get();
        
        $intentsMap = [];
        try {
            $intentsJson = file_get_contents(public_path('assets/jsons/intents.json'));
            $intentsData = json_decode($intentsJson, true);
        } catch (\Exception $e) {
            $intentsData = ['intents' => []]; // Set to an empty intents array
        }
        
        // Create a map of intent names to their labels
        if (isset($intentsData['intents'])) {
            foreach ($intentsData['intents'] as $intent) {
                $intentsMap[$intent['name']] = $intent['label'];
            }
        }
        
        // Map language code (en_SG -> en, es_ES -> es, etc)
        $langCode = explode('_', $language)[0];
        
        // Add translated intent label to each accordion
        $accordions = $accordions->map(function($item) use ($intentsMap, $langCode) {
            $intentName = $item->intent ?? 'general';
            $item->intent_label = $intentName;
            
            // If we have the intent in our map, get the translated label
            if (isset($intentsMap[$intentName]) && isset($intentsMap[$intentName][$langCode])) {
                $item->intent_label = $intentsMap[$intentName][$langCode];
            }
            
            return $item;
        });
        
        return $accordions;
    }	
    
    public static function countActiveAccordion(){
        $data=Accordions::where('status','active')->count();
        if($data){
            return $data;
        }
        return 0;
    }
}
