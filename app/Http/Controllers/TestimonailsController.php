<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Testimonails;
use App\Models\TestimonailsCategory;
use App\Models\TestimonailsParents;
use App\Models\Language;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\User;
class TestimonailsController extends Controller
{
    // public function __construct()
    //{
    //    $this->languages = Post::getListActive();
   /// }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
     
     public function index()
     {

 		if(isset($_GET['lang'])){
			  $get_current_lang = !empty($_GET['lang']) ? $_GET['lang'] : ''; 
			  $menu_model = Testimonails::where('lang',$get_current_lang)->orderBy('id','DESC')->paginate(10);
		 }
         //$posts = Testimonails::getAllTestimonails();
         //dd($posts);
         // return $posts;
         return view('backend.testimonials.index')->with('posts',$menu_model)->with('get_current_lang',$get_current_lang);
     }
 
     /**
      * Show the form for creating a new resource.
      *
      * @return \Illuminate\Http\Response
      */
     
     public function create()
     {
 
         $categories=TestimonailsCategory::get();
         $users=User::get();
         $languages = Language::getListActive();
         return view('backend.testimonials.create')->with('users',$users)->with('categories',$categories)->with('languages',$languages);
     }
 
     /**
      * Store a newly created resource in storage.
      *
      * @param  \Illuminate\Http\Request  $request
      * @return \Illuminate\Http\Response
      */
     public function store(Request $request)
     {
 
         $data=$request->all();

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
			 $dataPostParents = [
             'slug'    => $title_by_slug['slug'],
             'client_name' =>  !empty($data['client_name']) ? $data['client_name'] : '',
             'client_email' =>  !empty($data['client_email']) ? $data['client_email'] : '',
             'company_name' =>  !empty($data['company_name']) ? $data['company_name'] : '',
             'company_website' => !empty($data['company_website']) ? $data['company_website'] : ''
         ];
	       $page =  TestimonailsParents::create($dataPostParents);
		}
         $status_data = !empty($data['status']) ? $data['status'] : 'active';
         //dd($page);
         if (is_array($data['post']) || is_object($data['post'])) {
  
         foreach ($data['post'] as $code => $value) {
          //   dd($value);
            $imageName = '';    
            if (isset($value['image'])) {
          
              $image = $value['image'];
              $imageName = $value['image']->getClientOriginalName();
           
              $image->move(public_path('custom_images/testimonails'), $imageName);
             
            }
 
             if (isset($value['title'])) {
                 $dataDes[] = [
                     'testimonials_parent_id' => $page->id,
                     'lang'  => $code,
                     'title' => !empty($value['title']) ? $value['title'] : '',
                     'testimonials_cat_id' => !empty($value['post_cat_id']) ? $value['post_cat_id'] : 0,
                     'description' => !empty($value['description']) ? $value['description'] : '',
                     'summary' => !empty($value['summary']) ? $value['summary'] : '',
                     'seo_meta_title' => !empty($value['seo_meta_title']) ? $value['seo_meta_title'] : '',
                     'seo_meta_description' => !empty($value['seo_meta_description']) ? $value['seo_meta_description'] : '',
                     'seo_meta_tag' => !empty($value['seo_meta_tag']) ? $value['seo_meta_tag'] : '',
                     'video_url' => !empty($value['video_url']) ? $value['video_url'] : '',
                     'photo' => !empty($imageName) ? $imageName : '',
					 'status'  => $status_data,
                 ];
             } else {
                 echo 'not insert';
             }
         }
     } 
	 
	
			 $dataDesWithSlugs = [];

			foreach ($dataDes as $index => $postData) {
				if (isset($saved_slug[$index])) {
					$slug = $saved_slug[$index]['slug'];
				   // dd($slug);
					// Check if a record with the same slug already exists
					$count = Testimonails::where('slug', $slug)->count();
					
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
				$status = Testimonails::create($postData);
			}

         
         if($status){
             request()->session()->flash('success','Post Successfully added');
         }
         else{
             request()->session()->flash('error','Please try again!!');
         }
         return redirect()->route('testimonials.index',['lang' => 'en_SG']);
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
         $post=Testimonails::findOrFail($id);
         $categories=TestimonailsCategory::get();
         $users=User::get();
         $languages = Language::getListActive();
         return view('backend.testimonials.edit')->with('categories',$categories)->with('users',$users)->with('post',$post)->with('languages',$languages);
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
         $post=Testimonails::findOrFail($id);
		$language_redirect =  $post->lang;
          // return $request->all();
         //  $this->validate($request,[
         //     'title'=>'string|required',
         //     'excerpt'=>'string|required',
         //     'description'=>'string|nullable',
         //     'status'=>'required|in:active,inactive'
         // ]);
        
 
         $data=$request->all();
         //dd($data);
         // return $data;
 
         $status=$post->fill($data)->save();
         if($status){
             request()->session()->flash('success','Testimonails Successfully updated');
         }
         else{
             request()->session()->flash('error','Please try again!!');
         }
         return redirect()->route('testimonials.index',['lang' => $language_redirect]);
     }
     /**
      * Remove the specified resource from storage.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function destroy($id)
     {
         $post=Testimonails::findOrFail($id);
        
         $status=$post->delete();
         
         if($status){
             request()->session()->flash('success','Testimonails successfully deleted');
         }
         else{
             request()->session()->flash('error','Error while deleting testimonails ');
         }
         return redirect()->route('testimonials.index',['lang' => 'en_SG']);
     }
}
