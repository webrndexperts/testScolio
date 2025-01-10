@extends('backend.layouts.master')
@section('title','E-SHOP || Banner Edit')
@section('main-content')

<div class="card">
    <h5 class="card-header">Edit Patients Worldwide</h5>
    <div class="card-body">
      <form method="post" action="{{route('patients-worldwide.update',$banner->id)}}">
        @csrf 
        @method('PATCH')
        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Title <span class="text-danger">*</span></label>
        <input id="inputTitle" type="text" name="title" placeholder="Enter title"  value="{{$banner->title}}" class="form-control">
        @error('title')
        <span class="text-danger">{{$message}}</span>
        @enderror
        </div>

  <label for="inputTitle" class="col-form-label">Images Gallery</label>
		<!--div class="form-group">
          <label for="inputTitle" class="col-form-label">Images Gallery</label>
		  @php
                $gallery = $banner->photo;
				
				$galleryArray = explode(',', $gallery);

				$galleryArray = array_map('trim', $galleryArray);
								
            @endphp

            @if (is_array($galleryArray))
                @foreach ($galleryArray as $image)
                   <img src="{{ $image }}" alt="" style="width:100px;">
                @endforeach
            @else
                <p>Gallery images available.</p>
            @endif
			
        <input id="inputTitle" type="file" name="images_gallery[]" multiple class="form-control">
	
        </div-->
		<input id="inputTitle" type="text" name="images_gallery" multiple class="form-control">
		
		 <div class="form-group">
          <label for="description" class="col-form-label">Description</label>
          <textarea class="form-control" id="description" name="description">{{$banner->description}}</textarea>
        </div>
   
        <div class="form-group">
          <label for="status" class="col-form-label">Status <span class="text-danger">*</span></label>
          <select name="status" class="form-control">
            <option value="active" {{(($banner->status=='active') ? 'selected' : '')}}>Active</option>
            <option value="inactive" {{(($banner->status=='inactive') ? 'selected' : '')}}>Inactive</option>
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
    //$('#lfm').filemanager('image');

    $(document).ready(function() {
    $('#description').summernote({
      placeholder: "Write short description.....",
        tabsize: 2,
        height: 150
    });
    });
</script>
@endpush