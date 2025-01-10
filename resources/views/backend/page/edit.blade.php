@extends('backend.layouts.master')

@section('main-content')

<style>
.main-seo-setting {
    border: 1px solid #5555;
    padding: 20px;
</style>

<div class="card">
    <h5 class="card-header">Edit Page</h5>
    <div class="card-body">
      <form method="post" action="{{route('page.update',$post->id)}}" enctype="multipart/form-data">
        @csrf 
        @method('PATCH')

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Language</label>
          <input id="inputTitle" type="text" name="page_lang" value="{{$post->lang}}" class="form-control" readonly>
        </div>

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Title</label>
          <input id="inputTitle" type="text" name="title" placeholder="Enter title"  value="{{$post->title}}" class="form-control">
          @error('title')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>

        <div class="form-group" style="display:none;">
          <label for="excerpt" class="col-form-label">Excerpt</label>
          <textarea class="form-control" id="excerpt" name="excerpt">{{$post->summary}}</textarea>
          @error('excerpt')
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
          <label for="inputTitle" class="col-form-label">Featured Image</label>
        <img src="{{$post->photo}}" alt="{{$post->photo}}" style="width:80px;">
		  <input id="inputTitle" type="text" name="photo" value="{{$post->photo}}"  class="form-control" >
        <input id="inputTitle" type="file" name="photo" class="form-control" style="display:none;">
        </div>

       <div class="form-group">
          <label for="inputTitle" class="col-form-label">Featured Video Url: </label>
          <input id="inputTitle" type="text" name="video_url" value="{{$post->video_url}}"  class="form-control">
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
			  <label for="inputTitle" class="col-form-label">Meta Keywords</label>
			  <input type="text" name="seo_meta_tag" value="{{$post->seo_meta_tag}}"  class="form-control">
			</div> 
       </div>

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Page Slug</label>
          <input id="inputTitle" type="text" name="page_slug"  value="{{$post->slug}}" class="form-control">
          @error('page_slug')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div> 

        <div class="form-group">
          <label for="added_by">Author</label>
          <select name="added_by" class="form-control">
              <option value="">--Select any one--</option>
              @foreach($users as $key=>$data)
                <option value='{{$data->id}}' {{(($post->added_by==$data->id)? 'selected' : '')}}>{{$data->name}}</option>
              @endforeach
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
 //   $('#lfm').filemanager('image');

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
          height: 150,
		  
      });
    });
	
	
	
</script>
@endpush