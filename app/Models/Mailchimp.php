<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mailchimp extends Model
{
   	protected $table = 'mailchimp';
	protected $fillable=['mailchimp_api_key','mp_listname','mp_id','mp_total_subscribers','mp_username','mp_useremail','status','created_at','updated_at'];
    use HasFactory;
	
	    public static function getAllMailchimp(){
        return ContactForm::orderBy('id','ASC')->paginate(10);
    }
}
