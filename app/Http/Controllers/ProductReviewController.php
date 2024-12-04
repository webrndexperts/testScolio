<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Notification;
use App\Notifications\StatusNotification;
use App\User;
use App\Models\ProductReview;
class ProductReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reviews=ProductReview::getAllReview();
        
        return view('backend.review.index')->with('reviews',$reviews);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
	  try {
		
        // $this->validate($request,[
            // 'rate'=>'required|numeric|min:1'
        // ]);
        //$product_info=Product::getProductBySlug($request->slug);
        //  return $product_info;
        // return $request->all();
        $data=$request->all();
        $data['product_id']= !empty($request->product_id) ? $request->product_id : 0;
        $data['user_id']= !empty($request->user_id) ? $request->user_id : 0;
        $data['rate']= !empty($request->rate) ? $request->rate : null;
        $data['review']= !empty($request->review) ? $request->review : null;
        $data['user_name']= !empty($request->user_name) ? $request->user_name : null;
        $data['email_address']= !empty($request->email_address) ? $request->email_address : null;
        $data['status']='active';
       
        $status=ProductReview::create($data);

		//dd($status);

		$response = [		
            'success' => true,
            'message' => 'Data saved successfully',
            'data' => $status,
			//'sent_mail' => 'Email sent successfully' . $sent_mail,
        ];

		
		return response()->json($response, 201);
		
	 } catch (\Exception $e) {
            // Handle the exception
            $response = [
                'success' => false,
                'message' => $e->getMessage(),
				//'sent_mail' => 'Error sending email: ' . $e->getMessage(),
            ];

            return response()->json($response, 500);
        }
		
		
		
        // if($status){
            // request()->session()->flash('success','Thank you for your feedback');
        // }
        // else{
            // request()->session()->flash('error','Something went wrong! Please try again!!');
        // }
        // return redirect()->back();
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
        $review=ProductReview::find($id);
        // return $review;
        return view('backend.review.edit')->with('review',$review);
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
        $review=ProductReview::find($id);
        if($review){
            // $product_info=Product::getProductBySlug($request->slug);
            //  return $product_info;
            // return $request->all();
            $data=$request->all();
            $status=$review->fill($data)->update();

            // $user=User::where('role','admin')->get();
            // return $user;
            // $details=[
            //     'title'=>'Update Product Rating!',
            //     'actionURL'=>route('product-detail',$product_info->id),
            //     'fas'=>'fa-star'
            // ];
            // Notification::send($user,new StatusNotification($details));
            if($status){
                request()->session()->flash('success','Review Successfully updated');
            }
            else{
                request()->session()->flash('error','Something went wrong! Please try again!!');
            }
        }
        else{
            request()->session()->flash('error','Review not found!!');
        }

        return redirect()->route('review.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $review=ProductReview::find($id);
        $status=$review->delete();
        if($status){
            request()->session()->flash('success','Successfully deleted review');
        }
        else{
            request()->session()->flash('error','Something went wrong! Try again');
        }
        return redirect()->route('review.index');
    }
}
