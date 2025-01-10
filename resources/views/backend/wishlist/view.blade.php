@extends('backend.layouts.master')

@section('title','View Abandon Cart')

@section('main-content')
<div class="card">
   @if($show_wishist_data->user_cart_information)
<h5 class="card-header">Wishlist user details
<a href="{{route('wishlist.index')}}" class="btn btn-primary" id="abandon_sent_mail" style="float:right;"> Back</a>
</h5>
  <div class="card-body information">

      <h2>  Cart Information </h2>

		<h2 class="customer">Account Information</h2>
		<div class="Information-data">
		@if ($show_wishist_data->user_id)
	      <div class="aInformation-text"><p> Customer Name: </p><span> @if ($show_wishist_data->user_id && $show_wishist_data->user) {{$show_wishist_data->user->name}} @else  @endif</span> </div>
	      <div class="aInformation-text"><p>Email: </p> <span> @if ($show_wishist_data->user_id && $show_wishist_data->user) {{$show_wishist_data->user->email}} @else  @endif</span>
		  </div>
		  @endif

         </div>



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
