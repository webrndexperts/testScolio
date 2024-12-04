<?php

namespace App\Http\Controllers;
use App\Models\Coupon;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\Cart;
class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       // $coupon=Coupon::orderBy('id','DESC')->paginate('10');
       // return view('backend.coupon.index')->with('coupons',$coupon);
        return view('backend.coupon.index');
    }
	
	
	public function coupongenerateTable(Request $request) {
        $columns = array(
            0 => 'id',
            1 => 'code',
            2 => 'fixed',
            3 => 'value',
            4 => 'expiry_date',
            5 => 'status',
        );

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        $forms = Coupon::Query();

        if(!empty($request->input('search.value'))) {
            $search = $request->input('search.value');

            $forms = $forms->where(function($q) use($search) {
                $q->where('id', 'LIKE', "%{$search}%")
                    ->orWhere('code', 'LIKE', "%{$search}%")
                    ->orWhere('value', 'LIKE', "%{$search}%")
                    ->orWhere('expiry_date', 'LIKE', "%{$search}%");
            });
        }

        $counts = $forms->count();
        $forms = $forms->orderBy($order, $dir);
        if($limit >= 0) {
            $forms = $forms->offset($start)->limit($limit);
        }

        $forms = $forms->get();

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
			
			$_status = '<span class="badge badge-warning">Inactive</span>';
			if($row->status=='active') {
                $_status = '<span class="badge badge-success">Active</span>';
			}
			
			if($row->type=='fixed') {
                $coupon_type = '<span class="badge badge-primary">Fixed</span>';
			}else{
				$coupon_type = '<span class="badge badge-warning">Percent</span>';
			}
			
			if($row->type=='fixed') {
                $coupon_value =  number_format($row->value,2);
			}else{
				$coupon_value = $row->value .'%';
			}
	

            $data[$key]['DT_RowAttr'] = $_r;
            $data[$key]['id'] = $row->id;
            $data[$key]['code'] = $row->code;
            $data[$key]['fixed'] =$coupon_type;
            $data[$key]['value'] =$coupon_value;
            $data[$key]['expiry_date'] =$row->expiry_date;
            $data[$key]['status'] = $_status;
            $data[$key]['actions'] = view('backend.coupon.actions', [ "coupon" => $row ])->render();
        }

        return $data;
    }	
	
	

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('backend.coupon.create');
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
            // 'code'=>'string|required',
            // 'type'=>'required|in:fixed,percent',
            // 'value'=>'required|numeric',
            // 'status'=>'required|in:active,inactive'
        // ]);
        $data=$request->all();
        $status=Coupon::create($data);
        if($status){
            request()->session()->flash('success','Coupon Successfully added');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('coupon.index');
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
        $coupon=Coupon::find($id);
        if($coupon){
            return view('backend.coupon.edit')->with('coupon',$coupon);
        }
        else{
            return view('backend.coupon.index')->with('error','Coupon not found');
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
        $coupon=Coupon::find($id);
        $this->validate($request,[
            'code'=>'string|required',
            'type'=>'required|in:fixed,percent',
            'value'=>'required|numeric',
            'status'=>'required|in:active,inactive'
        ]);
        $data=$request->all();
        
        $status=$coupon->fill($data)->save();
        if($status){
            request()->session()->flash('success','Coupon Successfully updated');
        }
        else{
            request()->session()->flash('error','Please try again!!');
        }
        return redirect()->route('coupon.index');
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $coupon=Coupon::find($id);
        if($coupon){
            $status=$coupon->delete();
            if($status){
                request()->session()->flash('success','Coupon successfully deleted');
            }
            else{
                request()->session()->flash('error','Error, Please try again');
            }
            return redirect()->route('coupon.index');
        }
        else{
            request()->session()->flash('error','Coupon not found');
            return redirect()->back();
        }
    }

    public function couponStore(Request $request){
		
     $coupon = Coupon::where('code', $request->coupon_code)->first();

		if ($coupon) {

			// Check if the coupon has an expiration date
			if (!empty($coupon->expiry_date)) {
				// Check if the coupon has expired
				 $currentDate = now()->format('Y-m-d H:i:s');
				if ($currentDate > $coupon->expiry_date) {
					$response = [
						'status' => false,
						'message' => 'toast.coupon.expired'
					];

					return response()->json($response, 400);
				}
			}
			
			if($request->user_id){
			$userCouponUsage = Order::where('user_id', $request->user_id)->where('discount_couponcode', $coupon->code)->first();
				if ($userCouponUsage) {
					return [
						'status' => false,
						'message' => 'toast.coupon.already',
						'code' => 400
					];
				}else{
				$response = [
				'status' => true,
				'message' => 'toast.coupon.applied',
				'data' => [
					'coupon_name' => $coupon->code,
					'coupon_percent' => $coupon->value,
					'coupon_description' => $coupon->description,
					'coupon_type' => $coupon->type
				    ],
			];

			return response()->json($response, 201);
				}
			}else{
			$response = [
				'status' => true,
				'message' => 'toast.coupon.applied',
				'data' => [
					'coupon_name' => $coupon->code,
					'coupon_percent' => $coupon->value,
					'coupon_description' => $coupon->description,
					'coupon_type' => $coupon->type
				     ],
			];

			return response()->json($response, 201);
			}
			
			

		} else {
			// Coupon not found, return error response
			$response = [
				'status' => false,
				'message' => 'toast.coupon.invalid'
			];

			return response()->json($response, 404);
		}
		

    }
	
	
	public function checkCoupon(Request $request){
		$userCouponUsage = Order::where('user_id', $request->user_id)->where('discount_couponcode', $request->coupon)->first();

		if ($userCouponUsage && $userCouponUsage->id) {
			return response()->json(array( 'status' => true ));
		} else {
			return response()->json(array( 'status' => false ));
		}
    }
  
  
}