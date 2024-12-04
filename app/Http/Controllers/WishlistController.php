<?php

namespace App\Http\Controllers;
use Auth;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Wishlist;
class WishlistController extends Controller
{
	
	public function index()
    { 
		return view('backend.wishlist.index');
    }

	public function wishlistgenerateTable(Request $request) {
        $columns = array(
            0 => 'id',
            1 => 'name',
            2 => 'email',
            3 => 'title',
            4 => 'price',
			5 => 'lang',
            6 => 'created_at'
        );

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        $forms = Wishlist::with(['user', 'product']);

      if (!empty($request->input('search.value'))) {
        $search = $request->input('search.value');

        $forms->where(function($query) use ($search) {
            $query->where('id', 'LIKE', "%{$search}%")
                ->orWhereHas('user', function($query) use ($search) {
                    $query->where('name', 'LIKE', "%{$search}%")
                          ->orWhere('email', 'LIKE', "%{$search}%");
                })
                ->orWhere('created_at', 'LIKE', "%{$search}%")
				->orWhereHas('product', function($query) use ($search) {
                $query->where('title', 'LIKE', "%{$search}%")
                      ->orWhere('price', 'LIKE', "%{$search}%");
            });
        });
    }

        $counts = $forms->count();
        $forms = $forms->orderBy($order, $dir);
        if($limit >= 0) {
            $forms = $forms->offset($start)->limit($limit);
        }
        $forms = $forms->get();
         //dd($forms);

        $values = $this->generateTableValues($forms);
        $json_data = array(
            "input" => $request->all(),
            "draw" => intval($request->input('draw')),
            "recordsTotal" => intval($counts),
            "recordsFiltered" => intval($counts),
            "data" => $values
        );

        return json_encode($json_data);
    }



	protected function generateTableValues($listing) {
        $data = array();

        foreach ($listing as $key => $row) {
            $_r = new \stdClass();
            // $_r->style = ($row->trashed()) ? "background-color: #f5c1c1;" : "";
			
			$_status = '<span class="badge badge-warning">NO</span>';
			if($row->mailsent_status=='yes') {
                $_status = '<span class="badge badge-success">YES</span>';
			}
			

            $data[$key]['DT_RowAttr'] = $_r;
            $data[$key]['id'] = $row->id ?? '';
            $data[$key]['name'] = $row->user->name ?? '';
            $data[$key]['email'] =$row->user->email ?? '';
            $data[$key]['product_title'] =$row->product->title ?? ''; 
            $data[$key]['product_price'] = '$' .number_format($row->product->price,2) . ' SGD';
			$data[$key]['lang'] =$row->lang ?? '';
            $data[$key]['created_at'] = $row->created_at->format('Y-m-d H:i:s');
			$data[$key]['actions'] = view('backend.wishlist.actions', [ "row_wishlist" => $row ])->render();
        }

        return $data;
    }

	
   public function save(Request $request)
    {
        $data = array('status' => 'erorr', 'message' => 'Something went wrong.', 'type' => '');
        $check = Wishlist::where('user_id', $request->user_id)
			->where('product_id', $request->product_id)
			->first();

			if ($check && $check->id) {
				$check->delete();
                $data['status'] = 'success';
                $data['type'] = 'delete';
                $data['message'] = 'Product item successfully removed to wishlist.';
			} else {
				$wishlist = new Wishlist;
				$wishlist->user_id = $request->user_id;
				$wishlist->product_id = $request->product_id;
				$wishlist->lang = $request->language;
				$wishlist->wishlist_status = 0;

				if($wishlist->save()) {
                    $data['status'] = 'success';
                    $data['type'] = 'add';
                    $data['message'] = 'Product successfully added to wishlist.';
                }
			}

            if(array_key_exists('list', $request->all())) {
                $data['listing'] = Wishlist::where('user_id', $request->user_id)->with('product')->get();
            }

            return response()->json($data);
    }
	
			
	public function getAllWishlistByUser($userId, $lang) {
		$data = array('data' => null, 'status' => true, 'count' => 0);
		
		$wishlist = Wishlist::with(['product'])->where('user_id', $userId)->where('lang', $lang)
			->latest()->get();

        $data['data'] = $wishlist;
        $data['count'] = $wishlist->count();

		if ($wishlist->isEmpty()) {
			$data['status'] = false;
		}

		return $data;
	}

	
	public function show($id)
    {
        $show_wishist_data = Wishlist::with('user')->find($id);
        // return $order;
        return view('backend.wishlist.view')->with('show_wishist_data',$show_wishist_data);
    }

	    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $page=Wishlist::findOrFail($id);
       
        $status=$page->delete();
        
        if($status){
            request()->session()->flash('success','Wishlist User successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting user ');
        }
        return redirect()->route('wishlist.index');
    }
	
    public function removeMultiple(Request $request) {
        $ids = json_decode($request->ids);
        Wishlist::whereIn('id', $ids)->delete();

        return response()->json(['status' => 'success', 'message' => 'All items removed from wishlist']);
    }
}
