<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tax extends Model
{
    protected $table = 'taxes';
	protected $fillable=['country_code','state_code','zip_code','city','tax_rate','tax_name','priority','status'];
	
	public static function getAllTaxApi(){
        return Tax::orderBy('id','ASC')->get();
    }
}
