@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Add Page</h5>
    <div class="card-body">
      <form method="post" action="{{route('page.store')}}" enctype="multipart/form-data">
        {{csrf_field()}}
	  <div class="form-group" style="display: none;">
		<label for="header_menu_title">Parent Page</label>
		<select id="dropdown" name="post_name" class="form-control">
		<option value="">--Select any one--</option>
		<option value="About">About</option>
		<option value="Services">Services</option>
		<option value="Results">Results</option>
		</select>
	  </div>
	  
	  	<div class="form-group" id="hiddenField" style="display: none;">
		<label for="services_type">Services Type</label>
		<select  name="services_type" class="form-control">
		<option value="">--Select any one--</option>
		<option value="Specialities">Specialities</option>
		<option value="Conditions-Treated">Conditions Treated</option>
		<option value="Advanced-Therapies">Advanced Therapies</option>
		</select>
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
          <label for="inputTitle" class="col-form-label">Title</label>
          <input id="inputTitle" type="text" name="post[{{ $code }}][title]" placeholder="Enter title"  class="form-control">
          @error('title')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div> 

        <div class="form-group">
          <label for="description" class="col-form-label">Description</label>
          <textarea class="form-control description" id="description_{{ $code }}" name="post[{{ $code }}][description]">{{old('description')}}</textarea>
        </div>  
        
        <div class="form-group" style="display:none;">
          <label for="excerpt" class="col-form-label">Excerpt</label>
          <textarea class="form-control excerpt" id="excerpt_{{ $code }}" name="post[{{ $code }}][excerpt]">{{old('excerpt')}}</textarea>
        </div>
                
        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Featured Image</label>
        <input id="inputImage" type="file" name="post[{{ $code }}][image]" class="form-control img-upload" style="display:none;">
        <input id="inputImage" type="text" name="post[{{ $code }}][image]" class="form-control img-upload">
        </div>


        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Featured Video Url: </label>
          <input id="inputTitle" type="text" name="post[{{ $code }}][video_url]" placeholder="Enter Video Url"  class="form-control">
        </div> 
        
		<div class="main-seo-setting">
			<h4> SEO Settings: </h4>
			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Meta Title</label>
			  <input type="text" name="post[{{ $code }}][seo_meta_title]" placeholder="Enter Meta Title"  class="form-control">
			</div> 

			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Meta Description</label>
			  <input type="text" name="post[{{ $code }}][seo_meta_description]" placeholder="Enter Meta Description"  class="form-control">
			</div> 
			
			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Meta Keywords</label>
			  <input type="text" name="post[{{ $code }}][seo_meta_tag]" placeholder="Enter Meta Keywords"  class="form-control">
			</div> 
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
              $('.excerpt').summernote({
                  tabsize: 2,
                  height: 100
              });
            });

			$(document).ready(function() {
				$('.description').summernote({
					tabsize: 2,
					height: 150,
					callbacks: {
						onImageUpload: function(files) {
							uploadImage(files[0]);
						},
						onImageLinkInsert: function($editable, $image) {
							$image.css('width', '25%');
						}
					}
				});

				function uploadImage(file) {
					let formData = new FormData();
					formData.append('file', file);
					formData.append("_token", $('meta[name="csrf-token"]').attr("content"));

					$.ajax({
						url: '{{ route("upload.image") }}',
						method: 'POST',
						data: formData,
						processData: false,
						contentType: false,
						success: function(response) {
							let imageUrl = response.location;
							$('.description').summernote('editor.insertImage', imageUrl);
						},
						error: function(jqXHR, textStatus, errorThrown) {
							console.error(textStatus + " " + errorThrown);
						}
					});
				}
			});
	


	
	    $(document).ready(function () {
				// Change 'dropdown' to the actual ID of your dropdown
				$('#dropdown').change(function () {
					// Change 'option1' and 'option2' to the values you want to trigger show/hide
		   if ($(this).val() == 'Services') {
                $('#hiddenField').show();
            }else {
                // Hide both fields if none of the options are selected
                $('#hiddenField').hide();
            }
				});
			});	
            // $('select').selectpicker();

          </script>
    @endpush


 @endforeach

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Page Slug</b><span class="text-danger">*</span></label>
          <input id="inputTitle" type="text" name="page_slug" placeholder="Enter Page Slug"  class="form-control">
          @error('page_slug')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div> 

        <div class="form-group">
          <label for="added_by">Author</label>
          <select name="added_by" class="form-control">
              <option value="">--Select any one--</option>
              @foreach($users as $key=>$data)
                <option value='{{$data->id}}' {{($key==0) ? 'selected' : ''}}>{{$data->name}}</option>
            @endforeach
          </select>
        </div>

        
        <div class="form-group">
          <label for="status" class="col-form-label">Status</label>
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