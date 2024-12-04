<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactForm;
class ContactFormController extends Controller
{
     public function index()
    {

	if(isset($_GET['lang'])){
			  $get_current_lang = !empty($_GET['lang']) ? $_GET['lang'] : ''; 
			  $pages = ContactForm::where('lang',$get_current_lang)->orderBy('id','DESC')->get();
	}

        //$pages=ContactForm::getAllContactForm();
        // return $posts;
        return view('backend.contactform.index')->with('pages',$pages)->with('get_current_lang',$get_current_lang);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function show($id)
    {
		$post=ContactForm::findOrFail($id);
        return view('backend.contactform.edit')->with('post',$post);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $page=ContactForm::findOrFail($id);
       
        $status=$page->delete();
        
        if($status){
            request()->session()->flash('success','Contact-form List successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting page ');
        }
        return redirect()->back();
    }
}
