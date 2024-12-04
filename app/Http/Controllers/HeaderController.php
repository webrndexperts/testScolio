<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Headers;
use App\Models\HeaderParents;
use App\Models\HeaderSubMenu;
use App\Models\HeaderMainTitle;
use App\Models\Language;
use Illuminate\Support\Facades\DB;
use App\User;

class HeaderController extends Controller
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

        $pages=Headers::getAllHeader();
        // return $posts;
        return view('backend.header_list.index')->with('pages',$pages);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function create()
    {

        $users=User::get();
        $header_sub_menu = HeaderSubMenu::get();
        $header_main_title = HeaderMainTitle::get();
        $languages = Language::getListActive();
        return view('backend.header_list.create')->with('users',$users)->with('header_sub_menu',$header_sub_menu)->with('header_main_title',$header_main_title)->with('languages',$languages);
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
		 $slug_name = $data['page_slug'];
        $dataPageParents = [
            'slug'    => $data['page_slug']
        ];
        $page = HeaderParents::create($dataPageParents);
        //dd($page);
        if (is_array($data['post']) || is_object($data['post'])) {
 
        foreach ($data['post'] as $code => $value) {
		
            $imageName = '';    
        
            if (isset($value['image'])) {
               // dd($value['image']);
             $image = $value['image'];
             $imageName = $value['image']->getClientOriginalName();
          
             $image->move(public_path('custom_images/header_menu'), $imageName);
            
           }
            if (isset($value['title'])) {
                $dataDes[] = [
                    'header_parent_id' => !empty($page->id) ? $page->id : '',
					'slug' => !empty($slug_name) ? $slug_name : '',
                    'lang'  => !empty($code) ? $code : '',
                    'title' =>  !empty($value['title']) ? $value['title'] : '',
                    'header_main_title' => $value['header_main_menutitle'],
                    'header_submenu_title' => $value['header_sub_menu_title'],
                    'photo' => !empty($imageName) ? asset('custom_images/header_menu/' . $imageName) : ''
                ];
            } else if(isset($value['header_main_menutitle'])){
				  $dataDes[] = [
				    'header_parent_id' => !empty($page->id) ? $page->id : '',
					'slug' => !empty($slug_name) ? $slug_name : '',
                    'lang'  => !empty($code) ? $code : '',
                    'header_main_title' => $value['header_main_menutitle']
				 ];
			}
        }
    } 
	
	         //  dd($dataDes);
        // Move the create method outside the loop
        foreach ($dataDes as $postData) {
           // dd($postData);
            $status = Headers::create($postData);
        }
        if($status){
            request()->session()->flash('success','Header Menu Successfully added');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('header-menu.index');
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
        $post=Headers::findOrFail($id);
		$header_sub_menu = HeaderSubMenu::get();
        $header_main_title = HeaderMainTitle::get();
        $users=User::get();
        $languages = Language::getListActive();
        return view('backend.header_list.edit')->with('users',$users)->with('header_sub_menu',$header_sub_menu)->with('header_main_title',$header_main_title)->with('post',$post)->with('languages',$languages);
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
        $page=Headers::findOrFail($id);
		$exits_photo = $page->photo; 
		$title = $page->title; 
		$slug = $page->slug; 
		$header_main_title = $page->header_main_title; 
		$header_submenu_title = $page->header_submenu_title; 
         // return $request->all();
         // $this->validate($request,[
            // 'title'=>'string|required',
            // 'excerpt'=>'string|required',
            // 'description'=>'string|nullable',
            // 'status'=>'required|in:active,inactive'
        // ]);

 
        //$data=$request->all();
		//dd($data);
		   if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = $image->getClientOriginalName();
            $image->move(public_path('custom_images/header_menu'), $imageName);
        }
		
		 $data =  [
            'title' =>  !empty($request->title) ? $request->title : $title,
		    'header_main_title' =>  !empty($request->header_menu_title) ? $request->header_menu_title : $header_main_title,
            'header_submenu_title' =>  !empty($request->header_sub_menu) ? $request->header_sub_menu : $header_submenu_title,
			'slug' => !empty($request->page_slug) ? $request->page_slug : $slug,
			'photo' => !empty($imageName) ? asset('custom_images/header_menu/' . $imageName) : $exits_photo,
            'status' => $request->status
        ];
		
       // dd($data);
        // return $data;

        $status=$page->fill($data)->save();
        if($status){
            request()->session()->flash('success','Header Menu Successfully updated');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('header-menu.index');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $page=Headers::findOrFail($id);
       
        $status=$page->delete();
        
        if($status){
            request()->session()->flash('success','Header Menu successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting page ');
        }
        return redirect()->route('header-menu.index');
    }
}
