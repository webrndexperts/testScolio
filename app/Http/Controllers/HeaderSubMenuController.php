<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HeaderSubMenu;
use App\Models\HeaderParents;
use App\Models\Language;
use Illuminate\Support\Str;

class HeaderSubMenuController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $xrayresultsCategories=HeaderSubMenu::orderBy('id','DESC')->paginate(10);
		//dd($xrayresultsCategories);
        return view('backend.header-submenu-title.index')->with('xrayresultsCategories',$xrayresultsCategories);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
		$languages = Language::getListActive();
        return view('backend.header-submenu-title.create')->with('languages',$languages);
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
		  $slug_title = $data['post']['en_SG']['title'];
		//dd();
        $slug=Str::slug($slug_title);
		//echo 'test';dd($slug);
		
        $count=HeaderSubMenu::where('slug',$slug)->count();
        if($count>0){
            $slug=$slug.'-'.date('ymdis').'-'.rand(0,999);
        }
		
	    $header_type = $request->header_type;
        $dataPostParents = [
            'slug'    => $slug,
            'title_type'    => $header_type
        ];
        $page = HeaderParents::create($dataPostParents);
        //dd($page);
        if (is_array($data['post']) || is_object($data['post'])) {
 
        foreach ($data['post'] as $code => $value) {

            if (isset($value['title'])) {
                $dataDes[] = [
                    'header_main_parents_id' => $page->id,
					'slug' => $slug,
                    'lang'  => $code,
                    'title' => $value['title']
                ];
            } else {
                echo 'not insert';
            }
        }
    } 
	
	     //dd($dataDes);
        // Move the create method outside the loop
        foreach ($dataDes as $postData) {

            $status = HeaderSubMenu::create($postData);
        }	

        if($status){
            request()->session()->flash('success','Header Main Title Successfully added');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('header-submenu-title.index');
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
        $xrayCategory=HeaderSubMenu::findOrFail($id);
        return view('backend.header-submenu-title.edit')->with('xrayCategory',$xrayCategory);
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
        $postCategory=HeaderSubMenu::findOrFail($id);
         // return $request->all();
         $this->validate($request,[
            'title'=>'string|required',
            'status'=>'required|in:active,inactive'
        ]);
        $data=$request->all();
        $status=$postCategory->fill($data)->save();
        if($status){
            request()->session()->flash('success','Header Main Title Successfully updated');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('header-submenu-title.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $postCategory=HeaderSubMenu::findOrFail($id);
       
        $status=$postCategory->delete();
        
        if($status){
            request()->session()->flash('success','Header Main Title successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting Header Main Title category');
        }
        return redirect()->route('header-submenu-title.index');
   }
   

   
}