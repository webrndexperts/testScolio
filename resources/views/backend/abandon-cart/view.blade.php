@extends('backend.layouts.master')

@section('title','View Abandon Cart')

@section('main-content')
<div class="card">
   @if($show_abandon_cart_data->user_cart_information)
<h5 class="card-header">Abandon Cart # {{$show_abandon_cart_data->id}} 
<a href="{{route('abandon-cart.index')}}" class="btn btn-primary" id="abandon_sent_mail" style="float:right;"> Back</a>
</h5>
  <div class="card-body information">

      <h2>  Cart Information </h2>
	  <div class="Information-data">
	  <div class="aInformation-text"> <p>Date: </p><span> {{ ($show_abandon_cart_data->created_at) ? $show_abandon_cart_data->created_at->format('Y-m-d H:i:s') : '' }}<span></div>
			<div class="aInformation-text"><p>Mail Sent: </p><span> {{ ($show_abandon_cart_data->mailsent_status == 'yes') ? 'Yes' : 'No' }}</span> </div>
</div>
		<h2 class="customer">Account Information</h2>
		<div class="Information-data">
		@if ($show_abandon_cart_data->user_id)
	      <div class="aInformation-text"><p> Customer Name: </p><span> @if ($show_abandon_cart_data->user_id && $show_abandon_cart_data->user) {{$show_abandon_cart_data->user->name}} @else  @endif</span> </div>
	      <div class="aInformation-text"><p>Email: </p> <span> @if ($show_abandon_cart_data->user_id && $show_abandon_cart_data->user) {{$show_abandon_cart_data->user->email}} @else  @endif</span>
		  </div>
		  @endif
		  @if ($show_abandon_cart_data->user_ip_address)
	      <div class="aInformation-text"><p> Customer IP Address: </p><span> {{$show_abandon_cart_data->user_ip_address}} </span> </div>
	  
		  @endif
         </div>
	 
	 
    <table class="table table-striped table-hover">
      <thead>
        <tr>
            <th>SKU</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Sub Total</th>
        </tr>
      </thead>
      <tbody>
		@php
			$user_cart_information = json_decode($show_abandon_cart_data->user_cart_information);
			$total_price = 0;
		@endphp
		
		@if(isset($user_cart_information->products) && count($user_cart_information->products) > 0)
			@foreach($user_cart_information->products as $product)
		      @php
		      $get_calulation_price = $product->quantity * $product->price;
			  $total_price += $get_calulation_price;
			  @endphp
				<tr>
					<td>{{ $product->sku }}</td>
					<td>{{ $product->title }}</td>
					<td>{{ $product->quantity }}</td>
					<td>${{ number_format($product->price, 2) }}</td>
					<td>${{ number_format($product->quantity * $product->price, 2) }}</td>
				</tr>
			@endforeach
		@endif
      </tbody>
    </table>


   <div class="shipping-amount ">
	@if($total_price)
		<p class="all-tax">Total Amount:<span> {{ isset($total_price) ? '$'. number_format($total_price, 2) : '' }} </span></p>
	@endif
</div>

   <!--div class="shipping-amount">
	@if(isset($user_cart_information->priceDetails))
		<p>Subtotal: <span>{{ isset($user_cart_information->priceDetails->subTotalPrice) ?  '$'. number_format($user_cart_information->priceDetails->subTotalPrice, 2) : '' }}</span></p>
		<p>Shipping Charges: <span>{{ isset($user_cart_information->priceDetails->shippingCharges) ? '$'. number_format($user_cart_information->priceDetails->shippingCharges, 2) : '' }}</span></p>
		@if($user_cart_information->priceDetails->couponCode)
		<p>Coupon Code: <span>{{ isset($user_cart_information->priceDetails->couponCode) ? $user_cart_information->priceDetails->couponCode : '' }}</span></p>
		<p>Coupon Price: <span>{{ isset($user_cart_information->priceDetails->couponPrice) ? '$'. number_format($user_cart_information->priceDetails->couponPrice, 2) : '' }}</span></p>
		@endif
		<p>Tax: <span>{{ isset($user_cart_information->priceDetails->taxPrice) ? '$'. number_format($user_cart_information->priceDetails->taxPrice, 2) : '' }}</span></p>
		<p class="all-tax">Total Amount:<span> {{ isset($user_cart_information->priceDetails->totalPrice) ? '$'. number_format($user_cart_information->priceDetails->totalPrice, 2) : '' }} </span></p>
	@endif
</div-->

  </div>
    @endif
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
	.shipping-amount {
    float: right;
    width: 30%;
}
p.all-tax {
    color: #000;
    font-weight: 600;
    border-top: 1px solid #e5e5e5;
    padding: 10px 0;
}
.shipping-amount  span {
    float: right;
}
.information h2 {
    font-size: 22px;
    border-bottom: 1px solid #e5e5e5;
    padding: 10px 0 20px;
}
.Information-data {
    width: 30%;
}

h2.customer {
    border-top: 1px solid #e5e5e5;
    padding-top: 20px;
}
.aInformation-text p {
    width: 55%;
}
.aInformation-text {
    display: flex;
}
</style>
@endpush
