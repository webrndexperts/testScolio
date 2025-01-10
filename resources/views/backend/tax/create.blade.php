@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Add Tax</h5>
    <div class="card-body">
      <form method="post" action="{{route('tax.store')}}">
        {{csrf_field()}}
		

        <div class="form-group">
        <label for="inputTitle" class="col-form-label">Country code <span class="text-danger">*</span></label>
        <input id="inputTitle" type="text" name="country_code" placeholder="Enter Country code"  value="{{old('country_code')}}" class="form-control">
        @error('country_code')
        <span class="text-danger">{{$message}}</span>
        @enderror
        </div>
 
       <div class="form-group">
        <label for="inputTitle" class="col-form-label">State code</label>
        <input id="inputTitle" type="text" name="state_code" placeholder="Enter State code"  value="{{old('state_code')}}" class="form-control">
        </div>
		
		 <div class="form-group">
        <label for="inputTitle" class="col-form-label">Zip code</label>
        <input id="inputTitle" type="text" name="zip_code" placeholder="Enter Coupon code"  value="{{old('zip_code')}}" class="form-control">

        </div>
		
		<div class="form-group">
        <label for="inputTitle" class="col-form-label">City</label>
        <input id="inputTitle" type="text" name="city" placeholder="Enter Coupon code"  value="{{old('city')}}" class="form-control">
        </div>
		
		<div class="form-group">
        <label for="inputTitle" class="col-form-label">Tax Rate %<span class="text-danger">*</span></label>
        <input id="inputTitle" type="text" name="tax_rate" placeholder="Enter Tax Rate"  value="{{old('tax_rate')}}" class="form-control">
         @error('tax_rate')
          <span class="text-danger">{{$message}}</span>
        @enderror
        </div>
		
		 <div class="form-group">
        <label for="inputTitle" class="col-form-label">Tax name <span class="text-danger">*</span></label>
        <input id="inputTitle" type="text" name="tax_name" placeholder="Enter Tax name"  value="{{old('tax_name')}}" class="form-control">
        @error('tax_name')
        <span class="text-danger">{{$message}}</span>
        @enderror
        </div>

		<div class="form-group">
        <label for="inputTitle" class="col-form-label">Priority</label>
        <input id="inputTitle" type="number" name="priority" placeholder="Enter Tax name"  value="{{old('priority')}}" class="form-control">
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
          <button type="reset" class="btn btn-warning">Reset</button>
           <button class="btn btn-success" type="submit">Submit</button>
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

    $(document).ready(function() {
    $('#description').summernote({
      placeholder: "Write short description.....",
        tabsize: 2,
        height: 150
    });
    });
</script>


@endpush