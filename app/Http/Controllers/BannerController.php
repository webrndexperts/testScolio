<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Banner;
use App\Models\BannerParents;
use Illuminate\Support\Str;
use App\Models\Language;
use Illuminate\Support\Facades\DB;
class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
	    if(isset($_GET['lang'])){
			  $get_current_lang = !empty($_GET['lang']) ? $_GET['lang'] : ''; 
			  $banner = Banner::where('lang',$get_current_lang)->orderBy('id','DESC')->paginate(10);
		 }

		
       // $banner=Banner::orderBy('id','ASC')->paginate(10);
        return view('backend.banner.index')->with('banners',$banner)->with('get_current_lang',$get_current_lang);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
		 $languages = Language::getListActive();
        return view('backend.banner.create')->with('languages',$languages);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

	
	public function store(Request $request)
    {
        // return $request->all();
		
		 $data = $request->all();
		 
		 

		foreach ($data['post'] as $post) {
		$slug_title = $post['title'];


		if (isset($slug_title)) {
			$slug_data = Str::slug($slug_title);
		$data_by_slug[] = ['slug' => $slug_data];
	     }	
	    }
        $saved_slug = [];
		foreach($data_by_slug as $title_by_slug){
			$saved_slug[] = ['slug' => $title_by_slug['slug']];
	       $page =  BannerParents::create(['slug' => $title_by_slug['slug']]);
		}
     

		$status_data = !empty($data['status']) ? $data['status'] : 'active';
		
        if (is_array($data['post']) || is_object($data['post'])) {
 
        foreach ($data['post'] as $code => $value) {
			
		 $product_gallery = !empty($value['images_gallery']) ? $value['images_gallery'] : '';
		    //dd($product_gallery);
         if (is_array($product_gallery)) {
			$get_saved_image = [];
			foreach ($product_gallery as $image) {
			 $saved_folderimage = $image->getClientOriginalName();
			 $basePath = public_path('custom_images/patients-worldwide');
              $image->move($basePath, $saved_folderimage);
			  $get_saved_image[] = $saved_folderimage;
		  }
		}

	
				
		   if (isset($get_saved_image) && !empty($get_saved_image)) {

				if (is_array($get_saved_image)) {
					$multiple_Image = [];
					$arr_multipleImage = '';

					foreach ($get_saved_image as $db_images) {
						$multiple_Image[] = asset('custom_images/patients-worldwide/' . $db_images);
					}

					$arr_multipleImage = implode(',', $multiple_Image);
				} else {
					$arr_multipleImage = '';
				}
			} else {
				$arr_multipleImage = '';
			}

			if (isset($value['title'])) {
				$dataDes[] = [
					'banner_parent_id' => $page->id,
					'lang'  => $code,
					'status'  => $status_data,
					'title' => !empty($value['title']) ? $value['title'] : '',
					'photo' => !empty($arr_multipleImage) ? $arr_multipleImage : ''
				];
			 }
				
			
			
			  }
			}


		$dataDesWithSlugs = [];

		foreach ($dataDes as $index => $postData) {
			if (isset($saved_slug[$index])) {
				$slug = $saved_slug[$index]['slug'];
			   // dd($slug);
				// Check if a record with the same slug already exists
				$count = Banner::where('slug', $slug)->count();
				
				if ($count > 0) {
					// If a record with the same slug exists, append a suffix or take another action
					$slug .= '-' . Str::random(6); // Appending a random string to make it unique
				}

				// Add the slug to the data
				$postData['slug'] = $slug;

				// Add the data to the array
				$dataDesWithSlugs[] = $postData;
			}
		}

		// Create the Banner records
		foreach ($dataDesWithSlugs as $postData) {
			$status = Banner::create($postData);
		}

	
	
        // Move the create method outside the loop
        // foreach ($dataDes as $postData) {

	   	// foreach($saved_slug as $single_array_slug){
				
            // $postData['slug'] = $single_array_slug['slug'];
            // $status = Banner::create($postData);
		// }

				
       // }
		


        if($status){
            request()->session()->flash('success','Patients Successfully added');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('patients-worldwide.index', ['lang' => 'en_SG']);

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
        $banner=Banner::findOrFail($id);
        return view('backend.banner.edit')->with('banner',$banner);
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
		
		
        $banner=Banner::findOrFail($id);  
		
		//dd($banner->photo);
		$exits_banner_gallery = $banner->photo;    
		$title = $banner->title;    
		$description = $banner->description;    
       $custom_url_image = $request->images_gallery;
         $get_saved_image = $request->images_gallery;
		 
			 if(is_array($get_saved_image)){
			 $multiple_Image = [];
			 $arr_multipleImage = '';
			foreach ($get_saved_image as $d_images) {
				//   $db_images = $d_images->getClientOriginalName();
			   $multiple_Image[] =  asset('custom_images/patients-worldwide/' . $d_images);
			  }
			   $arr_multipleImage = implode(',',$multiple_Image);
			}
            //  dd($multiple_Image);
        $data =  [
            'description' =>  !empty($request->description) ? $request->description : $description,
            'title' =>  !empty($request->title) ? $request->title : $title,
            'photo' => !empty($custom_url_image) ? $custom_url_image : $exits_banner_gallery,
            'status' => $request->status
        ];
		
		
        // return $data;
        $status=$banner->fill($data)->save();
        if($status){
            request()->session()->flash('success','Patients Successfully updated');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('patients-worldwide.index', ['lang' => 'en_SG']);
    }

	
	
	

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $banner=Banner::findOrFail($id);
        $status=$banner->delete();
        if($status){
            request()->session()->flash('success','Patients successfully deleted');
        }
        else{
            request()->session()->flash('error','Error occurred while deleting banner');
        }
        return redirect()->route('patients-worldwide.index', ['lang' => 'en_SG']);
    }
	
	public function radiotvInterviewsfilterByLanguage($language)
    {
      $radio_tv_section_data =  Banner::where('page_type', 'radio_tv_section')->where('lang', $language)->orderBy('id', 'ASC')->get();

        return response()->json($radio_tv_section_data);
    }
	 

	public function printAppearancesfilterByLanguage($language)
    {
      $print_appearances_data =  Banner::where('page_type', 'print_appearances_section')->where('lang', $language)->orderBy('id', 'ASC')->get();

        return response()->json($print_appearances_data);
    }
	
	
	public function mediabPersonalitiesfilterByLanguage($language)
    {
      $media_personalities_data =  Banner::where('page_type', 'media_personalities_section')->where('lang', $language)->orderBy('id', 'ASC')->get();

        return response()->json($media_personalities_data);
    }
}
