@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Add Payment Method</h5>
    <div class="card-body">
      <form method="post" action="{{route('payment-store')}}">
        {{csrf_field()}}
       
		<div class="form-group">
        <input type="hidden" name="method_type" value="Stripe-Method" class="form-control">
        </div>	

	   <div class="form-group">
          <label for="inputTitle" class="col-form-label">Secret key </label>
        <input type="text" name="stripe_secret_key"  value="{{old('stripe_secret_key')}}" class="form-control">
        </div>
		
		<div class="form-group">
          <label for="inputTitle" class="col-form-label">Publish key</label>
        <input type="text" name="stripe_publish_key"  value="{{old('stripe_publish_key')}}" class="form-control">

        </div>

        
        <div class="form-group">
          <label for="status" class="col-form-label">Status </label>
          <select name="status" class="form-control">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
          </select>
          @error('status')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>
        <div class="form-group mb-3">
          <button type="reset" class="btn btn-warning">Reset</button>
           <button class="btn btn-success" type="submit">Submit</button>
        </div>
      </form>
    </div>
</div>

@endsection
