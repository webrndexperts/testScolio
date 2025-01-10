@extends('backend.layouts.master')
@section('title','E-SHOP || Language Edit')
@section('main-content')

<div class="card">
    <h5 class="card-header">Edit Language</h5>
    <div class="card-body">
      <form method="post" action="{{route('language.update',$language->id)}}" enctype="multipart/form-data">
        @csrf 
        @method('PATCH')
        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Title <span class="text-danger">*</span></label>
        <input id="inputTitle" type="text" name="name" placeholder="Enter title"  value="{{$language->name}}" class="form-control">
        @error('title')
        <span class="text-danger">{{$message}}</span>
        @enderror
        </div>  
        
        
        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Code <span class="text-danger">*</span></label>
        <input id="inputCode" type="text" name="code" placeholder="Enter Code"  value="{{$language->code}}" class="form-control">
        @error('code')
        <span class="text-danger">{{$message}}</span>
        @enderror
        </div>

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Icon <span class="text-danger">*</span></label>
          <img src="{{ $language->icon }}" style="max-width:80px">
        <input id="inputTitle" type="file" name="image" placeholder="Enter icon" class="form-control">
        @error('icon')
        <span class="text-danger">{{$message}}</span>
        @enderror
        </div>

        <div class="form-group">
          <label for="status" class="col-form-label">Status <span class="text-danger">*</span></label>
          <select name="status" class="form-control">
            <option value="active" {{(($language->status=='active') ? 'selected' : '')}}>Active</option>
            <option value="inactive" {{(($language->status=='inactive') ? 'selected' : '')}}>Inactive</option>
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
    $('#lfm').filemanager('image');

    $(document).ready(function() {
    $('#description').summernote({
      placeholder: "Write short description.....",
        tabsize: 2,
        height: 150
    });
    });
</script>
@endpush