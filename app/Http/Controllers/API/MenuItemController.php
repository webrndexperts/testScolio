<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use NguyenHuy\Menu\Models\Menus;
use NguyenHuy\Menu\Models\MenuItems;
use Illuminate\Support\Facades\Cache;

class MenuItemController extends Controller
{
    public function index()
    {

            // If the data is not in the cache, fetch it from the database or other source
            $data = Menus::with('items')->get(); // Replace with your actual data retrieval logic
		
        //$xrays = Menus::with('items')->get();
        return response()->json($data);
    }
	
	public function headerMenufilterByLanguage($language)
    {
		
		//$cacheKey = "headerMenufilterByLanguage_{$language}";

    try {
      

        $pages = Menus::with('items')->where('menu_type', 'header')->where('lang', $language)->orderBy('id', 'ASC')->get(); // Replace with your actual data retrieval logic
     //   });
		
        return response()->json($pages);
		
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
	
	public function footerMenufilterByLanguage($language)
    {
		
		//$cacheKey = "headerMenufilterByLanguage_{$language}";

    try {
      

        $footer_menus = Menus::with('items')->where('menu_type', 'footer')->where('lang', $language)->orderBy('id', 'ASC')->get(); // Replace with your actual data retrieval logic
     //   });
		
        return response()->json($footer_menus);
		
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
}
