<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GoogleReviews;
use App\Models\Language;
use Illuminate\Support\Str;
class GoogleReviewsController extends Controller
{
      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $xrayresultsCategories=GoogleReviews::orderBy('id','DESC')->paginate(10);
        return view('backend.google-reviews.index')->with('xrayresultsCategories',$xrayresultsCategories);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
		$languages = Language::getListActive();
        return view('backend.google-reviews.create')->with('languages',$languages);;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
		// Validate the request
		$this->validate($request, [
			'name' => 'string|required',
			//'image' => 'required|image', // Add validation rule for the image
		]);
         $data=$request->all();
	//	dd($data);
		// If image is present in the request
	    if ($data['image']) {
			 $image = $data['image']; // Get the uploaded file object
		 $imageName = $image->getClientOriginalName(); // Get the original name of the image

			 $image->move(public_path('custom_images/google-reviews'), $imageName);


		} else {
			$imageName = ''; // Set default value if no image is uploaded
		}
         //dd($imageName);
		// Prepare the data array
		$dataDes = [
			'lang' => !empty($data['lang']) ? $data['lang'] : '',
			'name' => !empty($data['name']) ? $data['name'] : '',
			'rating' => !empty($data['rating']) ? $data['rating'] : '',
			'description' => !empty($data['description']) ? $data['description'] : '',
			'publish_date' => !empty($data['publish_date']) ? $data['publish_date'] : '',
			'image' => !empty($imageName) ? asset('custom_images/google-reviews/' . $imageName) : '',
		];

        $status=GoogleReviews::create($dataDes);
        if($status){
            request()->session()->flash('success','Google reviews Successfully added');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('google-reviews.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $xrayCategory=GoogleReviews::findOrFail($id);
		$languages = Language::getListActive();
        return view('backend.google-reviews.edit')->with('xrayCategory',$xrayCategory)->with('languages',$languages);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
		$postCategory = GoogleReviews::findOrFail($id);

		// Validate the request
		$this->validate($request, [
			'name' => 'string|required',
			'image' => 'image', // Validate the image field if it exists
		]);

		$data = $request->all();

		// Check if the image exists in the request
		if ($request->hasFile('image')) {
			$image = $request->file('image');
			$imageName = $image->getClientOriginalName();
			$image->move(public_path('custom_images/google-reviews'), $imageName);
		} else {
			$imageName = $postCategory->image ?? ''; // Use the existing image if available
		}

		// Prepare the data array
		$dataDes = [
			'lang' => $data['lang'] ?? $postCategory->lang,
			'name' => $data['name'] ?? $postCategory->name,
			'rating' => $data['rating'] ?? $postCategory->rating,
			'description' => $data['description'] ?? $postCategory->description,
			'publish_date' => $data['publish_date'] ?? $postCategory->publish_date,
			'image' => !empty($imageName) ? asset('custom_images/google-reviews/' . $imageName) : '',
		];

		// Update the post category
		$status = $postCategory->fill($dataDes)->save();
        if($status){
            request()->session()->flash('success','Google reviews Successfully updated');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('google-reviews.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $postCategory=GoogleReviews::findOrFail($id);
       
        $status=$postCategory->delete();
        
        if($status){
            request()->session()->flash('success','Google reviews successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting XRay category');
        }
        return redirect()->route('google-reviews.index');
    }
	
	 public function googlereviewFilterByLanguage($language){
		$getGoogleReview=GoogleReviews::where('lang', $language)->orderBy('id','ASC')->get();

		if ($getGoogleReview) {
		return response()->json(['success'=> 'true', 'data' => $getGoogleReview]);
		} else {
		return response()->json(['success'=> 'false', 'data' => 'google review not found'], 404);
		}
    }
}
