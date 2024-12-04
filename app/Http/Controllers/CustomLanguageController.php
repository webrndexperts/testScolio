<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Language;
class CustomLanguageController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $languages=Language::orderBy('id','DESC')->paginate();
        return view('backend.language.index')->with('languages',$languages);
    }

    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
   
     public function create()
    {
        return view('backend.language.create');
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
            'name'=>'string|required',
            'code'=>'string|required',
         //   'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'status'=>'string|required',
        ]);
        if ($request->hasFile('image')) {
	
            $image = $request->file('image');
            //dd($image);
           // $imageName = time() . '.' . $image->extension();
		     $imageName = $image->getClientOriginalName();
            
            $image->move(public_path('custom_images/languages'), $imageName);
        }
        $status_code = ($request->status === 'active') ? 1 : 0;
        $status =  Language::create([
            'name' => $request->name,
		    'code' => $request->code,
		    'status' => $status_code,
			'icon' => !empty($imageName) ? asset('custom_images/languages/' . $imageName) : ''
			
        ]);
        //$data=$request->all();
        // return $data;
         //dd($data);
       // $status = Language::create($data);
        if($status){
            request()->session()->flash('success','Language successfully created');
        }
        else{
            request()->session()->flash('error','Error, Please try again');
        }
        return redirect()->route('language.index');
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
        $language=Language::find($id);
        if(!$language){
            request()->session()->flash('error','Brand not found');
        }
        return view('backend.language.edit')->with('language',$language);
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
        $brand=Language::find($id);
   
        $this->validate($request,[
            'name'=>'string|required',
            'code'=>'string|required',
            //'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'status'=>'string|required',
        ]);
       // $data=$request->all();
       if ($request->hasFile('image')) {
	
        $image = $request->file('image');
        $imageName_test = $image->getClientOriginalName();
        
        $image->move(public_path('custom_images/languages'), $imageName_test);
    }
    $status_code = ($request->status === 'active') ? 1 : 0;
    $data =  [
        'name' => $request->name,
        'code' => $request->code,
        'status' => $status_code,
		'icon' => asset('custom_images/languages/' . $imageName_test)
    ];

        $status=$brand->fill($data)->save();
        if($status){
            request()->session()->flash('success','Language successfully updated');
        }
        else{
            request()->session()->flash('error','Error, Please try again');
        }
        return redirect()->route('language.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $brand=Language::find($id);
        if($brand){
            $status=$brand->delete();
            if($status){
                request()->session()->flash('success','Language successfully deleted');
            }
            else{
                request()->session()->flash('error','Error, Please try again');
            }
            return redirect()->route('language.index');
        }
        else{
            request()->session()->flash('error','Language not found');
            return redirect()->back();
        }
    }

}
