<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Accordions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;


class AccordionController extends Controller
{
    public function index()
    {
        $xrays = Accordions::paginate();
        return response()->json($xrays);
    }

    public function show($id)
    {
        $xray = Accordions::findOrFail($id);
        return response()->json($xray);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'lang' => 'required',
        ]);

        $xray = Accordions::create($validatedData);

        return response()->json($xray, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'lang' => 'required',
        ]);

        $xray = Accordions::findOrFail($id);
        $xray->update($validatedData);

        return response()->json($xray, 200);
    }

    public function destroy($id)
    {
        $xray = Accordions::findOrFail($id);
        $xray->delete();

        return response()->json(null, 204);
    }

    public function filterByLanguage($language)
    {
		
		//$cacheKey = "accordionsfilterByLanguage_{$language}";
		
				//$data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
         $data = Accordions::where('lang', $language)->paginate(12); // Replace with your actual data retrieval logic
       // });
		
        return response()->json($data);
    }
	
	public function pagesByFaq($slug, $language)
    {

			return Accordions::pagesbyFaqAccordions($slug, $language);

		
        return response()->json($data);
    }
}
