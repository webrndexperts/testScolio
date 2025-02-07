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

class PostTestController extends Controller
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
      //   $menu_model = Post::with(['cat_info','author_info'])->where('lang',$get_current_lang)->orderBy('post_parent_id','DESC')->where('status','active')->paginate(10);
    }

    // $menu_model = Post::with(['cat_info', 'author_info'])
    // ->where(function ($q) use ($get_current_lang) {
    //     $q->where('lang', 'en_SG')
    //         ->orWhereNotNull('title');
    // })
    // ->where('status', 'active')
    // ->groupBy('post_parent_id')
    // ->orderBy('post_parent_id', 'DESC')
    // ->distinct()
    // ->paginate(100);

    $menu_model = Post::with(['cat_info', 'author_info'])
    ->selectRaw('posts.*')
    ->where('status', 'active')
    ->whereNotNull('title') // Ensure title is not null
    ->where(function ($q)  {
        $q->where('lang', 'en_SG')
            ->orWhere('lang', '!=', 'en_SG')
            ->orWhereNotNull('title');
    })
    // ->orderByRaw("CASE 
    //     WHEN lang = 'en_SG' THEN 1 
    //     ELSE 2 
    // END") // Prioritize lang = en_SG
    // ->groupBy('id','title','slug','summary','description','quote','photo','tags','post_cat_id','post_tag_id','added_by','status','created_at','updated_at','lang','seo_meta_title','seo_meta_description','seo_meta_tag') // Ensure distinct records by post_parent_id
    ->groupBy('post_parent_id') // Ensure distinct records by post_parent_id
    ->orderBy('post_parent_id','DESC')
    ->paginate(10);



    // $menu_model = Post::with(['cat_info', 'author_info'])
    // ->selectRaw('posts.id, posts.title, posts.slug, posts.summary, posts.description, posts.quote, posts.photo, posts.tags, posts.post_cat_id, posts.post_tag_id, posts.added_by, posts.status, posts.created_at, posts.updated_at, posts.lang, posts.seo_meta_title, posts.seo_meta_description, posts.seo_meta_tag, posts.post_parent_id')
    // ->where('status', 'active')
    // ->whereNotNull('title')
    // ->where(function ($q) use ($get_current_lang) {
    //     $q->where('lang', 'en_SG')
    //         ->orWhere('lang', '!=', 'en_SG');
    // })
    // ->orderByRaw("CASE 
    //     WHEN lang = 'en_SG' THEN 1 
    //     ELSE 2 
    // END") // Prioritize lang = en_SG
    // ->groupBy('post_parent_id', ) // Group by all selected columns
    // ->orderBy('post_parent_id', 'DESC')
    // ->paginate(10);

    
// dd($menu_model);
        return view('backend.post.latest.index')->with('posts',$menu_model)->with('get_current_lang',$get_current_lang);
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
        return view('backend.post.latest.create')->with('users',$users)->with('categories',$categories)->with('tags',$tags)->with('languages',$languages);
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        
        // dd($request->all(),$enLanguages);    
        $this->validate($request,[
            'post_slug'=>'required',
        ], [ 'post_slug.required' => 'Parent slug is required !' ]);      
        // dd($request->post);
        
        $hasFilledPost = collect($request->post)->contains(function ($item) {
            return (!empty($item['title']) || !empty($item['description']) || !empty($item['excerpt'])) && !empty($item['slug']);
        });
       
        if (!$hasFilledPost) {
            return back()->withErrors(['post' => 'At least fill all fields of one langugage.'])->withInput();
        }
        
        
        
        $data = $request->all();
        $enLanguages = Language::where('code', 'like', 'en_%')->pluck('code')->toArray();
         // dd($enLanguages,$data);
		$slug_name = !empty($data['post_slug']) ? $data['post_slug'] : '';
		$status_data = !empty($data['status']) ? $data['status'] : 'active';
 		
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


           if ($code == 'en_all') {
            foreach ($enLanguages as $enLang) {
                $dataDes[] = [
                    'post_parent_id' => $page->id,
                    'slug' => $value['slug'],
                    'lang'  => $enLang,
                    'title' => $value['title'],
                    'added_by' => $author_id,
                    'description' => $value['description'],
                    'summary' => $value['excerpt'],
                    'seo_meta_title' => $value['title'],
                    'seo_meta_description' => strip_tags($value['excerpt']),
                    'seo_meta_tag' => $value['seo_meta_tag'],
                    'photo' => !empty($imageName) ? asset('custom_images/posts/' . $imageName) : '',
                    'status' => isset($value['title']) ? $status_data : 'inactive',
                ];
            }
        } else {
            // For other languages, store their respective data
            $dataDes[] = [
                'post_parent_id' => $page->id,
                'slug' => $value['slug'],
                'lang'  => $code,
                'title' => $value['title'],
                'added_by' => $author_id,
                'description' => $value['description'],
                'summary' => $value['excerpt'],
                'seo_meta_title' => $value['title'],
                'seo_meta_description' => strip_tags($value['excerpt']),
                'seo_meta_tag' => !empty($value['seo_meta_tag']) ? $value['seo_meta_tag'] : '',
                'photo' => !empty($imageName) ? asset('custom_images/posts/' . $imageName) : '',
                'status' => isset($value['title']) ? $status_data : 'inactive',
            ];
        }
            // if (isset($value['title'])) {
                // $dataDes[] = [
                //     'post_parent_id' => $page->id,
				// 	'slug' => $value['slug'],
                //     'lang'  => $code,
                //     'title' => $value['title'],
				// 	'added_by' => $author_id,
                //     //'post_cat_id' => !empty($value['post_cat_id']) ? $value['post_cat_id'] : '',
                //     'description' => $value['description'],
                //     'summary' => $value['excerpt'], 
                //     'seo_meta_title' =>  $value['title'],
                //     'seo_meta_description' =>  strip_tags($value['excerpt']),
                //     // 'seo_meta_title' =>  !empty($value['seo_meta_title']) ? $value['seo_meta_title'] : '',
                //     // 'seo_meta_description' =>  !empty($value['seo_meta_description']) ? $value['seo_meta_description'] : '',
                //     'seo_meta_tag' =>  !empty($value['seo_meta_tag']) ? $value['seo_meta_tag'] : '',
				// 	'photo' => !empty($imageName) ? asset('custom_images/posts/' . $imageName) : '',
				// 	'status' => isset($value['title']) ? $status_data : 'inactive',
                // ];
            // } else {
            //     echo 'not insert';
            // }
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
        return redirect()->route('latestpost.index',['lang' => 'en_SG']);
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
        $posts = Post::where('post_parent_id', $id)->get();
        // dd($posts); 
        $categories=PostCategory::get();
        $tags=PostTag::get();
        $users=User::get();
        $languages = Language::getListActive();

        return view('backend.post.latest.edit')->with('categories',$categories)->with('users',$users)->with('tags',$tags)->with('posts',$posts)->with('languages',$languages);
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
        // dd($request->all(),$id);
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
            request()->session()->flash('success',"Post Successfully updated for {$lang_by_product}");
            return redirect()->back();
        }
        else{
            request()->session()->flash('error','Please try again!!');
            return redirect()->back();

        }
        // return redirect()->route('latestpost.index',['lang' => $lang_by_product]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // $post=Post::findOrFail($id);
        // dd($id);
        $post_parent = PostParents::where('id', $id)->first();
        $posts = Post::where('post_parent_id', $post_parent->id)->get();
        //    dd($post_parent,$posts);
        foreach ($posts as $post) {
            $post->delete();
        }
        // $status=$post->delete();
        $status=$post_parent->delete();
        
        if($status){
            request()->session()->flash('success','Post successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting post ');
        }
        return redirect()->route('latestpost.index',['lang' => 'en_SG']);
    }
}
