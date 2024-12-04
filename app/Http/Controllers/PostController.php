<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Post;
use App\Models\PostParents;
use App\Models\Language;
use App\Models\PostCategory;
use App\Models\PostTag;
use Illuminate\Support\Facades\DB;
use App\User;

class PostController extends Controller
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
      $menu_model = Post::with(['cat_info','author_info'])->where('lang',$get_current_lang)->orderBy('id','DESC')->paginate(10);
	  }

        return view('backend.post.index')->with('posts',$menu_model)->with('get_current_lang',$get_current_lang);
       // $posts=Post::getAllPost();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function create()
    {

        $categories=PostCategory::get();
        $tags=PostTag::get();
        $users=User::get();
        $languages = Language::getListActive();
        return view('backend.post.create')->with('users',$users)->with('categories',$categories)->with('tags',$tags)->with('languages',$languages);
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
            'post_slug'=>'required'
        ]);

        $data = $request->all();
		
		$slug_name = !empty($data['post_slug']) ? $data['post_slug'] : '';
		$status_data = !empty($data['status']) ? $data['status'] : 'active';
        // $slug = Str::slug($custom_slug);
        // $count=Post::where('slug',$slug)->count();
        // if($count>0){
            // $slug=$slug.'-'.date('ymdis').'-'.rand(0,999);
		 //$slug_title = !empty($slug) ? $slug : '';
        // }
		
         $author_id = $data['added_by'];
        $dataPostParents = [
            'slug'    => $slug_name
        ];
        $page = PostParents::create($dataPostParents);
        //dd($data);
        if (is_array($data['post']) || is_object($data['post'])) {
 
        foreach ($data['post'] as $code => $value) {
            $imageName = '';    
        
            if (isset($value['image'])) {
               // dd($value['image']);
             $image = $value['image'];
             $imageName = $value['image']->getClientOriginalName();
          
             $image->move(public_path('custom_images/posts'), $imageName);
            
           }
            if (isset($value['title'])) {
                $dataDes[] = [
                    'post_parent_id' => $page->id,
					'slug' => $slug_name,
                    'lang'  => $code,
                    'title' => $value['title'],
					'added_by' => $author_id,
                    //'post_cat_id' => !empty($value['post_cat_id']) ? $value['post_cat_id'] : '',
                    'description' => $value['description'],
                    'summary' => $value['excerpt'], 
                    'seo_meta_title' =>  !empty($value['seo_meta_title']) ? $value['seo_meta_title'] : '',
                    'seo_meta_description' =>  !empty($value['seo_meta_description']) ? $value['seo_meta_description'] : '',
                    'seo_meta_tag' =>  !empty($value['seo_meta_tag']) ? $value['seo_meta_tag'] : '',
					'photo' => !empty($imageName) ? asset('custom_images/posts/' . $imageName) : '',
					'status' => $status_data,
                ];
            } else {
                echo 'not insert';
            }
        }
    } 
	
	     //dd($dataDes);
        // Move the create method outside the loop
        foreach ($dataDes as $postData) {

            $status = Post::create($postData);
        }
        if($status){
            request()->session()->flash('success','Post Successfully added');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('post.index',['lang' => 'en_SG']);
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
        $post=Post::findOrFail($id);
        $categories=PostCategory::get();
        $tags=PostTag::get();
        $users=User::get();
        $languages = Language::getListActive();
        return view('backend.post.edit')->with('categories',$categories)->with('users',$users)->with('tags',$tags)->with('post',$post)->with('languages',$languages);
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
        $post=Post::findOrFail($id);
		$lang_by_product = $post->lang;  
		//dd($post);
		$exits_photo = $post->photo;    

        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = $image->getClientOriginalName();
            $image->move(public_path('custom_images/posts'), $imageName);
        }
           //dd($request);

        $data =  [
            'title' => !empty($request->title) ? $request->title : $post->title,
		    'summary' => !empty($request->excerpt) ? $request->excerpt : $post->summary,
			'slug' => !empty($request->page_slug) ? $request->page_slug : $post->slug,
			//'post_cat_id' =>  !empty($request->post_cat_id) ? $request->post_cat_id : $post->post_cat_id,
            'description' => !empty($request->description) ? $request->description : $post->description,
            'seo_meta_title' => !empty($request->seo_meta_title) ? $request->seo_meta_title : $post->seo_meta_title,
            'seo_meta_description' => !empty($request->seo_meta_description) ? $request->seo_meta_description : $post->seo_meta_description,
            'seo_meta_tag' => !empty($request->seo_meta_tag) ? $request->seo_meta_tag : $post->seo_meta_tag,
			'added_by' =>  !empty($request->added_by) ? $request->added_by : $post->added_by,
			'photo' => !empty($imageName) ? asset('custom_images/posts/' . $imageName) : $exits_photo,
			//'photo' => !empty($request->photo) ? $request->photo : $exits_photo,
            'status' => !empty($request->status) ? $request->status : $post->status,
        ];
       // $data=$request->all();
       // dd($data);
        // return $data;

        $status=$post->fill($data)->save();
        if($status){
            request()->session()->flash('success','Post Successfully updated');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('post.index',['lang' => $lang_by_product]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post=Post::findOrFail($id);
       
        $status=$post->delete();
        
        if($status){
            request()->session()->flash('success','Post successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting post ');
        }
        return redirect()->route('post.index',['lang' => 'en_SG']);
    }
}
