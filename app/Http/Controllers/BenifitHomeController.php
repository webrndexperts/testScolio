<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BenifitHomepage;
use App\Models\BenifitHomeParents;
use App\Models\Language;
use App\User;
use Illuminate\Support\Str;

class BenifitHomeController extends Controller
{
       public function index()
    {

	    if(isset($_GET['lang'])){
			  $get_current_lang = !empty($_GET['lang']) ? $_GET['lang'] : ''; 
			  $menu_model = BenifitHomepage::where('lang',$get_current_lang)->orderBy('id','DESC')->paginate(10);
		 }

        //$pages=BenifitHomepage::getAllBenifitHomePage();
        // return $posts;
        return view('backend.homepage-benifits.index')->with('pages',$menu_model)->with('get_current_lang',$get_current_lang);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function create()
    {
        $languages = Language::getListActive();
        return view('backend.homepage-benifits.create')->with('languages',$languages);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
           
        // $this->validate($request,[
        //     'title'=>'required',
        //     'page_slug'=>'required',
        //     'status'=>'required|in:active,inactive'
        // ]);

        $data=$request->all();
		//dd($data);
		$slug=Str::slug($request->title);
        $count=BenifitHomepage::where('slug',$slug)->count();
        if($count>0){
            $slug=$slug.'-'.date('ymdis').'-'.rand(0,999);
        }
		
		$count_numbers = ''; 
		$page_slug = '';
		$post_type = $data['post_name'];
		if($post_type == 'benifits-clinic'){
			$count_numbers =  $data['count_numbers'];
		}
		if($post_type == 'non-treatment'){
			$page_slug = $data['page_slug'];
		}
		if($post_type == 'specail-offer'){
			$page_slug = $data['page_slug'];
		}
		 $slug_name = $slug;
		 
		 //dd($slug_name);
		 
		 $benifit_countno = $data['count_numbers'];
        // dd($data);
        $dataPageParents = [
            'slug'    => $slug_name
        ];
        $page = BenifitHomeParents::create($dataPageParents);
        //dd($page);
        if (is_array($data['post']) || is_object($data['post'])) {
 
        foreach ($data['post'] as $code => $value) {
			
			
		 if(!empty($count_numbers)){
			 
	     $imageName = '';    
        
            if (isset($value['image'])) {
               // dd($value['image']);
             $image = $value['image'];
             $imageName = $value['image']->getClientOriginalName();
          
             $image->move(public_path('custom_images/homepage-benifits'), $imageName);
            
           }
	

			   if (isset($value['title'])) {
                $dataDes[] = [
                    'homebenifit_parent_id' => $page->id,
					'slug' => $slug_name,
					'post_type' => $post_type,
					'count_numbers' => $benifit_countno,
                    'lang'  => $code,
                    'title' => $value['title'],
					'description' => $value['description'],
					'photo' => !empty($imageName) ? asset('custom_images/homepage-benifits/' . $imageName) : '',
                ];
            } else {
                echo 'not insert';
            }	
	 }
	    if(!empty($page_slug)){
			 
			$imageName = '';    
        
            if (isset($value['image'])) {
               // dd($value['image']);
             $image = $value['image'];
             $imageName = $value['image']->getClientOriginalName();
          
             $image->move(public_path('custom_images/non-treatment'), $imageName);
            
           }
			 
			   if (isset($value['title'])) {
                $dataDes[] = [
                    'homebenifit_parent_id' => $page->id,
					'slug' => $page_slug,
					'post_type' => $post_type,
					'count_numbers' => '',
                    'lang'  => $code,
                    'title' => !empty($value['title']) ? $value['title'] : '',
					'description' => !empty($value['description']) ? $value['description'] : '',
					'photo' => !empty($imageName) ? asset('custom_images/non-treatment/' . $imageName) : '',
                ];
            } else {
                echo 'not insert';
            }
			 
		   }     
			
			
        }
    } 
        // Move the create method outside the loop
        foreach ($dataDes as $postData) {

            $status = BenifitHomepage::create($postData);
        }
        if($status){
            request()->session()->flash('success','Homepage Benifits Successfully added');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('homepage-benifits.index',['lang' => 'en_SG']);
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
        $post=BenifitHomepage::findOrFail($id);
        $languages = Language::getListActive();
        return view('backend.homepage-benifits.edit')->with('post',$post)->with('languages',$languages);
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
        $page=BenifitHomepage::findOrFail($id);
		$exits_photo = $page->photo;  
		$post_type = $page->post_type;  
         // return $request->all();
         // $this->validate($request,[
            // 'title'=>'string|required',
            // 'excerpt'=>'string|required',
            // 'description'=>'string|nullable',
            // 'status'=>'required|in:active,inactive'
        // ]);
	
	      if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = $image->getClientOriginalName();
            $image->move(public_path('custom_images/non-treatment'), $imageName);
        }
	
		 $data =  [
            'title' =>  !empty($request->title) ? $request->title : $page->title,
            'description' =>  !empty($request->description) ? $request->description : $page->description,
			//'photo' => !empty($imageName) ? asset('custom_images/non-treatment/' . $imageName) : $exits_photo,
			'photo' => !empty($request->photo) ? $request->photo : $exits_photo,
			'count_numbers' =>  !empty($request->count_numbers) ? $request->count_numbers : $page->count_numbers,
			'video_url' =>  !empty($request->video_url) ? $request->video_url : $page->video_url,
			'post_type' =>  !empty($request->post_name) ? $request->post_name : $post_type,
			'slug' =>  !empty($request->page_slug) ? $request->page_slug : $page->slug,
            'status' => $request->status
        ];
		
      //dd($data);


        $status=$page->fill($data)->save();
        if($status){
            request()->session()->flash('success','Homepage Benifits Successfully updated');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('homepage-benifits.index',['lang' => $page->lang]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $page=BenifitHomepage::findOrFail($id);
       
        $status=$page->delete();
        
        if($status){
            request()->session()->flash('success','Homepage Benifits successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting page ');
        }
        return redirect()->route('homepage-benifits.index',['lang' => 'en_SG']);
    }
}
