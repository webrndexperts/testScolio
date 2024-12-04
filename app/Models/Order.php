<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable=['user_id','order_number','sub_total','quantity','delivery_charge','status','total_amount','first_name','last_name','country','post_code','address1','address2','phone','email','payment_id','payment_method','payment_status','shipping_id','coupon','city','company','shipping_first_name','shipping_last_name','shipping_company','shipping_country','shipping_address_1','shipping_address_2','shipping_city','shipping_state','shipping_postcode','shipping_method_name','shipping_price','gst_tax','discount_couponcode','stripe_total_price','transaction_fee','shipping_phone','product_id','grouped_product_attributes','scoliosis_exercises_file','lang','created_at','updated_at'];

    public function cart_info(){
        return $this->hasMany('App\Models\Cart','order_id','id');
    }
    public static function getAllOrder($id){
        return Order::with('cart_info')->find($id);
    }
	
	public function order_productmeta_info(){
        return $this->hasMany('App\Models\OrderProductMeta','order_id','id');
    }
	
	
	public static function getsingleOrderAPI($id){
        return Order::with(['order_productmeta_info.product_order_itemsinfo'])->where('id',$id)->first();
    }
	
    public static function countActiveOrder(){
        $data=Order::count();
        if($data){
            return $data;
        }
        return 0;
    }
    public function cart(){
        return $this->hasMany(Cart::class);
    }

    public function shipping(){
        return $this->belongsTo(Shipping::class,'shipping_id');
    }
    public function user()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }

	public static function getAllOrderByUsersAPI($id){
        return Order::with(['user'])->where('user_id',$id)->orderBy('id','DESC')->get();
    }

}
