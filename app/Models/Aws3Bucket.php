<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Auth;
class Aws3Bucket extends Model
{
	
	protected $table='aws3_buckets_videolink_prodcuts';
	 protected $fillable=['product_id','video_name','video_duration','image_link','video_link','lang','created_at','updated_at'];
    use HasFactory;
	
	public function order(){
        // $query = $this->belongsTo('App\Models\OrderProductMeta','product_id','product_id')
        $query = $this->belongsTo('App\Models\OrderProductMeta','product_id','product_id')
			->join('orders', 'orders.order_number', '=', 'orders_product_meta.order_id');
		
		if(Auth::check()) {
			$query = $query->where('orders.user_id', Auth::user()->id);
		} 
			
		return $query;
    }
	
}
