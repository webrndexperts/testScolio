@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Add EasyShip Method</h5>
    <div class="card-body">
      <form method="post" action="{{route('shipping.store')}}">
        {{csrf_field()}}
       
		<div class="form-group">
        <input type="hidden" name="method_type" value="Easyship-Method" class="form-control">
        </div>	
       <div id="easyship_method">     
		<div class="form-group">
          <label for="inputTitle" class="col-form-label">Easyship Access Token </label>
        <input type="text" name="easyship_access_token"  value="{{old('easyship_access_token')}}" class="form-control">
         @error('easyship_access_token')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>
		
		<div class="form-group">
          <label for="inputTitle" class="col-form-label">Shipping Class Slug </label>
        <input type="text" name="easyship_class_slug"  value="{{old('easyship_class_slug')}}" class="form-control">
         @error('easyship_class_slug')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>
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
