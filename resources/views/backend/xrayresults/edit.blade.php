@extends('backend.layouts.master')

@section('main-content')
<style>
.main-seo-setting {
    border: 1px solid #5555;
    padding: 20px;
	
}
.loader-icon-submit #loader {
    height: 185px;
    position: absolute !important;
    top: 60%;
    left: 42%;
    width: 185px;
}	
</style>
<div class="card">
    <h5 class="card-header">Edit Case Studies</h5>
    <div class="card-body">
      <form method="post" action="{{route('xrayresults.update',$post->id)}}" id="myForm">
        @csrf 
        @method('PATCH')

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Language</label>
          <input id="inputTitle" type="text"  value="{{$post->lang}}" class="form-control" readonly>
        </div>

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Title <span class="text-danger">*</span></label>
          <input id="inputTitle" type="text" name="title" placeholder="Enter title"  value="{{$post->title}}" class="form-control">
          @error('title')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>

        <div class="form-group">
          <label for="post_cat_id">Category <span class="text-danger">*</span></label>
          <select name="xray_cat_id" class="form-control">
              <option value="">--Select any category--</option>
              @foreach($categories as $key=>$data)
                  <option value='{{$data->id}}' {{(($data->id==$post->xray_cat_id)? 'selected' : '')}}>{{$data->title}}</option>
              @endforeach
          </select>
        </div>

        <div class="form-group">
          <label for="description" class="col-form-label">Description</label>
          <textarea class="form-control" id="description" name="description">{{$post->description}}</textarea>
          @error('description')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Image</label>
        <img src="{{$post->photo}}" style="width:80px;">
        <input id="inputTitle" type="file" name="image" class="form-control">
        </div>
		
		  <div class="form-group">
          <label for="inputTitle" class="col-form-label">Age</label>
          <input  type="number" name="age" class="form-control" value="{{$post->age}}">
        </div> 

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Curve Degree</label>
          <input  type="number" name="curve_degree" class="form-control" value="{{$post->curve_degree}}">
        </div> 

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Case Number</label>
          <input  type="text" name="case_number" value="{{$post->case_number}}"  class="form-control">
        </div> 

        <div class="main-seo-setting">
			<h4> SEO Setting: </h4>
			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Meta Title</label>
			  <input type="text" name="seo_meta_title" value="{{$post->seo_meta_title}}"  class="form-control">
			</div> 

			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Meta Description</label>
			  <input type="text" name="seo_meta_description" value="{{$post->seo_meta_description}}"  class="form-control">
			</div> 
			
			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Meta Tag</label>
			  <input type="text" name="seo_meta_tag" value="{{$post->seo_meta_tag}}"  class="form-control">
			</div> 
       </div>


       <div class="form-group">
          <label for="inputTitle" class="col-form-label">Slug</label>
          <input id="inputTitle" type="text" name="page_slug"  value="{{$post->slug}}" class="form-control">
        </div> 

                
        <div class="form-group">
          <label for="status" class="col-form-label">Status <span class="text-danger">*</span></label>
          <select name="status" class="form-control">
            <option value="active" {{(($post->status=='active')? 'selected' : '')}}>Publish</option>
            <option value="inactive" {{(($post->status=='inactive')? 'selected' : '')}}>Draft</option>
        </select>
          @error('status')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>
        <div class="form-group mb-3">
           <button class="btn btn-success" type="submit" id="submitBtn">Update</button>
        </div>
		<div class="loader-icon-submit">
		<img id="loader" src="{{url('/backend/img/ajax-loader-circle.gif')}}" alt="Loader" style="display: none;">
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

<script>
    //$('#lfm').filemanager('image');

    $(document).ready(function() {
    $('#excerpt').summernote({
      placeholder: "Write short description.....",
        tabsize: 2,
        height: 150
    });
    });

    $(document).ready(function() {
      $('#description').summernote({
        placeholder: "Write detail description.....",
          tabsize: 2,
          height: 150
      });
    });
	
	$(document).ready(function () {
			$('#myForm').submit(function (e) {
			// Serialize form data
			var formData = $(this).serialize();

			// Check if form data is not empty
			if (formData.trim() === '') {
				// Form is empty, prevent submission and do not show loader
				e.preventDefault();
				return false;
			}

			// Show loader GIF
			$('#loader').show();
		});
    });
	
</script>
@endpush