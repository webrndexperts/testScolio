<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductAttributes;
use Illuminate\Support\Str;

class ProductAttributesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $category=ProductAttributes::getAllCategory();
        // return $category;
        return view('backend.product-attributes.index')->with('categories',$category);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $parent_cats=ProductAttributes::where('is_parent',1)->orderBy('title','ASC')->get();
        return view('backend.product-attributes.create')->with('parent_cats',$parent_cats);
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
        // $this->validate($request,[
            // 'title'=>'string|required',
            // 'sku'=>'string|nullable',
            // 'summary'=>'string|nullable',
            // 'status'=>'required|in:active,inactive',
            // 'is_parent'=>'sometimes|in:1',
            // 'parent_id'=>'nullable|exists:categories,id',
        // ]);
        $data= $request->all();
        $slug=Str::slug($request->title);
        $count=ProductAttributes::where('slug',$slug)->count();
        if($count>0){
            $slug=$slug.'-'.date('ymdis').'-'.rand(0,999);
        }
        $data['slug']=$slug;
        $data['is_parent']=$request->input('is_parent',0);
        // return $data;   
        $status=ProductAttributes::create($data);
        if($status){
            request()->session()->flash('success','Category successfully added');
        }
        else{
            request()->session()->flash('error','Error occurred, Please try again!');
        }
        return redirect()->route('product-attributes.index');


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
        $parent_cats=ProductAttributes::where('is_parent',1)->get();
        $category=ProductAttributes::findOrFail($id);
        return view('backend.product-attributes.edit')->with('category',$category)->with('parent_cats',$parent_cats);
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
        // return $request->all();
        $category=ProductAttributes::findOrFail($id);
        $this->validate($request,[
            'title'=>'string|required',
			'sku'=>'string|nullable',
            'summary'=>'string|nullable',
            'status'=>'required|in:active,inactive',
            'is_parent'=>'sometimes|in:1',
            'parent_id'=>'nullable|exists:categories,id',
        ]);
        $data= $request->all();
        $data['is_parent']=$request->input('is_parent',0);
        // return $data;
        $status=$category->fill($data)->save();
        if($status){
            request()->session()->flash('success','Category successfully updated');
        }
        else{
            request()->session()->flash('error','Error occurred, Please try again!');
        }
        return redirect()->route('product-attributes.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category=ProductAttributes::findOrFail($id);
        $child_cat_id=ProductAttributes::where('parent_id',$id)->pluck('id');
        // return $child_cat_id;
        $status=$category->delete();
        
        if($status){
            if(count($child_cat_id)>0){
                ProductAttributes::shiftChild($child_cat_id);
            }
            request()->session()->flash('success','Category successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting category');
        }
        return redirect()->route('product-attributes.index');
    }

    public function getChildByParent(Request $request){
        // return $request->all();
        $category=ProductAttributes::findOrFail($request->id);
        $child_cat=ProductAttributes::getChildByParentID($request->id);
        // return $child_cat;
        if(count($child_cat)<=0){
            return response()->json(['status'=>false,'msg'=>'','data'=>null]);
        }
        else{
            return response()->json(['status'=>true,'msg'=>'','data'=>$child_cat]);
        }
    }
}
