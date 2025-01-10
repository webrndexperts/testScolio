@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Update Payment Method</h5>
    <div class="card-body">
      <form method="post" action="{{route('payment-update',$edit_payments->id)}}">
        @csrf 
        @method('PATCH')
	 
	    <div class="form-group">
          <label for="inputTitle" class="col-form-label">Secret key </label>
        <input type="text" name="stripe_secret_key" value="{{$edit_payments->stripe_secret_key}}" class="form-control">
        </div>
		
		<div class="form-group">
          <label for="inputTitle" class="col-form-label">Publish key</label>
        <input type="text" name="stripe_publish_key" value="{{$edit_payments->stripe_publish_key}}" class="form-control">
        </div>
		
		<div class="form-group">
          <label for="status" class="col-form-label">Status</label>
          <select name="status" class="form-control">
            <option value="active" {{(($edit_payments->status=='active')? 'selected' : '')}}>Publish</option>
            <option value="inactive" {{(($edit_payments->status=='inactive')? 'selected' : '')}}>Draft</option>
        </select>
        </div>
		
        <div class="form-group mb-3">
          <button type="reset" class="btn btn-warning">Reset</button>
           <button class="btn btn-success" type="submit">Submit</button>
        </div>
      </form>
    </div>
</div>

@endsection
