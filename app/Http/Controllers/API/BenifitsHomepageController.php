<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\BenifitHomepage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BenifitsHomepageController extends Controller
{
  public function index()
    {
        $xrays = BenifitHomepage::getAllBenifitLanguageApi();
		//dd($xrays);
        return response()->json($xrays);
    }
	
	public function nonTreatment(){
		
	  $xrays = BenifitHomepage::getAllNonTreatmentLanguageApi();
		//dd($xrays);
        return response()->json($xrays);
		
	}
	
	public function filterByLanguagenonTreatment($language)
    {
		 // $cacheKey = "filterByLanguagenonTreatment_{$language}";
		// $data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
             $data = BenifitHomepage::getAllNonTreatmentLanguageApi($language); // Replace with your actual data retrieval logic
        //});
		
		
        return response()->json($data);
    }
	
	public function SpecailOffer(){
		
	  $xrays = BenifitHomepage::getAllSpecailOfferLanguageApi();
		//dd($xrays);
        return response()->json($xrays);
		
	}
	
	public function filterByLanguageSpecailOffer($language)
    {
		// $cacheKey = "filterByLanguageSpecailOffer_{$language}";
		// $data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
            $data = BenifitHomepage::getAllSpecailOfferLanguageApi($language); // Replace with your actual data retrieval logic
       // });
        return response()->json($data);
    }
	
	public function filterByLanguagePraisePatients($language)
    {
		// $cacheKey = "filterByLanguageSpecailOffer_{$language}";
		// $data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
            $data = BenifitHomepage::getAllPraisePatientsLanguageApi($language); // Replace with your actual data retrieval logic
       // });
        return response()->json($data);
    }
	

    public function filterByLanguageBenifits($language)
    {
		 // $cacheKey = "filterByLanguageBenifits_{$language}";
		// $data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
             $data = BenifitHomepage::getAllBenifitLanguageApi($language); // Replace with your actual data retrieval logic
       // });
        return response()->json($data);
    }

    public function show($id)
    {
        $xray = BenifitHomepage::findOrFail($id);
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
	  // dd($validatedData);
        $xray = BenifitHomepage::create($validatedData);

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

        $xray = BenifitHomepage::findOrFail($id);
        $xray->update($validatedData);

        return response()->json($xray, 200);
    }

    public function destroy($id)
    {
        $xray = BenifitHomepage::findOrFail($id);
        $xray->delete();

        return response()->json(null, 204);
    }

}
