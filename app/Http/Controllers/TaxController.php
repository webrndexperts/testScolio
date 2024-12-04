<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tax;
class TaxController extends Controller
{
       /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $coupon=Tax::orderBy('id','ASC')->paginate('10');
        return view('backend.tax.index')->with('coupons',$coupon);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('backend.tax.create');
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
            'country_code'=>'string|required',
            'tax_rate'=>'string|required',
            'tax_name'=>'string|required',
            'status'=>'required|in:active,inactive'
        ]);
        $data=$request->all();
        $status=Tax::create($data);
        if($status){
            request()->session()->flash('success','Tax Successfully added');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('tax.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $coupon=Tax::find($id);
        if($coupon){
            return view('backend.tax.edit')->with('coupon',$coupon);
        }
        else{
            return view('backend.tax.index')->with('error','Tax not found');
        }
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
        $coupon=Tax::find($id);
        $this->validate($request,[
            'country_code'=>'string|required',
            'tax_rate'=>'string|required',
            'tax_name'=>'string|required',
            'status'=>'required|in:active,inactive'
        ]);
        $data=$request->all();
        
        $status=$coupon->fill($data)->save();
        if($status){
            request()->session()->flash('success','Tax Successfully updated');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('tax.index');
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $coupon=Tax::find($id);
        if($coupon){
            $status=$coupon->delete();
            if($status){
                request()->session()->flash('success','Tax successfully deleted');
            }
            else{
                request()->session()->flash('error','Error, Please try again');
            }
            return redirect()->route('tax.index');
        }
        else{
            request()->session()->flash('error','Tax not found');
            return redirect()->back();
        }
    }
	
	public function taxDeatils()
    {
        $pages = Tax::getAllTaxApi();
        return response()->json($pages);
    }
}
