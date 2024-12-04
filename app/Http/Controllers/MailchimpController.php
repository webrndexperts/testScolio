<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mailchimp;
class MailchimpController extends Controller
{
      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mailchimp_list=Mailchimp::all();
        return view('backend.mailchimp.index')->with('mailchimp_list',$mailchimp_list);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('backend.mailchimp.create');
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
            'mailchimp_api_key'=>'string|required'
        ]);
         $data = $request->all();
	     //	dd($data);
		
		 $data_arry =  [
            'mailchimp_api_key' => !empty($data['mailchimp_api_key']) ? $data['mailchimp_api_key'] : '',
            'status' => !empty($data['status']) ? $data['status'] : ''
        ];
		
		
		
		//dd($data_arry);
        // return $data;
        $status=Mailchimp::create($data_arry);
        if($status){
            request()->session()->flash('success','Mailchimp successfully created');
        }
        else{
            request()->session()->flash('error','Error, Please try again');
        }
        return redirect()->route('mailchimp.index');
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $mailchimp_edit = Mailchimp::find($id);
        if(!$mailchimp_edit){
            request()->session()->flash('error','Mailchimp not found');
        }
        return view('backend.mailchimp.edit')->with('mailchimp_edit',$mailchimp_edit);
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
        $shipping=Mailchimp::find($id);
        // $this->validate($request,[
            // 'type'=>'string|required',
            // 'price'=>'nullable|numeric',
            // 'status'=>'required|in:active,inactive'
        // ]);
		
      //  $data=$request->all();
		 // $data_arry =  [
            // 'mailchimp_api_key' => !empty($data['mailchimp_api_key']) ? $data['mailchimp_api_key'] : '',
            // 'status' => !empty($data['status']) ? $data['status'] : ''
        // ];
		
		
        $data =  [
            'mailchimp_api_key' => $request->mailchimp_api_key,
			'status' => $request->status
        ];
		
		//dd($data);
        // return $data;
        $status=$shipping->fill($data)->save();
        if($status){
            request()->session()->flash('success','Mailchimp successfully updated');
        }
        else{
            request()->session()->flash('error','Error, Please try again');
        }
        return redirect()->route('mailchimp.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $shipping=Mailchimp::find($id);
        if($shipping){
            $status=$shipping->delete();
            if($status){
                request()->session()->flash('success','Mailchimp successfully deleted');
            }
            else{
                request()->session()->flash('error','Error, Please try again');
            }
            return redirect()->route('mailchimp.index');
        }
        else{
            request()->session()->flash('error','Mailchimp not found');
            return redirect()->back();
        }
    }
	
}
