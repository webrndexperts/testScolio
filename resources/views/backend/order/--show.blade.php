@extends('backend.layouts.master')

@section('title','Order Detail')

@section('main-content')
<div class="card">
<h5 class="card-header">Order      
 <!--a href="{{route('order.pdf',$order->id)}}" class=" btn btn-sm btn-primary shadow-sm float-right"><i class="fas fa-download fa-sm text-white-50"></i> Generate PDF</a-->
 <a href="{{route('order.index')}}" class=" btn btn-sm btn-primary shadow-sm float-right"> Back</a>
  </h5>
  <div class="card-body">
    @if($order)
    <table class="table table-striped table-hover">
      <thead>
        <tr>
            <th>S.N.</th>
            <th>Order No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Total Amount</th>
			<th>Publish Date</th>
			<th>Language</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
		    @php
					$user_id = $order->user_id;
					$user_info = DB::table('users')->where('id',$user_id)->first();
					$test_users_addresses_info = DB::table('users_addresses_info')->where('id',$user_id)->first();
					//dd($test_users_addresses_info);
            @endphp 
            <td>{{$order->id}}</td>
            <td>{{$order->order_number}}</td>
            <td>{{$user_info->name ?? ''}}</td>
             <td>{{$user_info->email ?? ''}}</td>
            <td>${{number_format($order->sub_total,2)}} SGD</td>
			<td>{{$order->created_at->format(' d M, Y')}}</td>
			<td>{{$order->lang ?? ''}}</td>

            <td>
                @if($order->status=='new')
                  <span class="badge badge-primary">{{$order->status}}</span>
                @elseif($order->status=='process')
                  <span class="badge badge-warning">{{$order->status}}</span>
                @elseif($order->status=='delivered')
                  <span class="badge badge-success">{{$order->status}}</span>
                @else
                  <span class="badge badge-danger">New</span>
                @endif
            </td>
            <td>
                <a style="display:none;" href="{{route('order.edit',$order->id)}}" class="btn btn-primary btn-sm float-left mr-1" style="height:30px; width:30px;border-radius:50%" data-toggle="tooltip" title="edit" data-placement="bottom"><i class="fas fa-edit"></i></a>
                <form method="POST" action="{{route('order.destroy',[$order->id])}}">
                  @csrf
                  @method('delete')
                      <button class="btn btn-danger btn-sm dltBtn" data-id={{$order->id}} style="height:30px; width:30px;border-radius:50%" data-toggle="tooltip" data-placement="bottom" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </form>
            </td>

        </tr>
      </tbody>
    </table>

    <section class="confirmation_part section_padding">
      <div class="order_boxes">
        <div class="row">
          <div class="col-lg-12 col-lx-4">
            <div class="order-info">
              <h4 class="text-center pb-4">ORDER INFORMATION</h4>
              <table class="table">
			    @php				
				   if ($order) {
			
						foreach ($orderProducts as $orderItemInfo) {
					
							$productTitle = $orderItemInfo->product->title;
							$productPrice = $orderItemInfo->product->price;
							$productQuantity = $orderItemInfo->quantity;
						@endphp 	
			         <tr class="">
                        <td>Product Details :</td>
	                     <td>
						 <b>Name-></b>  @if($productTitle) {{$productTitle}} @else '' @endif, 
						 <b>Price-></b>  @if($productPrice) ${{$productPrice}}.00, SGD @else '' @endif,
						 <b>Quantity-></b> @if($productQuantity) {{$productQuantity}} @else '' @endif
						 </td>
						 @php
						}
					} 
			   	@endphp 				
                    </tr>

                    <tr class="">
                        <td>Product Vartion: </td>
					
                        <td>
                    @if(!empty($order->grouped_product_attributes))						
					<?php
					$jsonString = $order->grouped_product_attributes; 

					// Decode the JSON string
					$data = json_decode($jsonString, true); // Passing true as the second argument to decode as associative array

					// Loop through each key-value pair and display them
					foreach ($data as $key => $value) {
						if ($value !== null) {
							if ($key === "Image") {
								echo "<p><b>$key:</b> <img src='$value' alt='' style='height:120px;'></p>";
							} else {
								echo "<p><b>$key:</b> $value<br></p>";
							}
						}
					}
					?>
						
					@endif
					</td>

                    </tr>
                    <tr>					
                    <tr class="">
                        <td>Order Number</td>
                        <td> : {{$order->order_number}}</td>
                    </tr>
                    <tr>
                        <td>Order Date</td>
                        <td> : {{$order->created_at->format('D d M, Y')}} at {{$order->created_at->format('g : i a')}} </td>
                    </tr>
                    <tr>
                        <td>Quantity</td>
                        <td> : {{$order->quantity}}</td>
                    </tr>
                    <tr>
                        <td>Order Status</td>
                        <td> : {{$order->payment_status}}</td>
                    </tr>
					@if(isset($order->discount_couponcode) && $order->discount_couponcode)
					<tr>
                      <td>Coupon Name</td>
                      <td> : {{$order->discount_couponcode}} </td>
                    </tr>
					@endif
					@if(isset($order->coupon) && $order->coupon > 0)
                    <tr>
                      <td>Coupon Discount</td>
                      <td> : ${{$order->coupon}} SGD</td>
                    </tr>
					@endif
					 <tr>
                        <td>GST Tax</td>
                        <td> : ${{number_format($order->gst_tax,2)}} SGD</td>
                    </tr>
					
					 <tr>
                        <td>Total Product Price</td>
                        <td> : ${{number_format($order->total_amount,2)}} SGD</td>
                    </tr>
					
                    <tr>
                        <td>Total Amount</td>
                        <td> : ${{number_format($order->sub_total,2)}} SGD</td>
                    </tr>
					<tr>
                        <td>Payment Id</td>
                        <td> : {{$order->payment_id}}</td>
                    </tr>
                    <tr>
                        <td>Payment Method</td>
                        <td> : {{$order->payment_method}}</td>
                    </tr>
                    <tr>
                        <td>Payment Status</td>
                        <td> : Completed</td>
                    </tr>
              </table>
            </div>
          </div>
        </div>
		 <div class="row">
          <div class="col-lg-6 col-lx-4">
            <div class="shipping-info">
              <h4 class="text-center pb-4">BILLING INFORMATION</h4>
              <table class="table">
			        <tr class="">
                        <td>Full Name</td>
                        <td> : {{$orderUserInfo->billing_first_name}} {{$orderUserInfo->billing_last_name}}</td>
                    </tr>

                    <tr class="">
                        <td>Email</td>
                        <td> : {{$orderUserInfo->billing_email ?? ''}}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td> : {{$orderUserInfo->billing_city ?? ''}}</td>
                    </tr>
                    <tr>
                        <td>Phone No.</td>
                        <td> : {{$orderUserInfo->shipping_phone ?? ''}}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td> : {{$orderUserInfo->shipping_address_1 ?? ''}}</td>
                    </tr>
					
                    <tr>
                        <td>Country</td>
                        <td> : {{$orderUserInfo->shipping_country ?? ''}}</td>
                    </tr>
					 <tr>
                        <td>State</td>
                        <td> : {{$orderUserInfo->billing_state}}</td>
                    </tr>
                    <tr>
                        <td>Post Code</td>
                        <td> : {{$orderUserInfo->shipping_postcode ?? ''}}</td>
                    </tr>
              </table>
            </div>
          </div>

          <div class="col-lg-6 col-lx-4">
            <div class="shipping-info">
              <h4 class="text-center pb-4">SHIPPING INFORMATION</h4>
              <table class="table">
			        <tr class="">
                        <td>Shipping Method Name:</td>
                        <td> : {{$order->shipping_method_name}}</td>
                    </tr>
					
					<tr class="">
                        <td>Shipping Price:</td>
                        <td> :${{number_format($order->shipping_price,2)}} SGD</td>
                    </tr>
			  
			       <tr class="">
                        <td>Shipping ID:</td>
                        <td> : {{$order->shipping_id}}</td>
                    </tr>
					
                    <tr class="">
                        <td>Full Name</td>
                        <td> : {{$user_info->name ?? ''}}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td> : {{$user_info->email ?? ''}}</td>
                    </tr>
                    <tr>
                        <td>Phone No.</td>
                        <td> : {{$orderUserInfo->shipping_phone ?? ''}}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td> : {{$orderUserInfo->shipping_address_1 ?? ''}}</td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td> : {{$orderUserInfo->shipping_country ?? ''}}</td>
                    </tr>
                    <tr>
                        <td>Post Code</td>
                        <td> : {{$orderUserInfo->shipping_postcode ?? ''}}</td>
                    </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    @endif

  </div>
</div>
@endsection

@push('styles')
<style>
    .order-info,.shipping-info{
        background:#ECECEC;
        padding:20px;
    }
    .order-info h4,.shipping-info h4{
        text-decoration: underline;
    }

</style>
@endpush
