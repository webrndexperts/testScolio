<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\XrayResultsCategory;
use Illuminate\Support\Str;
class XRayCategoryController extends Controller
{
      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $xrayresultsCategories=XrayResultsCategory::orderBy('id','DESC')->paginate(10);
        return view('backend.xraycategory.index')->with('xrayresultsCategories',$xrayresultsCategories);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('backend.xraycategory.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // return $request->all();
        $this->validate($request,[
            'title'=>'string|required',
            'status'=>'required|in:active,inactive'
        ]);
        $data=$request->all();
        $slug=Str::slug($request->title);
        $count=XrayResultsCategory::where('slug',$slug)->count();
        if($count>0){
            $slug=$slug.'-'.date('ymdis').'-'.rand(0,999);
        }
        $data['slug']=$slug;
        $status=XrayResultsCategory::create($data);
        if($status){
            request()->session()->flash('success','XRay Category Successfully added');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('xrayresults-category.index');
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
        $xrayCategory=XrayResultsCategory::findOrFail($id);
        return view('backend.xraycategory.edit')->with('xrayCategory',$xrayCategory);
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
        $postCategory=XrayResultsCategory::findOrFail($id);
         // return $request->all();
         $this->validate($request,[
            'title'=>'string|required',
            'status'=>'required|in:active,inactive'
        ]);
        $data=$request->all();
        $status=$postCategory->fill($data)->save();
        if($status){
            request()->session()->flash('success','XRay Category Successfully updated');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('xrayresults-category.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $postCategory=XrayResultsCategory::findOrFail($id);
       
        $status=$postCategory->delete();
        
        if($status){
            request()->session()->flash('success','XRay Category successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting XRay category');
        }
        return redirect()->route('xrayresults-category.index');
    }
}
