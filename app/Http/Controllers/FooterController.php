<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Footer;
use App\Models\FooterParents;
use App\Models\Language;
use Illuminate\Support\Facades\DB;
class FooterController extends Controller
{
      public function index()
    {

        $pages=Footer::getAllFooter();
        // return $posts;
        return view('backend.footermenu_list.index')->with('pages',$pages);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function create()
    {
        $languages = Language::getListActive();
        return view('backend.footermenu_list.create')->with('languages',$languages);
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
		 $slug_name = $data['page_slug'];
        // dd($data);
        $dataPageParents = [
            'slug'    => $data['page_slug']
        ];
        $page = FooterParents::create($dataPageParents);
        //dd($page);
        if (is_array($data['post']) || is_object($data['post'])) {
 
        foreach ($data['post'] as $code => $value) {
	
            if (isset($value['title'])) {
                $dataDes[] = [
                    'footer_parent_id' => $page->id,
					'slug' => $slug_name,
                    'lang'  => $code,
                    'title' => $value['title']
                ];
            } else {
                echo 'not insert';
            }
        }
    } 
        // Move the create method outside the loop
        foreach ($dataDes as $postData) {

            $status = Footer::create($postData);
        }
        if($status){
            request()->session()->flash('success','Footer Menu Successfully added');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('footer-menu.index');
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
        $post=Footer::findOrFail($id);
        $languages = Language::getListActive();
        return view('backend.footermenu_list.edit')->with('post',$post)->with('languages',$languages);
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
        $page=Footer::findOrFail($id);
         // return $request->all();
         // $this->validate($request,[
            // 'title'=>'string|required',
            // 'excerpt'=>'string|required',
            // 'description'=>'string|nullable',
            // 'status'=>'required|in:active,inactive'
        // ]);
	
		 $data =  [
            'title' => $request->title,
            'slug' => $request->slug,
            'status' => $request->status
        ];
		
       // dd($data);
        // return $data;

        $status=$page->fill($data)->save();
        if($status){
            request()->session()->flash('success','Footer Menu Successfully updated');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('footer-menu.index');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $page=Footer::findOrFail($id);
       
        $status=$page->delete();
        
        if($status){
            request()->session()->flash('success','Footer Menu successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting page ');
        }
        return redirect()->route('footer-menu.index');
    }
}
