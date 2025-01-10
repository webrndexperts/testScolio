@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Edit Shipping</h5>
    <div class="card-body">
      <form method="post">
        @csrf 
        @method('PATCH')
	   
   
		<div class="form-group">
          <label for="inputTitle" class="col-form-label">Easyship Access Token </label>
        <input type="text" name="easyship_access_token" readonly value="{{$shipping->easyship_access_token}}" class="form-control">

        </div>
		
		
		<div class="form-group">
          <label for="inputTitle" class="col-form-label">Shipping Class Slug </label>
        <input type="text" name="easyship_class_slug" readonly value="{{$shipping->easyship_class_slug}}" class="form-control">
        </div>

	   	<div class="form-group">
          <label for="inputTitle" class="col-form-label">Status</label>
        <input type="text" name="easyship_class_slug" readonly value="{{$shipping->status}}" class="form-control">
        </div>
        
      </form>
    </div>
</div>

@endsection
