<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDropdownAttribute extends Model
{
        protected $fillable=['product_id','attribute_id','parent_attribute_id','created_at','updated_at'];
        protected $table = 'product_dropdown_attributes';
	

    public function product_attribute()
    {
        return $this->belongsTo('App\Models\ProductAttributes', 'attribute_id','id');
    }

	 public function parent_attribute_name()
    {
        return $this->belongsTo('App\Models\ProductAttributes', 'parent_attribute_id','id');
    }
}		