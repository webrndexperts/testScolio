@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Edit Page</h5>
    <div class="card-body">
      <form method="post" action="{{route('widgets.update',$post->id)}}" enctype="multipart/form-data">
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
          <label for="description" class="col-form-label">Description</label>
          <textarea class="form-control" id="description" name="description">{{$post->description}}</textarea>
          @error('description')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>


        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Image</label>
        <img src="{{$post->photo}}" alt="{{$post->photo}}" style="max-width:110px;">
        <input id="inputTitle" type="file" name="photo" class="form-control" value="{{$post->photo}}">
        </div>
		
		<div class="form-group">
		<label for="header_menu_title">Post Type</label>
		<select id="dropdown" name="post_name" class="form-control">
		<option value="">--Select any one--</option>
		<option value="Contact Info" {{(($post->widgets_type=='Contact Info')? 'selected' : '')}}>Contact Info</option>
		<option value="Telephone" {{(($post->widgets_type=='Telephone')? 'selected' : '')}}>Telephone</option>
		<option value="Opening Hours" {{(($post->widgets_type=='Opening Hours')? 'selected' : '')}}>Opening Hours</option>
		<option value="Scoliosis Results" {{(($post->widgets_type=='Scoliosis Results')? 'selected' : '')}}>Scoliosis Results</option>
		<option value="Our Promise" {{(($post->widgets_type=='Our Promise')? 'selected' : '')}}>Our Promise</option>
		</select>
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