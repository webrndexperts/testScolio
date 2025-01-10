@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Edit Page</h5>
    <div class="card-body">
      <form method="post" action="{{route('homepage-benifits.update',$post->id)}}" enctype="multipart/form-data">
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
		@if($post->post_type=='non-treatment' || $post->post_type=='specail-offer' || $post->post_type=='benifits-clinic')
        <div class="form-group">
          <label for="description" class="col-form-label">Description</label>
          <textarea class="form-control" id="description" name="description">{{$post->description}}</textarea>
          @error('description')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>


        <!--div class="form-group">
          <label for="inputTitle" class="col-form-label">Image</label>
        <img src="{{$post->photo}}" alt="{{$post->photo}}" style="max-width:110px;">
        <input id="inputTitle" type="file" name="photo" class="form-control" value="{{$post->photo}}">
        </div-->
		
		 <div class="form-group">
          <label for="inputTitle" class="col-form-label">Image</label>
        <img src="{{$post->photo}}" alt="{{$post->photo}}" style="max-width:110px;">
        <input id="inputTitle" type="text" name="photo" class="form-control" value="{{$post->photo}}">
        </div>
		@endif	
		<div class="form-group">
		<label for="header_menu_title">Post Type</label>
		<select id="dropdown" name="post_name" class="form-control">
		<option value="">--Select any one--</option>
		<option value="benifits-clinic" {{(($post->post_type=='benifits-clinic')? 'selected' : '')}}>Benifits Clinic</option>
		<option value="non-treatment" {{(($post->post_type=='non-treatment')? 'selected' : '')}}>Non Treatment</option>
		<option value="specail-offer" {{(($post->post_type=='specail-offer')? 'selected' : '')}}>Specail Offer</option>
		<option value="praise-from-patients" {{(($post->post_type=='praise-from-patients')? 'selected' : '')}}>Praise From Patients</option>
		</select>
		</div>
	
      @if($post->post_type=='praise-from-patients')
      <div class="form-group" id="hiddenField">
          <label for="inputTitle" class="col-form-label">Video Url<span class="text-danger">*</span></label>
          <input id="inputTitle" type="text" name="video_url" class="form-control" value="{{$post->video_url}}">
          @error('video_url')
          <span class="text-danger">{{$message}}</span>
          @enderror
      </div> 
	   @endif	
      @if($post->post_type=='benifits-clinic')
      <div class="form-group" id="hiddenField">
          <label for="inputTitle" class="col-form-label">Number of box<span class="text-danger">*</span></label>
          <input id="inputTitle" type="text" name="count_numbers" placeholder="Enter Number of box" class="form-control" value="{{$post->count_numbers}}">
          @error('count_numbers')
          <span class="text-danger">{{$message}}</span>
          @enderror
      </div> 
	   @endif
      @if($post->post_type=='non-treatment' || $post->post_type=='specail-offer')
		
        	   <div class="form-group" id="hiddenField2">
          <label for="inputTitle" class="col-form-label">Page Slug:<span class="text-danger">*</span></label>
          <input id="inputTitle" type="text" name="page_slug" placeholder="Enter Page Slug" class="form-control" value="{{$post->slug}}">
          @error('page_slug')
          <span class="text-danger">{{$message}}</span>
          @enderror
      </div>         
	   @endif
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
           <button class="btn btn-success" type="submit">Update</button>
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
				// Change 'dropdown' to the actual ID of your dropdown
				$('#dropdown').change(function () {
					// Change 'option1' and 'option2' to the values you want to trigger show/hide
		   if ($(this).val() == 'benifits-clinic' || $(this).val() == 'specail-offer') {
                $('#hiddenField').show();
                $('#hiddenField2').hide();
            } else if ($(this).val() == 'non-treatment') {
                $('#hiddenField').hide();
                $('#hiddenField2').show();
            }
				});
			});

	
</script>
@endpush