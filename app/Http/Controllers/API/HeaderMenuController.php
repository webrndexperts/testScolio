<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Headers as headerMenu;
use App\Models\HeaderMainTitle;
use App\Models\HeaderSubMenu;
use Illuminate\Http\Request;

class HeaderMenuController extends Controller
{
    public function index()
    {
        $xrays = HeaderMainTitle::with(['header_main_title_test.header_submenu_title_info'])->get();
        //$xrays = HeaderSubMenu::with(['header_submenu_title_test.header_submenu_title_info'])->get();
		//dd($xrays);
        return response()->json($xrays);
    }


    public function filterByLanguage($language)
    {
        $xrays = $users = HeaderMainTitle::with(['header_main_title_test.header_submenu_title_info'])->withWhereHas('header_main_title_test', function ($query) use ($language) {
			$query->where('lang', $language);
		})->get();
        return response()->json($xrays);
    }

    public function show($id)
    {
        $xray = headerMenu::findOrFail($id);
        return response()->json($xray);
    }

    public function store(Request $request)
    {
        // $validatedData = $request->validate([
            // 'name' => 'required',
            // 'description' => 'required',
            // 'lang' => 'required',
        // ]);
       $validatedData = $request->all();
        $xray = headerMenu::create($validatedData);

        return response()->json($xray, 201);
    }

    public function update(Request $request, $id)
    {
		$validatedData = $request->all();
        // $validatedData = $request->validate([
            // 'name' => 'required',
            // 'description' => 'required',
            // 'lang' => 'required',
        // ]);

        $xray = headerMenu::findOrFail($id);
        $xray->update($validatedData);

        return response()->json($xray, 200);
    }

    public function destroy($id)
    {
        $xray = headerMenu::findOrFail($id);
        $xray->delete();

        return response()->json(null, 204);
    }


}
