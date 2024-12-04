<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhoneNumber extends Model
{
    use HasFactory;
    protected $fillable = ['whatsapp_number','phone_number' , 'email', 'gtag' , 'address' , 'address_href','lang'];
}
