<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MenuItem;
class MenuItemController extends Controller
{


public function index()
{
   // $menuItems = MenuItem::orderBy('order')->get();
    return view('backend.menu.index');
}


    // public function updateOrder(Request $request)
    // {
        // $order = 1;
        // foreach ($request->order as $id) {
            // MenuItem::where('id', $id)->update(['order' => $order]);
            // $order++;
        // }

        // return response()->json(['success' => true]);
    // }


}
