<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Testimonails as Testimonial;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class TestimonialController extends Controller
{
    public function index()
    {
		// $cacheKey = "Testimonialindex";
		
		// $testimonials = Cache::remember($cacheKey, now()->addMinutes(60), function () {
            // If the data is not in the cache, fetch it from the database or other source
            $testimonials = Testimonial::get(); // Replace with your actual data retrieval logic
        //});
		
        //$testimonials = Testimonial::paginate(10);
        return response()->json($testimonials);
    }

    public function show($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        return response()->json($testimonial);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'content' => 'required',
            'lang' => 'required',
        ]);

        $testimonial = Testimonial::create($validatedData);

        return response()->json($testimonial, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'content' => 'required',
            'lang' => 'required',
        ]);

        $testimonial = Testimonial::findOrFail($id);
        $testimonial->update($validatedData);

        return response()->json($testimonial, 200);
    }

    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();

        return response()->json(null, 204);
    }

    public function filterByLanguage($language)
    {
		// $cacheKey = "TestimonialfilterByLanguage_{$language}";
		
		// $testimonials = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
            $testimonials = Testimonial::where('lang', $language)->get(); // Replace with your actual data retrieval logic
      //  });
		
        //$testimonials = Testimonial::where('lang', $language)->paginate(10);
        return response()->json($testimonials);
    }
	
	
     public function BannerfilterByLanguage($language)
    {
		// $cacheKey = "Banner_testfilterByLanguage_{$language}";
		
		// $Banner_data = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
            $Banner_data =  Banner::where('lang', $language)->get(); // Replace with your actual data retrieval logic
       // });
		
        //$testimonials = Testimonial::where('lang', $language)->paginate(10);
        return response()->json($Banner_data);
    }
	
}
