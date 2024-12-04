<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Auth;
use App\User;
use App\Models\ProductAttributes;
use App\Models\ProductDropdownAttribute;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function index()
    {
        $testimonials = Product::getAllProductByLanguageApi();
        return response()->json($testimonials);
    }
	
	public function product_by_category($slug)
    {
        $testimonials = Category::getProductByCat($slug);
		if (!$testimonials) {
			return response()->json('null');
		}
        return response()->json($testimonials);
    }	





	public function getAllCategoryWithProductCount($lang)
    {

		$categoriesWithProductCount = Category::getAllCategoriesWithProductCount($lang);
		return response()->json($categoriesWithProductCount);
    }
	
	public function TopRatedReviewsProduct()
    {

	$productsWithSumOfRates = Product::leftJoin('product_reviews as pr', 'products.id', '=', 'pr.product_id')
    ->select(
        'products.id',
        'products.title',
        'products.price',
        'products.photo',
        'products.slug',
        DB::raw('COALESCE(SUM(pr.rate), 0) as sum_of_rates')
    )
    ->groupBy('products.id', 'products.title', 'products.price', 'products.photo', 'products.slug')
	->orderBy('sum_of_rates','DESC')
	->whereNotNull('rate')
    ->get();
		return response()->json($productsWithSumOfRates);
    }




    public function filterByLanguage($language)
    {
		
	//$cacheKey = "ProductfilterByLanguage_{$language}";

    try {
        //$product_get_single = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source

            $product_get_single = Product::getAllProductByLanguageApi($language); // Replace with your actual data retrieval logic
			
      //  });

        return response()->json($product_get_single);
    } catch (QueryException $exception) {
        // Log the exception or handle it as needed
        // For example, you can log the error and return an error response
        \Log::error("Database error: {$exception->getMessage()}");
        
        return response()->json(['error' => 'An error occurred while fetching data.'], 500);
    } catch (\Exception $exception) {
        // Catch other types of exceptions if needed
        \Log::error("Error: {$exception->getMessage()}");

        return response()->json(['error' => 'An unexpected error occurred.'], 500);
    }
	
    }
	
	
	

    public function show(Request $request, $slug, $language)
    {
	  //print_r($slug);
	  //print_r($language);
	  
		if(array_key_exists('user', $request->all())){
			$user = User::where('id', $request->user)->first();
			Auth::login($user);
		}
	  
	  
      $post = Product::getProductBySlug($slug, $language); 
	  
		if (!$post) {
			return response()->json('null');
		}
      
			
	    $productattributes_data = $post->product_dropdown_attribute;

        $groupedProductAttributes = [];
        foreach ($productattributes_data as $attribute) {
			
            $parentAttributeId = $attribute->parent_attribute_id;
			$parentAttribute = ProductAttributes::firstWhere('id', $parentAttributeId);
			 $parentTitle = $parentAttribute->title;
			 // $parentSummary = $parentAttribute->summary;
			 // $parentSku = $parentAttribute->sku;
            $groupedProductAttributes[$parentTitle][] = $attribute->product_attribute->title;
        }
		
       $post['groupedProductAttributes'] = $groupedProductAttributes;
        //dd($post);
	 
        return response()->json($post);

		
		
       
    }

	
	
	
	public function aw3UploadImagesTest(Request $request)
	{ 
    // die('test');

    if ($request->hasFile('CustomizedImgage')) {
        $image = $request->file('CustomizedImgage');
        $imageName = $image->getClientOriginalName();
        $imagePath = $image->move(public_path('custom_images/aw3buckets'), $imageName);
         $path = url('custom_images/aw3buckets/'.$imageName);
        // If you want to store the image path in a database or perform other actions, you can do it here.

        return response()->json(['image_path' => $imagePath, 'path'=> $path]);
    }

    return response()->json(['error' => 'No image provided.'], 400);

		
	}


    public function aw3UploadImages(Request $request)
	{ 
    // die('test');

    if ($request->hasFile('CustomizedImgage')) {
        $image = $request->file('CustomizedImgage');
        $imageName = $image->getClientOriginalName();
        $imagePath = $image->move(public_path('custom_images/aw3buckets'), $imageName);
         $path = url('custom_images/aw3buckets/'.$imageName);
        // If you want to store the image path in a database or perform other actions, you can do it here.

        return response()->json(['image_path' => $imagePath, 'path'=> $path]);
    }

    return response()->json(['error' => 'No image provided.'], 400);

		
	}

    public function store(Request $request)
    {
		dd($request);
        $validatedData = $request->validate([
            'name' => 'required',
            'content' => 'required',
            'lang' => 'required',
        ]);

        $testimonial = Product::create($validatedData);

        return response()->json($testimonial, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'content' => 'required',
            'lang' => 'required',
        ]);

        $testimonial = Product::findOrFail($id);
        $testimonial->update($validatedData);

        return response()->json($testimonial, 200);
    }

    public function destroy($id)
    {
        $testimonial = Product::findOrFail($id);
        $testimonial->delete();

        return response()->json(null, 204);
    }
	
	

}
