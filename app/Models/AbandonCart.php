<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\User;

class AbandonCart extends Model
{
	 protected $table='abandon_cart';
	 protected $fillable=['user_id','user_ip_address','user_cart_information','number_of_items','lang','mailsent_status','abandoncart_status','created_at','updated_at'];
     use HasFactory;
	 
	public function user()
    {
        return $this->belongsTo(User::class);
    }

}