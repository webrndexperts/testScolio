<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductAttributes extends Model
{
        protected $fillable=['title','slug','summary','photo','status','is_parent','parent_id','sku'];



    public function parent_info(){
        return $this->hasOne('App\Models\ProductAttributes','id','parent_id');
    }
    public static function getAllCategory(){
        return  ProductAttributes::orderBy('id','DESC')->with('parent_info')->paginate(10);
    }

    public static function shiftChild($cat_id){
        return ProductAttributes::whereIn('id',$cat_id)->update(['is_parent'=>1]);
    }
    public static function getChildByParentID($id){
        return ProductAttributes::where('parent_id',$id)->orderBy('id','ASC')->pluck('title','id');
    }

    public function child_cat(){
        return $this->hasMany('App\Models\ProductAttributes','parent_id','id')->where('status','active');
    }
    public static function getAllParentWithChild(){
        return ProductAttributes::with('child_cat')->where('is_parent',1)->where('status','active')->orderBy('title','ASC')->get();
    }
    public function products(){
        return $this->hasMany('App\Models\Product','cat_id','id')->where('status','active');
    }
    public function sub_products(){
        return $this->hasMany('App\Models\Product','child_cat_id','id')->where('status','active');
    }
    public static function getProductByCat($slug){
        // dd($slug);
        return ProductAttributes::with('products')->where('slug',$slug)->first();
        // return Product::where('cat_id',$id)->where('child_cat_id',null)->paginate(10);
    }
    public static function getProductBySubCat($slug){
        // return $slug;
        return ProductAttributes::with('sub_products')->where('slug',$slug)->first();
    }
    public static function countActiveCategory(){
        $data=ProductAttributes::where('status','active')->count();
        if($data){
            return $data;
        }
        return 0;
    }
}
