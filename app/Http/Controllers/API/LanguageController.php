<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class LanguageController extends Controller
{
    public function index()
    {
		
		//$cacheKey = "filterBy_indexLanguage";
		// $data = Cache::remember($cacheKey, now()->addMinutes(60), function () {
            // If the data is not in the cache, fetch it from the database or other source
           $data = Language::all(); // Replace with your actual data retrieval logic
        //});
      //  $xrays = Language::all();
        return response()->json($data);
    }

    public function show($id)
    {
        $xray = Language::findOrFail($id);
        return response()->json($xray);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'code' => 'required',
            'lang' => 'required',
        ]);

        $xray = Language::create($validatedData);

        return response()->json($xray, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'code' => 'required',
            'lang' => 'required',
        ]);

        $xray = Language::findOrFail($id);
        $xray->update($validatedData);

        return response()->json($xray, 200);
    }

    public function destroy($id)
    {
        $xray = Language::findOrFail($id);
        $xray->delete();

        return response()->json(null, 204);
    }

    public function filterBySingleLanguage($language)
    {
		// $cacheKey = "filterBy_CustomLanguage_{$language}";
		// $data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
            $data = Language::where('code', $language)->get(); // Replace with your actual data retrieval logic
     //   });
		
        //$xrays = Language::where('lang', $language)->paginate(10);
        return response()->json($data);
    }
}
