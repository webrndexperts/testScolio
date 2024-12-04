<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductAttributes;
use App\Models\Brand;
use App\Models\Language;
use App\Models\ProductParents;
use App\Models\ProductDropdownAttribute;
use App\Models\ProductReview;
use App\Models\Aws3Bucket;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
	  if(isset($_GET['lang'])){
	  $get_current_lang = !empty($_GET['lang']) ? $_GET['lang'] : ''; 
      $products = Product::with(['cat_info','sub_cat_info'])->where('lang',$get_current_lang)->orderBy('id','DESC')->paginate(10);
	  }
		
      //  $products=Product::getAllProduct();
        // return $products;
        return view('backend.product.index')->with('products',$products)->with('get_current_lang',$get_current_lang);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $brand=Brand::get();
        $category=Category::where('is_parent',1)->get();
        $productattributes = ProductAttributes::where('is_parent',1)->get();
		$languages = Language::getListActive();
		
        // return $category;
        return view('backend.product.create')->with('categories',$category)->with('brands',$brand)->with('productattributes',$productattributes)->with('languages',$languages);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // return $request->all();
		$this->validate($request,[
            'product_slug'=>'required'
        ]);
		
		 $data = $request->all();
		 
		if(isset($data['aw3_buckets'])){
			
			$aws3_items = [];

			foreach ($data['aw3_buckets'] as $key => $aw3_bucket) {
				foreach ($aw3_bucket as $keys => $item_bucket) {
						if(!empty($item_bucket)){
							
						$aws3_items[$key][] = $item_bucket;
						}

				}
			}
			
        }

		 $attributes = isset($data['attr']) ? json_encode($data['attr'],JSON_UNESCAPED_UNICODE) : '';
		 $is_featured = !empty($data['is_featured']) ? $data['is_featured'] : '';
		 $cat_id = !empty($data['cat_id']) ? $data['cat_id'] : 0;
		 $product_actual_weight = !empty($data['product_actual_weight']) ? $data['product_actual_weight'] : '';
		 $dimension_length = !empty($data['dimension_length']) ? $data['dimension_length'] : '';
		 $dimension_weight = !empty($data['dimension_weight']) ? $data['dimension_weight'] : '';
		 $dimension_height = !empty($data['dimension_height']) ? $data['dimension_height'] : '';
		 $product_type = !empty($data['product_type']) ? $data['product_type'] : '';
		 $price = !empty($data['price']) ? $data['price'] : 0;
		 $discount = !empty($data['discount']) ? $data['discount'] : '';
		 $condition = !empty($data['condition']) ? $data['condition'] : '';
		 // $stock = !empty($data['stock']) ? $data['stock'] : '';
		 $status_data = !empty($data['status']) ? $data['status'] : 'active';
		 $slug_name = !empty($data['product_slug']) ? $data['product_slug'] : '';
        $dataProductParents = [
            'slug'    => $slug_name
        ];
        $page = ProductParents::create($dataProductParents);
		
           if (isset($data['image'])) {
             $featured_image = $data['image'];
             $imageName = $data['image']->getClientOriginalName();
          
             $featured_image->move(public_path('custom_images/products'), $imageName);
            
           }
		   
		
        if (is_array($data['post']) || is_object($data['post'])) {
 
        foreach ($data['post'] as $code => $value) {
			
		 $product_gallery = !empty($value['product_gallery']) ? $value['product_gallery'] : '';
		    //dd($product_gallery);
         if (is_array($product_gallery)) {
			$get_saved_image = [];
			foreach ($product_gallery as $image) {
			 $saved_folderimage = $image->getClientOriginalName();
			 $basePath = public_path('custom_images/products/product_gallery');
              $image->move($basePath, $saved_folderimage);
			  $get_saved_image[] = $saved_folderimage;
		  }
		}
		
		
		
		 if (isset($get_saved_image)) {
		 if(is_array($get_saved_image)){
			 $multiple_Image = [];
			 $arr_multipleImage = '';
			foreach ($get_saved_image as $db_images) {
			   $multiple_Image[] =  asset('custom_images/products/product_gallery/' . $db_images);
			  }
			   $arr_multipleImage = implode(',',$multiple_Image);
			}
			else{
			   $arr_multipleImage= '';
			}
		 }	
		 
            if (isset($value['title'])) {
                $dataDes[] = [
                    'product_parent_id' => $page->id,
					'slug' => $slug_name,
					'is_featured' => $is_featured,
					'cat_id' => $cat_id,
					'product_type' => $product_type,
					'product_actual_weight' => $product_actual_weight,
					'dimension_length' => $dimension_length,
					'dimension_weight' => $dimension_weight,
					'dimension_height' => $dimension_height,
					'attributes' => $attributes,
					'price' => $price,
					'discount' => $discount,
                    'lang'  => $code,
                    'status'  => $status_data,
                    'title' => !empty($value['title']) ? $value['title'] : '',
                    'description' => !empty($value['description']) ? $value['description'] : '',
                    'seo_meta_title' => !empty($value['seo_meta_title']) ? $value['seo_meta_title'] : '',
                    'seo_meta_description' => !empty($value['seo_meta_description']) ? $value['seo_meta_description'] : '',
                    'seo_meta_tag' => !empty($value['seo_meta_tag']) ? $value['seo_meta_tag'] : '',
                    'summary' => !empty($value['main_content']) ? $value['main_content'] : '',
                    'featured_video_url' => !empty($value['featured_video_url']) ? $value['featured_video_url'] : '',
					'product_gallery' => !empty($arr_multipleImage) ? $arr_multipleImage : '',
					'photo' =>  !empty($imageName) ? asset('custom_images/products/' . $imageName) : '',
                ];
            } else {
                echo 'not insert';
            }
        }
    } 
	
			try {
				//dd($dataDes);

				// Move the create method outside the loop
				foreach ($dataDes as $postData) {
					$status = Product::create($postData);
				}
				
				if($status->id){
	
			
			   $object_videoUrl = [];
				 foreach($aws3_items['video_link'] as $video_link){

				if ($video_link->isValid()) {
					$fileName = $video_link->getClientOriginalName();
					$folderPath = 'uploads/';
					$filePath = $folderPath . $fileName;


					$path = $video_link->storeAs($folderPath, $fileName, 's3');

					$object_videoUrl[] = Storage::disk('s3')->url($path);

				  }

				 }
  
					foreach ($aws3_items as $aws_key => $aw3_value) {
						// Access individual items in the $aw3_value array
						$videoTitles = $aws3_items['video_title'];
						$videoDuration = $aws3_items['video_duration'];
						$imageLink = $aws3_items['image_link']->getClientOriginalName();
						$video_link = $object_videoUrl;

					   $data_video = [];

						// Assuming the input arrays are of the same length
						$count = count($videoTitles);

						for ($i = 0; $i < $count; $i++) {
							$data_video[] = [
								'product_id' => $status->id,
								'lang' => 'en',
								'video_name' => $videoTitles[$i],
								'video_duration' => $videoDuration[$i],
								'image_link' => $imageLink[$i],
								'video_link' => $video_link[$i],
							];
						}

                    //dd($data_video);
					$save_videos = Aws3Bucket::create($data_video);

							
					}
	
					
				}
			
			} catch (\Exception $e) {
				// Handle exceptions
				DB::rollBack();
				echo $e->getMessage(); // You can log or display the error message
				// You might want to redirect or display an error message to the user
			}
	

        // if($status){
            // request()->session()->flash('success','Product Successfully added');
        // }
        // else{
            // request()->session()->flash('error','Please try again!!');
        // }
        return redirect()->route('product.index',['lang' => 'en_SG']);

    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $brand=Brand::get();
        $product=Product::findOrFail($id);
        $category=Category::where('is_parent',1)->get();
		$product_dropdown_attribute = $product->product_dropdown_attribute;
		$get_multi_attr = [];
		foreach($product_dropdown_attribute as $single_attr){
		$multiple_attributes = ProductAttributes::where('id',$single_attr->attribute_id)->get();
		foreach($multiple_attributes as $arr_attribute){
			$get_multi_attr[] = $arr_attribute;
		}
		}
		//dd($get_multi_attr);
		$productattributes = ProductAttributes::where('is_parent',1)->get();
        $items=Product::where('id',$id)->get();
        // return $items;
        return view('backend.product.edit')->with('product',$product)
                    ->with('brands',$brand)
					->with('productattributes',$productattributes)
					->with('get_multi_attr',$get_multi_attr)
                    ->with('categories',$category)
					->with('items',$items);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product=Product::findOrFail($id);
		
		$product_id = $product->id;    
		$lang_by_product = $product->lang;    
		$exits_photo = $product->photo;    
		$exits_product_gallery = $product->product_gallery;    
		$exits_product_type = $product->product_type;    
		$seo_meta_title = $product->seo_meta_title;    
		$seo_meta_description = $product->seo_meta_description;    
		$seo_meta_tag = $product->seo_meta_tag;    

         $get_saved_image = $request->product_gallery;
			 if(is_array($get_saved_image)){
			 $multiple_Image = [];
			 $arr_multipleImage = '';
			foreach ($get_saved_image as $d_images) {
				   $db_images = $d_images->getClientOriginalName();
			   $multiple_Image[] =  asset('custom_images/products/product_gallery/' . $db_images);
			  }
			   $arr_multipleImage = implode(',',$multiple_Image);
			}
				//dd($arr_multipleImage);
		 
		
		if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = $image->getClientOriginalName();
            $image->move(public_path('custom_images/products'), $imageName);
        }
          //dd($image);
		   if (is_array($request->attr) || is_object($request->attr)) {
		  foreach ($request->attr as $attr_key => $single_attribute)
		  {
           foreach ($single_attribute as $key => $multiple_value) {
					$save_attribute = [
                    'attribute_id' => $multiple_value,
                    'parent_attribute_id' => $attr_key
                ]; 
				$get_product_id = ['product_id' => $product_id];
		    ProductDropdownAttribute::updateOrCreate($get_product_id, $save_attribute);
			
			}		
		  }
		  }
		 // dd('test');
	//	$attributes = !empty(json_encode($request->attr, JSON_UNESCAPED_UNICODE)) ? json_encode($request->attr, JSON_UNESCAPED_UNICODE) : '';
		//$attributes = !empty($request->attr) ? $request->attr : '';

        $data =  [
            'title' => !empty($request->title) ? $request->title : $product->title,
		    'summary' => !empty($request->summary) ? $request->summary : $product->summary,
            'description' => !empty($request->description) ? $request->description : $product->description,
            'seo_meta_title' => !empty($request->seo_meta_title) ? $request->seo_meta_title : $seo_meta_title,
            'seo_meta_description' => !empty($request->seo_meta_description) ? $request->seo_meta_description : $seo_meta_description,
            'seo_meta_tag' => !empty($request->seo_meta_tag) ? $request->seo_meta_tag : $seo_meta_tag,
			'product_actual_weight' => !empty($request->product_actual_weight) ? $request->product_actual_weight : '',
			'dimension_length' => !empty($request->dimension_length) ? $request->dimension_length : '',
			'dimension_weight' => !empty($request->dimension_weight) ? $request->dimension_weight : '',
			'dimension_height' => !empty($request->dimension_height) ? $request->dimension_height : '',
            'is_featured' => !empty($request->is_featured) ? $request->is_featured : $product->is_featured,
            'cat_id' => !empty($request->cat_id) ? $request->cat_id : $product->cat_id,
            'product_type' => !empty($request->product_type) ? $request->product_type : $exits_product_type,
           // 'attributes' => $attributes,
            'slug' => !empty($request->page_slug) ? $request->page_slug : $product->slug,
            'amazon_link' => !empty($request->amazon_link) ? $request->amazon_link : $product->amazon_link,
            'amazon_image_link' => !empty($request->amazon_image_link) ? $request->amazon_image_link : $product->amazon_image_link,
            'product_sku' => !empty($request->product_sku) ? $request->product_sku : $product->product_sku,
            'price' => !empty($request->price) ? $request->price : $product->price,
            'discount' => !empty($request->discount) ? $request->discount : $product->discount,
            'stock' => !empty($request->stock) ? $request->stock : $product->stock,
			'featured_video_url' => !empty($request->featured_video_url) ? $request->featured_video_url : $product->featured_video_url,
            'product_gallery' => !empty($arr_multipleImage) ? $arr_multipleImage : $exits_product_gallery,
			'photo' => !empty($imageName) ? asset('custom_images/products/' . $imageName) : $exits_photo,
            'status' => !empty($request->status) ? $request->status : $product->status
        ];
		
		
        // return $data;
        $status=$product->fill($data)->save();
        if($status){
            request()->session()->flash('success','Product Successfully updated');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('product.index',['lang' => $lang_by_product]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product=Product::findOrFail($id);
		
		 ProductReview::where('product_id', $product->id)->delete();
	     // $status= Product::destroy($product->id);
       $status=$product->delete();
        
        if($status){
			ProductDropdownAttribute::where('product_id', $id)->delete();
			
            request()->session()->flash('success','Product successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting product');
        }
        return redirect()->route('product.index',['lang' => 'en_SG']);
    }
	
	
	 /**
	 *
     * Upload videos from Amazon S3 Buckets in storage.
     *
     */
	


	
	
}
