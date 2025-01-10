@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Add Page</h5>
    <div class="card-body">
      <form method="post" action="{{route('homepage-benifits.store')}}" enctype="multipart/form-data">
        {{csrf_field()}}

		<div class="form-group">
		<label for="header_menu_title">Post Type</label>
		<select id="dropdown" name="post_name" class="form-control">
		<option value="">--Select any one--</option>
		<option value="benifits-clinic">Benifits Clinic</option>
		<option value="non-treatment">Non Treatment</option>
		<option value="specail-offer">Specail Offer</option>
		<option value="praise-from-patients">Praise From Patients</option>
		</select>
		</div>
 
      <div class="form-group" id="hiddenField" style="display: none;">
          <label for="inputTitle" class="col-form-label">Number of box<span class="text-danger">*</span></label>
          <input id="inputTitle" type="text" name="count_numbers" placeholder="Enter Number of box" class="form-control">
          @error('count_numbers')
          <span class="text-danger">{{$message}}</span>
          @enderror
      </div> 
	  
	  <div class="form-group" id="hiddenField2" style="display: none;">
          <label for="inputTitle" class="col-form-label">Page Slug:<span class="text-danger">*</span></label>
          <input id="inputTitle" type="text" name="page_slug" placeholder="Enter Page Slug" class="form-control">
          @error('page_slug')
          <span class="text-danger">{{$message}}</span>
          @enderror
      </div> 
	  
        @php
        $post = [];
        @endphp

  @foreach ($languages as $code => $language)

  <div class="accordion-single js-acc-single">
  <div class="accordion-single-item js-acc-item">
    <h2 class="accordion-single-title js-acc-single-trigger">{{ $language->name }} <img src="{{ $language->icon }}"></h2>
    <div class="accordion-single-content">


        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Title <span class="text-danger">*</span></label>
          <input id="inputTitle" type="text" name="post[{{ $code }}][title]" placeholder="Enter title"  class="form-control">
          @error('title')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div> 

        <div class="form-group">
          <label for="description" class="col-form-label">Description</label>
          <textarea class="form-control description" id="description_{{ $code }}" name="post[{{ $code }}][description]">{{old('description')}}</textarea>
        </div>  
		
        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Image</label>
        <input id="inputImage" type="file" name="post[{{ $code }}][image]" class="form-control">
        </div>

        
      </div>
      </div>
   </div>

    @push('styles')
        <link rel="stylesheet" href="{{asset('backend/summernote/summernote.min.css')}}">
    @endpush
    @push('scripts')
        <script src="{{asset('backend/summernote/summernote.min.js')}}"></script>
        <script>
            $(document).ready(function() {
              $('.description').summernote({
                  tabsize: 2,
                  height: 150
              });
            });


		  $(document).ready(function () {
				// Change 'dropdown' to the actual ID of your dropdown
				$('#dropdown').change(function () {
					// Change 'option1' and 'option2' to the values you want to trigger show/hide
		   if ($(this).val() == 'benifits-clinic') {
                $('#hiddenField').show();
                $('#hiddenField2').hide();
            } else if ($(this).val() == 'non-treatment' || $(this).val() == 'specail-offer') {
                $('#hiddenField').hide();
                $('#hiddenField2').show();
            } else {
                // Hide both fields if none of the options are selected
                $('#hiddenField').hide();
                $('#hiddenField2').hide();
            }
				});
			});

          </script>
    @endpush


 @endforeach

       
        
        <div class="form-group">
          <label for="status" class="col-form-label">Status <span class="text-danger">*</span></label>
          <select name="status" class="form-control">
              <option value="active">Publish</option>
              <option value="inactive">Draft</option>
          </select>
          @error('status')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>
        <div class="form-group mb-3">
          <button type="reset" class="btn btn-warning">Reset</button>
           <button class="btn btn-success" type="submit">Publish</button>
        </div>
      </form>
    </div>
</div>

@endsection

@push('styles')
<link rel="stylesheet" href="{{asset('backend/summernote/summernote.min.css')}}">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css" />
@endpush
@push('scripts')
<script src="/vendor/laravel-filemanager/js/stand-alone-button.js"></script>
<script src="{{asset('backend/summernote/summernote.min.js')}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>

@endpush