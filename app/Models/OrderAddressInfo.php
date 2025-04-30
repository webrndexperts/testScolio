<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderAddressInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        // Billing address fields
        'billing_first_name',
        'billing_last_name',
        'billing_email',
        'billing_address_1',
        'billing_address_2',
        'billing_city',
        'billing_state',
        'billing_country',
        'billing_postcode',
        'billing_phone',
        'company',
        // Shipping address fields
        'shipping_first_name',
        'shipping_last_name',
        'shipping_address_1',
        'shipping_address_2',
        'shipping_city',
        'shipping_state',
        'shipping_country',
        'shipping_postcode',
        'shipping_phone'
    ];
}
