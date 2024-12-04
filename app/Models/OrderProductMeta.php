<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProductMeta extends Model
{
	 protected $table='orders_product_meta';
	 protected $fillable=['order_id','product_id','quantity','status','created_at','updated_at'];
    use HasFactory;
	public function product_order_itemsinfo(){
        return $this->hasMany('App\Models\Product','id','product_id');
    }
	// Define the relationship with the Product model
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
