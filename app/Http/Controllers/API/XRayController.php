<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\XrayImg;
use App\Models\XrayResults as XRay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class XRayController extends Controller
{
    public function index()
    {
        $xrays = XRay::all();
        return response()->json($xrays);
    }

    public function show($id)
    {
        $xray = XRay::findOrFail($id);
        return response()->json($xray);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'lang' => 'required',
        ]);

        $xray = XRay::create($validatedData);

        return response()->json($xray, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'lang' => 'required',
        ]);

        $xray = XRay::findOrFail($id);
        $xray->update($validatedData);

        return response()->json($xray, 200);
    }

    public function destroy($id)
    {
        $xray = XRay::findOrFail($id);
        $xray->delete();

        return response()->json(null, 204);
    }

    public function filterByLanguage($language)
    {
        $xrays = XRay::where('lang', $language)->where('status','active')->get();
        return response()->json($xrays);
    }
	
	public function DropdownFilterByAge($language, $age='')
	{

		
             $xraysQuery = '';
             if ($age == 'more') {
				// dd($age);
			 $xraysQuery = XRay::query()->where('age', '>=',50 )->orderBy('age', 'ASC');
			 }else{
		     list($minAge, $maxAge) = explode('-', $age);
			 $xraysQuery = XRay::query()->whereBetween('age', [$minAge, $maxAge])->orderBy('age', 'ASC');
			 }
            $xraysQuery->where('lang', $language);
			$xrays = $xraysQuery->get();

           $response = [
		      'success' => true,
		      'data' => $xrays
		   ];
		   return response()->json($response);
		
	}
	
	
	
	
	// public function DropdownFilterByCurveDegree($curve_degree='')
	// {
		// try {
			// $xraysQuery = XRay::query();

			// if ($curve_degree) {
				// $xraysQuery->where('curve_degree', $curve_degree);
			// }
			// $xrays = $xraysQuery->get();

			// Log::info("Filtered X-rays: " . json_encode($xrays));
           // $response = [
		      // 'success' => true,
		      // 'data' => $xrays
		   // ];
			// return response()->json($response);
		// } catch (\Exception $e) {
			// Log::error("Error in DropdownFilterByAge: " . $e->getMessage());
			// return response()->json(['error' => 'Something went wrong'], 500);
		// }
	// }

    public function uploadXray(Request $request) {
        $request->validate([
            'xray_image' => 'required|image|max:5000',
            'email' => 'required|email',
            'product_id' => 'required|exists:products,id',
            'user_id' => 'nullable|exists:users,id'
        ]);
        
        $featured_image = $request->file('xray_image');
        $imageName = time() . '_' . $featured_image->getClientOriginalName(); // Avoid duplicate names
        $destinationPath = public_path('custom_images/xrays');
    
        // Move image to public path
        $featured_image->move($destinationPath, $imageName);

        // Save path relative to public
        $relativePath = 'custom_images/xrays/' . $imageName;

        $upload = XrayImg::create([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
            'email' => $request->email,
            'image_path' => $relativePath,
            'status' => 'pending'
        ]);
        
        return response()->json([
            'upload_id' => $upload->id,
            'message' => 'X-ray uploaded successfully'
        ]);
    }
	
}
