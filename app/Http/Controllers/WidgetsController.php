<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Widgets;
use App\Models\WidgetsParents;
use App\Models\Language;
use App\User;
use Illuminate\Support\Str;

class WidgetsController extends Controller
{
       public function index()
    {

	    if(isset($_GET['lang'])){
			  $get_current_lang = !empty($_GET['lang']) ? $_GET['lang'] : ''; 
			  $menu_model = Widgets::where('lang',$get_current_lang)->orderBy('id','DESC')->paginate(10);
		 }

        //$pages=Widgets::getWidgetsHomePage();
        // return $posts;
        return view('backend.widgets.index')->with('pages',$menu_model)->with('get_current_lang',$get_current_lang);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function create()
    {
        $languages = Language::getListActive();
        return view('backend.widgets.create')->with('languages',$languages);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
           
        $this->validate($request,[
            'post_name'=>'required',
            //'page_slug'=>'required'
        ]);

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
				 'widgets_type' =>  !empty($data['post_name']) ? $data['post_name'] : ''
			 ];
			$page =  WidgetsParents::create($dataPostParents);
		}
         $status_data = !empty($data['status']) ? $data['status'] : 'active';	
		
		
		$post_type = $data['post_name'];

        if (is_array($data['post']) || is_object($data['post'])) {
 
        foreach ($data['post'] as $code => $value) {
			
			 
	     $imageName = '';    
        
            if (isset($value['image'])) {
               // dd($value['image']);
             $image = $value['image'];
             $imageName = $value['image']->getClientOriginalName();
          
             $image->move(public_path('custom_images/widgets'), $imageName);
            
           }
	

			   if (isset($value['title'])) {
                $dataDes[] = [
                    'widget_parent_id' => !empty($page->id) ? $page->id : '',
					'widgets_type' => !empty($post_type) ? $post_type : '',
                    'lang'  => !empty($code) ? $code : '',
                    'title' => !empty($value['title']) ? $value['title'] : '',
					'description' => !empty($value['description']) ? $value['description'] : '',
					'photo' => !empty($imageName) ? asset('custom_images/widgets/' . $imageName) : '',
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
					$count = Widgets::where('slug', $slug)->count();
					
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
			$status = Widgets::create($postData);
		}
	
	
	
	
	
	
        // Move the create method outside the loop
        // foreach ($dataDes as $postData) {

            // $status = Widgets::create($postData);
        // }
        if($status){
            request()->session()->flash('success','Homepage Benifits Successfully added');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('widgets.index', ['lang' => 'en_SG']);
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
        $post=Widgets::findOrFail($id);
        $languages = Language::getListActive();
        return view('backend.widgets.edit')->with('post',$post)->with('languages',$languages);
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
        $page=Widgets::findOrFail($id);
		$exits_photo = $page->photo;  

	
	      if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = $image->getClientOriginalName();
            $image->move(public_path('custom_images/widgets'), $imageName);
        }
	
		 $data =  [
            'title' => !empty($request->title) ? $request->title : $page->title,
            'description' => !empty($request->description) ? $request->description : $page->description,
			'photo' => !empty($imageName) ? asset('custom_images/widgets/' . $imageName) : $exits_photo,
			'count_numbers' =>  !empty($request->count_numbers) ? $request->count_numbers : $page->count_numbers,
			'widgets_type' =>  !empty($request->post_name) ? $request->post_name : $page->widgets_type,
			'slug' =>  !empty($request->page_slug) ? $request->page_slug : $page->slug,
            'status' => !empty($request->status) ? $request->status : $page->status
        ];
		
      //dd($data);


        $status=$page->fill($data)->save();
        if($status){
            request()->session()->flash('success','Homepage Benifits Successfully updated');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('widgets.index', ['lang' => 'en_SG']);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $page=Widgets::findOrFail($id);
       
        $status=$page->delete();
        
        if($status){
            request()->session()->flash('success','Homepage Benifits successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting page ');
        }
        return redirect()->route('widgets.index', ['lang' => 'en_SG']);
    }
}
