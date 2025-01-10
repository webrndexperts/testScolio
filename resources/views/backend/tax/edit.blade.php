@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Edit Coupon</h5>
    <div class="card-body">
      <form method="post" action="{{route('tax.update',$coupon->id)}}">
        @csrf 
        @method('PATCH')
 
  
        <div class="form-group">
        <label for="inputTitle" class="col-form-label">Country code <span class="text-danger">*</span></label>
        <input id="inputTitle" type="text" name="country_code" value="{{$coupon->country_code}}" class="form-control">
        @error('country_code')
        <span class="text-danger">{{$message}}</span>
        @enderror
        </div>
 
       <div class="form-group">
        <label for="inputTitle" class="col-form-label">State code</label>
        <input id="inputTitle" type="text" name="state_code" value="{{$coupon->state_code}}" class="form-control">
        </div>
		
		 <div class="form-group">
        <label for="inputTitle" class="col-form-label">Zip code</label>
        <input id="inputTitle" type="text" name="zip_code" value="{{$coupon->zip_code}}" class="form-control">

        </div>
		
		<div class="form-group">
        <label for="inputTitle" class="col-form-label">City</label>
        <input id="inputTitle" type="text" name="city" value="{{$coupon->city}}" class="form-control">
        </div>
		
		<div class="form-group">
        <label for="inputTitle" class="col-form-label">Tax Rate %<span class="text-danger">*</span></label>
        <input id="inputTitle" type="text" name="tax_rate" value="{{$coupon->tax_rate}}" class="form-control">
         @error('tax_rate')
          <span class="text-danger">{{$message}}</span>
        @enderror
        </div>
		
		 <div class="form-group">
        <label for="inputTitle" class="col-form-label">Tax name <span class="text-danger">*</span></label>
        <input id="inputTitle" type="text" name="tax_name" value="{{$coupon->tax_name}}" class="form-control">
        @error('tax_name')
        <span class="text-danger">{{$message}}</span>
        @enderror
        </div>

		<div class="form-group">
        <label for="inputTitle" class="col-form-label">Priority</label>
        <input id="inputTitle" type="number" name="priority" value="{{$coupon->priority}}" class="form-control">
        </div>

        <div class="form-group">
          <label for="status" class="col-form-label">Status <span class="text-danger">*</span></label>
          <select name="status" class="form-control">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
          </select>
          @error('status')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>
        <div class="form-group mb-3">
           <button class="btn btn-success" type="submit">Update</button>
        </div>
      </form>
    </div>
</div>

@endsection

@push('styles')
<link rel="stylesheet" href="{{asset('backend/summernote/summernote.min.css')}}">
@endpush
@push('scripts')
<script src="/vendor/laravel-filemanager/js/stand-alone-button.js"></script>
<script src="{{asset('backend/summernote/summernote.min.js')}}"></script>
<script>
   // $('#lfm').filemanager('image');

    $(document).ready(function() {
    $('#description').summernote({
      placeholder: "Write short description.....",
        tabsize: 2,
        height: 150
    });
    });
</script>
@endpush