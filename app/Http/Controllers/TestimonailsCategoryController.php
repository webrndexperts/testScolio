<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TestimonailsCategory;
use Illuminate\Support\Str;

class TestimonailsCategoryController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $testimonailscategories=TestimonailsCategory::orderBy('id','DESC')->paginate(10);
        //dd($testimonailscategories);
        return view('backend.testimonialscategory.index')->with('testimonailscategories',$testimonailscategories);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('backend.testimonialscategory.create');
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
        $count=TestimonailsCategory::where('slug',$slug)->count();
        if($count>0){
            $slug=$slug.'-'.date('ymdis').'-'.rand(0,999);
        }
        $data['slug']=$slug;
        $status=TestimonailsCategory::create($data);
        if($status){
            request()->session()->flash('success','Testimonails Category Successfully added');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('testimonials-category.index');
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
        $xrayCategory=TestimonailsCategory::findOrFail($id);
        return view('backend.testimonialscategory.edit')->with('xrayCategory',$xrayCategory);
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
        $postCategory=TestimonailsCategory::findOrFail($id);
         // return $request->all();
         $this->validate($request,[
            'title'=>'string|required',
            'status'=>'required|in:active,inactive'
        ]);
        $data=$request->all();
        $status=$postCategory->fill($data)->save();
        if($status){
            request()->session()->flash('success','Testimonails Successfully updated');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('testimonials-category.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $postCategory=TestimonailsCategory::findOrFail($id);
       
        $status=$postCategory->delete();
        
        if($status){
            request()->session()->flash('success','Testimonails successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting Testimonails category');
        }
        return redirect()->route('testimonials-category.index');
    }
}
