<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Accordions;
use App\Models\AccordionsCategory;
use App\Models\AccordionsParents;
use App\Models\Language;
use Illuminate\Support\Facades\DB;
use App\User;
use Illuminate\Support\Str;

class AccordionsController extends Controller
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
         // $posts = Post::select('id', 'post_parent_id', 'title','lang')
         // ->where('post_parent_id', 45)
         // ->whereNotNull('post_parent_id')
         // ->get();
         //   dd($posts);
		 
		if(isset($_GET['lang'])){
			  $get_current_lang = !empty($_GET['lang']) ? $_GET['lang'] : ''; 
			  $posts = Accordions::where('lang',$get_current_lang)->orderBy('id','DESC')->paginate(10);
		 }
 
         //$posts = Accordions::getAllAccordions();
         //dd($posts);
         // return $posts;
         return view('backend.accordions.index')->with('posts',$posts)->with('get_current_lang',$get_current_lang);
     }
 
     /**
      * Show the form for creating a new resource.
      *
      * @return \Illuminate\Http\Response
      */
     
     public function create()
     {
 
         $categories=AccordionsCategory::get();
         $users=User::get();
         $languages = Language::getListActive();
         return view('backend.accordions.create')->with('users',$users)->with('categories',$categories)->with('languages',$languages);
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
        //dd($data);
		
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
	       $page =  AccordionsParents::create(['slug' => $title_by_slug['slug']]);
		}
     

		$status_data = !empty($data['status']) ? $data['status'] : 'active';

         //dd($page);
         if (is_array($data['post']) || is_object($data['post'])) {
  
         foreach ($data['post'] as $code => $value) {
             if (isset($value['title'])) {
                 $dataDes[] = [
                     'accordions_parent_id' => $page->id,
                     'lang'  => $code,
					 'status'  => $status_data,
                     'title' => $value['title'],
                     'accordions_cat_id' => $value['post_cat_id'],
                     'description' => $value['description']
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
					$count = Accordions::where('slug', $slug)->count();
					
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
				$status = Accordions::create($postData);
			}
	 
         // Move the create method outside the loop
         // foreach ($dataDes as $postData) {
 
             // $status = Accordions::create($postData);
         // }
         
         if($status){
             request()->session()->flash('success','Accordions Successfully added');
         }
         else{
             request()->session()->flash('error','Please try again!!');
         }
         return redirect()->route('accordions.index', ['lang' => 'en_SG']);
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
         $post=Accordions::findOrFail($id);
         $categories=AccordionsCategory::get();
         $users=User::get();
         $languages = Language::getListActive();
         return view('backend.accordions.edit')->with('categories',$categories)->with('users',$users)->with('post',$post)->with('languages',$languages);
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
         $post=Accordions::findOrFail($id);
		 $lang_by_redirect = $post->lang;   
        // dd($post);
          // return $request->all();
         //  $this->validate($request,[
         //     'title'=>'string|required',
         //     'excerpt'=>'string|required',
         //     'description'=>'string|nullable',
         //     'status'=>'required|in:active,inactive'
         // ]);
        
 
         $data=$request->all();
      
         // return $data;
 
         $status=$post->fill($data)->save();

         if($status){
             request()->session()->flash('success','Accordions Successfully updated');
         }
         else{
             request()->session()->flash('error','Please try again!!');
         }
         return redirect()->route('accordions.index', ['lang' => $lang_by_redirect]);
     }
     /**
      * Remove the specified resource from storage.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function destroy($id)
     {
         $post=Accordions::findOrFail($id);
        
         $status=$post->delete();
         
         if($status){
             request()->session()->flash('success','Accordions successfully deleted');
         }
         else{
             request()->session()->flash('error','Error while deleting accordions ');
         }
         return redirect()->route('accordions.index', ['lang' => 'en_SG']);
     }
}
