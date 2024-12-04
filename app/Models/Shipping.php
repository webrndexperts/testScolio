<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Shipping extends Model
{
    protected $fillable=['type','price','stripe_secret_key','stripe_publish_key','easyship_access_token','easyship_class_slug','status'];
	
	
	public static function getAllShippings(){
        return Shipping::where('type','Easyship-Method')->orderBy('id','ASC')->get();
    }
	
    public static function getAllPaymentMethod(){
        return Shipping::where('type','Stripe-Method')->orderBy('id','ASC')->get();
    }
}
