@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Edit Page</h5>
    <div class="card-body">
      <form method="post" action="{{route('header-menu.update',$post->id)}}" enctype="multipart/form-data">
        @csrf 
        @method('PATCH')

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Language</label>
          <input id="inputTitle" type="text"  value="{{$post->lang}}" class="form-control" readonly>
        </div>

        <div class="form-group">
			  <label for="header_menu_title">header Menu title</label>
			  <select name="header_menu_title" class="form-control">
				  <option value="">--Select any one--</option>
				  @foreach($header_main_title as $key=>$data)
					  <option value='{{$data->id}}' {{(($data->id==$post->header_main_title)? 'selected' : '')}}>{{$data->title}}</option>
				  @endforeach
			  </select>
			</div>

     <div class="form-group">
			  <label for="header_menu_title">header Sub Menu</label>
			  <select name="header_sub_menu" class="form-control">
				  <option value="">--Select any one--</option>
				  @foreach($header_sub_menu as $key=>$data)
					  <option value='{{$data->id}}' {{(($data->id==$post->header_sub_menu)? 'selected' : '')}}>{{$data->title}}</option>
				  @endforeach
			  </select>
		</div>	

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Title <span class="text-danger">*</span></label>
          <input id="inputTitle" type="text" name="title" placeholder="Enter title"  value="{{$post->title}}" class="form-control">
          @error('title')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>

       

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Image</label>
        <img src="{{$post->photo}}" alt="{{$post->photo}}">
        <input id="inputTitle" type="file" name="photo" class="form-control">
        </div>
		
		 <div class="form-group">
          <label for="inputTitle" class="col-form-label">Page Slug <span class="text-danger">*</span></label>
          <input id="inputTitle" type="text" name="page_slug" placeholder="Enter title"  value="{{$post->slug}}" class="form-control">
          @error('page_slug')
          <span class="text-danger">{{$message}}</span>
          @enderror
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
    $('#lfm').filemanager('image');

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
</script>
@endpush