<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PageController extends Controller
{
    public function index()
    {
        $pages = Page::getAllPageLanguageApi();
        return response()->json($pages);
    }
	    public function filterByLanguage($language)
    {
		
		// $cacheKey = "PagefilterByLanguage_{$language}";
		
		 // $pages = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
            return Page::getAllPageLanguageApi($language); // Replace with your actual data retrieval logic
        //});
		
      //  $pages = Page::getAllPageLanguageApi($language);
        return response()->json($pages);
    }
	
	
	public function show($slug, $language)
    {
        $post = Page::where('slug', $slug)
        ->where('lang', $language)
        ->first(); 
		
		
		if(!$post) {
			$post = 'null';
		}
		
		
        return response()->json($post);
		
		
	// $post = Page::where('slug', $slug)
		// ->where('lang', $language)
		// ->first();

	// if ($post) {
		// return response()->json([
		// 'status' => true,
		// 'data' => $post,
		// 'message' => 'Page retrieved successfully'
		// ], 200);
	// } else {
		// return response()->json([
		// 'status' => false,
		// 'message' => 'Page data not found'
		// ], 404);
	// }	
		
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'lang' => 'required',
        ]);

        $page = Page::create($validatedData);

        return response()->json($page, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'lang' => 'required',
        ]);

        $page = Page::findOrFail($id);
        $page->update($validatedData);

        return response()->json($page, 200);
    }

    public function destroy($id)
    {
        $page = Page::findOrFail($id);
        $page->delete();

        return response()->json(null, 204);
    }


}
