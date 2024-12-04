<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Cart;
class Product extends Model
{
    protected $fillable=['title','slug','summary','description','cat_id','price','discount','status','photo','stock','is_featured','condition','lang','product_parent_id','product_gallery','featured_video_url','product_type','attributes','seo_meta_title','seo_meta_description','seo_meta_tag','product_actual_weight','dimension_length','dimension_weight','dimension_height','amazon_link','amazon_image_link','product_sku','attribute_json','created_at','updated_at'];


    protected $appends = ['wishlist'];



    public function cat_info(){
        return $this->hasOne('App\Models\Category','id','cat_id');
    }
    public function sub_cat_info(){
        return $this->hasOne('App\Models\Category','id','child_cat_id');
    }
    public static function getAllProduct(){
        return Product::with(['cat_info','sub_cat_info'])->orderBy('id','desc')->paginate(10);
    }
    public function rel_prods(){
        return $this->hasMany('App\Models\Product','cat_id','cat_id')->where('status','active')->orderBy('id','DESC')->limit(8);
    }
    public function releted_prods(){
        return $this->hasMany('App\Models\Product','cat_id','cat_id')->where('status','active')->orderBy('id','DESC')->limit(3);
    }
    public function product_review(){
        return $this->hasMany('App\Models\ProductReview','product_id','id')->where('status','active')->orderBy('id','DESC');
    }
	// public function wishlist_item(){
        // return $this->hasMany('App\Models\Wishlist','product_id','id')->where('wishlist_status',0)->orderBy('id','DESC');;
    // }
	 // public function top_rated_review()
    // {
        // return $this->hasOne('App\Models\ProductReview', 'product_id', 'id')
            // ->where('status', 'active')
            // ->orderByDesc('rate')
            // ->orderByDesc('created_at');
    // }
	
	public function aws3_bucket_product(){
       // return $this->hasMany('App\Models\Aws3Bucket','product_id','id')->with('order')->orderBy('id','DESC');
        return $this->hasMany('App\Models\Aws3Bucket','product_id','id')->with('order')->orderBy('id','ASC');
    }

	// public function child_attribute(){
		// return $this->hasOne('App\Models\ProductAttributes', 'id');
    // }
	public function product_dropdown_attribute(){
        return $this->hasMany('App\Models\ProductDropdownAttribute','product_id','id')->with(['parent_attribute_name:id,title,slug','product_attribute:id,title,summary,sku']);
    }
	  // public static function getProductBySlug($slug, $language)
	// {
	
		// $product = Product::with(['cat_info', 'rel_prods', 'product_review', 'aws3_bucket_product','product_dropdown_attribute'])
			// ->where('slug', $slug)
			// ->where('lang', $language)
			// ->first();

		
		// if ($product) {
			// return $product;
		// } else {
		
			// return null;
		// }
	// }
	
	
		
	
	public static function getProductBySlug($slug, $language)
   {
    $product = Product::with(['cat_info', 'rel_prods','product_review', 'aws3_bucket_product', 'product_dropdown_attribute'])
        ->where('slug', $slug)
        ->where('lang', $language)
        ->first();


    if ($product) {
         return $product;
    } else {
        return null;
    }
   }
	
    /**
     * Attribute to get list of the wishlist added to particular user.
     * 
     * @return Wishlist values.
     */
	public function getWishlistAttribute() {
        $userId = request()->get('user');

        if ($userId) {
            return $this->hasOne(Wishlist::class, 'product_id')->where('user_id', $userId)->first();
        }
        
        return null;
    }

	public static function getAllProductByLanguageApi( $lang = 'en_SG') {
        return Product::with(['cat_info'])->where('lang',$lang)->orderBy('id','DESC')->get();
    }
	
    public static function countActiveProduct(){
        $data=Product::where('status','active')->count();
        if($data){
            return $data;
        }
        return 0;
    }

    public function carts(){
        return $this->hasMany(Cart::class)->whereNotNull('order_id');
    }

    public function wishlists(){
        return $this->hasMany(Wishlist::class)->whereNotNull('cart_id');
    }

    public function brand(){
        return $this->hasOne(Brand::class,'id','brand_id');
    }
	

}
