@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Add Google Reviews <span><a href="{{route('google-reviews.index');}}" class="btn btn-primary" style="float:right;">Back</a></span></h5>
    <div class="card-body">
      <form method="post" action="{{route('google-reviews.store')}}" enctype="multipart/form-data">
        {{csrf_field()}}
        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Full Name</label>
          <input id="inputTitle" type="text" name="name"  value="{{old('name')}}" class="form-control">
          @error('name')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>

        <div class="form-group">
          <label for="description" class="col-form-label">Description</label>
          <textarea class="form-control description" id="description" name="description">{{old('description')}}</textarea>
        </div>  
		
        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Image</label>
        <input id="inputTitle" type="file" name="image" class="form-control">
        </div>               
			 
        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Rating</label>
          <input id="inputTitle" type="text" name="rating"  value="{{old('rating')}}" class="form-control">
         
        </div>


        <div class="form-group">
          <label for="post_cat_id">Language</label>
          <select name="lang" class="form-control">
              <option value="">--Select any Language--</option>
              @foreach ($languages as $code => $language)
                  <option value='{{$language->code}}'>{{ $language->name }}</option>
              @endforeach
          </select>
        </div>

        <div class="form-group">
          <label for="description" class="col-form-label">Publish Date</label>
		   <input id="inputTitle" type="date" name="publish_date" class="form-control">
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
        <script src="{{asset('backend/summernote/summernote.min.js')}}"></script>
        <script>
            $(document).ready(function() {
              $('.description').summernote({
                  tabsize: 2,
                  height: 150
              });
            });
            // $('select').selectpicker();

          </script>
    @endpush
