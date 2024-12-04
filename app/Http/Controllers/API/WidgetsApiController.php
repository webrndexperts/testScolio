<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Widgets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class WidgetsApiController extends Controller
{
  public function index()
    {
        $xrays = Widgets::getAllWidgetsLanguageApi();
		//dd($xrays);
        return response()->json($xrays);
    }

    public function filterByLanguage($language)
    {
		$cacheKey = "WidgetsfilterByLanguage_{$language}";
		$data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
            return Widgets::getAllWidgetsLanguageApi($language); // Replace with your actual data retrieval logic
      });
		
        return response()->json($data);
    }	
	 
	 public function filterByBottomImage($language)
    {
		//dd($language);
		//$cacheKey = "WidgetsfilterBottomImage_{$language}";
		//$data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
            $data = Widgets::getAllBottomImageApi($language); // Replace with your actual data retrieval logic
     // });
		
        return response()->json($data);
    }	
	
	
	public function ContactInfoWidget(){
		
	  $xrays = Widgets::getAllContactInfoLanguageApi();
        return response()->json($xrays);
		
	}
	
	public function filterByLanguageContactWidgetInfo($language)
    {
	//	$cacheKey = "filterByLanguageContactWidgetInfo_{$language}";
		//$data = Cache::remember($cacheKey, now()->addMinutes(1), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
          //  return Widgets::getAllContactInfoLanguageApi($language); // Replace with your actual data retrieval logic
       // });
		 $data_test = Widgets::getAllContactInfoLanguageApi($language);
        //$xrays = Widgets::getAllContactInfoLanguageApi($language);
        return response()->json($data_test);
    }
	
	public function TelephoneWidget(){
		
	  $xrays = Widgets::getAllTelephoneLanguageApi();
        return response()->json($xrays);
		
	}
	
	public function filterByLanguageTelephoneWidget($language)
    {
	//	$cacheKey = "filterByLanguageTelephoneWidget_{$language}";
		//$data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
            $data = Widgets::getAllTelephoneLanguageApi($language); // Replace with your actual data retrieval logic
       // });
		
        //$xrays = Widgets::getAllTelephoneLanguageApi($language);
        return response()->json($data);
    }
	
	
	public function OpeningHoursWidget(){
		
	  $xrays = Widgets::getAllOpeningHoursLanguageApi();
        return response()->json($xrays);
		
	}
	
	public function filterByLanguageOpeningHoursWidget($language)
    {
		
		$cacheKey = "filterByLanguageOpeningHoursWidget_{$language}";
		$data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
            return Widgets::getAllOpeningHoursLanguageApi($language); // Replace with your actual data retrieval logic
        });
		
       // $xrays = Widgets::getAllOpeningHoursLanguageApi($language);
        return response()->json($data);
    }
	
	public function ScoliosisResultsSidebarWidget(){
		
	  $xrays = Widgets::getAllScoliosisResultsLanguageApi();
        return response()->json($xrays);
		
	}
	
	public function filterByLanguageScoliosisResultsSidebar($language)
    {
		$cacheKey = "filterByLanguageScoliosisResultsSidebar_{$language}";
		$data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
            return Widgets::getAllScoliosisResultsLanguageApi($language); // Replace with your actual data retrieval logic
        });
		
       // $xrays = Widgets::getAllScoliosisResultsLanguageApi($language);
        return response()->json($data);
    }
	

	public function OurPromiseSidebarWidget(){
		
	  $xrays = Widgets::getAllOurPromiseLanguageApi();
        return response()->json($xrays);
		
	}
	
	public function filterByLanguageOurPromiseSidebar($language)
    {
		$cacheKey = "filterByLanguageOurPromiseSidebar_{$language}";
		$data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
            return Widgets::getAllOurPromiseLanguageApi($language); // Replace with your actual data retrieval logic
        });
		
      //  $xrays = Widgets::getAllOurPromiseLanguageApi($language);
        return response()->json($data);
    }


    public function show($id)
    {
        $xray = Widgets::findOrFail($id);
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
        $xray = Widgets::create($validatedData);

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

        $xray = Widgets::findOrFail($id);
        $xray->update($validatedData);

        return response()->json($xray, 200);
    }

    public function destroy($id)
    {
        $xray = Widgets::findOrFail($id);
        $xray->delete();

        return response()->json(null, 204);
    }

}
