<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Page;
use App\Models\PageParents;
use App\Models\Language;
use Illuminate\Support\Facades\DB;
use App\User;

class PageController extends Controller
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
			  $menu_model = Page::where('lang',$get_current_lang)->orderBy('id','DESC')->paginate(10);
		 }

        $pages=Page::getAllPage();
        // return $posts;
        return view('backend.page.index')->with('pages',$menu_model)->with('get_current_lang',$get_current_lang);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
	 
	 
    public function summernoteUploadImage(Request $request)
	{
		$image = $request->file('file');
		$imageName = $image->getClientOriginalName();
		//$imageName = time() . '.' . $image->getClientOriginalExtension();
		$image->move(public_path('summernote-images'), $imageName);
		
		$get_image_url = asset('summernote-images/' . $imageName);

		return response()->json(['location' => $get_image_url]);
		
	}
    public function editorUploadImage(Request $request)
	{
		$image = $request->file('file');
		$imageName = $image->getClientOriginalName();
		//$imageName = time() . '.' . $image->getClientOriginalExtension();
		$image->move(public_path('editor-images'), $imageName);
		
		$get_image_url = asset('editor-images/' . $imageName);

		return response()->json(['link' => $get_image_url]);
		
	}
 
	 
	 
    
    public function create()
    {

        $users=User::get();
        $languages = Language::getListActive();
        return view('backend.page.create')->with('users',$users)->with('languages',$languages);
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
            'page_slug'=>'required'
        ]);

        $data=$request->all();
		//$custom_slug = $data['post']['en_SG']['title'];
		
		$slug_name = !empty($data['page_slug']) ? $data['page_slug'] : '';
		$status_data = !empty($data['status']) ? $data['status'] : 'active';
		
        // $slug = Str::slug($custom_slug);
        // $count=Page::where('slug',$slug)->count();
        // if($count>0){
            // $slug=$slug.'-'.date('ymdis').'-'.rand(0,999);
        // }
		 // $slug_title = !empty($slug) ? $slug : '';
        $dataPageParents = [
            'slug'    => $slug_name
        ];
        $page = PageParents::create($dataPageParents);
		
		 $author_id = !empty($data['added_by']) ? $data['added_by'] : '';
        //dd($page);
        if (is_array($data['post']) || is_object($data['post'])) {
 
        foreach ($data['post'] as $code => $value) {
            
			// $imageName = '';    
            // if (isset($value['image'])) {
             // $image = $value['image'];
             // $imageName = $value['image']->getClientOriginalName();
          
             // $image->move(public_path('custom_images/pages'), $imageName);
            
           // }
		   
            if (isset($value['title'])) {
                $dataDes[] = [
                    'page_parent_id' => $page->id,
					'slug' => $slug_name,
					//'post_type' => !empty($post_name) ? $post_name : '',
					'video_url' => !empty($video_url) ? $video_url : '',
					//'services_type' =>  !empty($services_type) ? $services_type : '',
                    'lang'  => $code,
					'added_by' => $author_id,
                    'title' => !empty($value['title']) ? $value['title'] : '',
                    'description' => !empty($value['description']) ? $value['description'] : '',
                    'summary' => !empty($value['excerpt']) ? $value['excerpt'] : '',
					'seo_meta_title' => !empty($value['seo_meta_title']) ? $value['seo_meta_title'] : '',
					'seo_meta_description' => !empty($value['seo_meta_description']) ? $value['seo_meta_description'] : '',
					'seo_meta_tag' => !empty($value['seo_meta_tag']) ? $value['seo_meta_tag'] : '',
					'photo' => !empty($value['image']) ? $value['image'] : '',
					//'photo' => !empty($imageName) ? asset('custom_images/pages/' . $imageName) : '',
					'status' => $status_data,
                ];
            } else {
                echo 'not insert';
            }
        }
    } 
        // Move the create method outside the loop
        foreach ($dataDes as $postData) {

            $status = Page::create($postData);
        }
        if($status){
            request()->session()->flash('success','Post Successfully added');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('page.index',['lang' => 'en_SG']);
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
        $post=Page::findOrFail($id);
        $users=User::get();
        $languages = Language::getListActive();
        return view('backend.page.edit')->with('users',$users)->with('post',$post)->with('languages',$languages);
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
        $page=Page::findOrFail($id);
		$redirect_url = $page->lang; 
         // return $request->all();
         // $this->validate($request,[
            // 'title'=>'string|required',
            // 'excerpt'=>'string|required',
            // 'description'=>'string|nullable',
            // 'status'=>'required|in:active,inactive'
        // ]);
       $exits_photo = $page->photo;    
          //dd($exits_photo);
        //$data=$request->all();
		  
		   // if ($request->hasFile('photo')) {
            // $image = $request->file('photo');
            // $imageName = $image->getClientOriginalName();
            // $image->move(public_path('custom_images/pages'), $imageName);
        // }
		
		 $data =  [
            'title' => !empty($request->title) ? $request->title : $page->title,
		    'excerpt' => !empty($request->excerpt) ? $request->excerpt : $page->excerpt,
			'video_url' => !empty($request->video_url) ? $request->video_url : $page->video_url,
			'lang'  => !empty($request->page_lang) ? $request->page_lang : $page->lang,
			'slug'  => !empty($request->page_slug) ? $request->page_slug : $page->slug,
            'description' => !empty($request->description) ? $request->description : $page->description,
            'seo_meta_title' => !empty($request->seo_meta_title) ? $request->seo_meta_title : $page->seo_meta_title,
            'seo_meta_description' => !empty($request->seo_meta_description) ? $request->seo_meta_description : $page->seo_meta_description,
            'seo_meta_tag' => !empty($request->seo_meta_tag) ? $request->seo_meta_tag : $page->seo_meta_tag,
			'added_by' => !empty($request->added_by) ? $request->added_by : $page->added_by,
			'photo' => !empty($request->photo) ? $request->photo : $exits_photo,
			//'photo' => !empty($imageName) ? asset('custom_images/pages/' . $imageName) : $exits_photo,
            'status' => !empty($request->status) ? $request->status : $post->status
        ];
		
       // dd($data);
        // return $data;

        $status=$page->fill($data)->save();
        if($status){
            request()->session()->flash('success','Page Successfully updated');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('page.index',['lang' => $redirect_url]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $page=Page::findOrFail($id);
		$redirect_url = $page->lang; 
       
        $status=$page->delete();
        
        if($status){
            request()->session()->flash('success','Page successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting page ');
        }
        return redirect()->route('page.index',['lang' => $redirect_url]);
    }
}
