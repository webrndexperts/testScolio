<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Footer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class FooterMenuController extends Controller
{
  public function index()
    {
        $xrays = Footer::getAllFooterByLanguageApi();
		//dd($xrays);
        return response()->json($xrays);
    }

    public function filterByLanguage($language)
    {
		 // $cacheKey = "footermenufilterByLanguage_{$language}";
        
		// $data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
          	$data =  Footer::getAllFooterByLanguageApi($language); // Replace with your actual data retrieval logic
      //  });
		
        return response()->json($data);
    }

    public function show($id)
    {
        $xray = Footer::findOrFail($id);
        return response()->json($xray);
    }

    public function store(Request $request)
    {
        // $validatedData = $request->validate([
            // 'name' => 'required',
            // 'description' => 'required',
            // 'lang' => 'required',
        // ]);
       $validatedData = $request->all();
        $xray = Footer::create($validatedData);

        return response()->json($xray, 201);
    }

    public function update(Request $request, $id)
    {
		$validatedData = $request->all();
        // $validatedData = $request->validate([
            // 'name' => 'required',
            // 'description' => 'required',
            // 'lang' => 'required',
        // ]);

        $xray = Footer::findOrFail($id);
        $xray->update($validatedData);

        return response()->json($xray, 200);
    }

    public function destroy($id)
    {
        $xray = Footer::findOrFail($id);
        $xray->delete();

        return response()->json(null, 204);
    }

}
