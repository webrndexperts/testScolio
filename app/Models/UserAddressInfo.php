<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAddressInfo extends Model
{
	protected $table = 'users_addresses_info';
    protected $fillable=['user_id','billing_first_name','billing_last_name','billing_email','billing_address_1','billing_address_2','billing_city','billing_state','billing_country','billing_postcode','billing_phone','shipping_first_name','shipping_last_name','shipping_address_1','shipping_address_2','shipping_city','shipping_state','shipping_country','shipping_postcode','shipping_phone','company','created_at','updated_at'];
}
