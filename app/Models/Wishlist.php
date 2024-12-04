<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Models\Product;

class Wishlist extends Model
{
    protected $fillable=['user_id','product_id','cart_id','lang','wishlist_status'];

    public function product(){
        return $this->belongsTo(Product::class,'product_id');
    }
		public function user()
    {
        return $this->belongsTo(User::class);
    }
	
}
