<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactForm extends Model
{
	
	protected $table = 'contact_form';
	protected $fillable=['name','email_address','phone_number','country','contact_enquiry','description','photo','lang','slug','form_type','status'];
    use HasFactory;
	
	    public static function getAllContactForm(){
        return ContactForm::orderBy('id','ASC')->paginate(10);
    }
}
