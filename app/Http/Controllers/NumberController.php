<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Models\PhoneNumber;
use Illuminate\Http\Request;

class NumberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (isset($_GET['lang'])) {
            $get_current_lang = !empty($_GET['lang']) ? $_GET['lang'] : '';
            $numbers = PhoneNumber::where('lang', $get_current_lang)->orderBy('id', 'DESC')->paginate(10);

        }
        return view('backend.numbers.index')->with('products', $numbers)->with('get_current_lang', $get_current_lang);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $languages = Language::where('status', 1)->with('contactData')->get();
        if (isset($_GET['lang'])) {
            $get_current_lang = !empty($_GET['lang']) ? $_GET['lang'] : '';
            $numbers = PhoneNumber::where('lang', $get_current_lang)->orderBy('id', 'DESC')->paginate(10);
        }
        return view('backend.numbers.create')->with('languages', $languages)->with('numbers', $numbers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $data = $request->all();
        $dataDes = [];
        
        if (is_array($data['post']) || is_object($data['post'])) {

            foreach ($data['post'] as $code => $value) {
            
                $dataDes[] = [
                    'whatsapp_number' => !empty($value['whatsapp_number']) ? $value['whatsapp_number'] : '',
                    'phone_number' => !empty($value['phone_number']) ? $value['phone_number'] : '',
                    'email' => !empty($value['email']) ? $value['email'] : '',
                    'gtag' => !empty($value['gtag']) ? $value['gtag'] : '',
                    'address' => !empty($value['address']) ? $value['address'] : '',
                    'address_href' => !empty($value['address_href']) ? $value['address_href'] : '',
                    'lang' => $code,
                ];
            }
            // dd($dataDes);
        }

        try {
            foreach ($dataDes as $numberData) {

                $status = PhoneNumber::updateOrCreate(["lang" => $numberData['lang']], $numberData);
            }
        } catch (\Throwable $th) {
            \Log::info($th->getMessage());
            return redirect()->back()->with("error", "Something Went Wrong");
        }
        return redirect()->route('numbers.create', ['lang' => 'en_SG'])->with('success', 'Number added Successfully');
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getNumber(Request $request) {
        $data['number'] = PhoneNumber::where('lang',$request->lang)->first();
        return response()->json($data);
    }
}
