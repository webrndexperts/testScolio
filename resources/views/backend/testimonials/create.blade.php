@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Add Testimonials</h5>
    <div class="card-body">
      <form method="post" action="{{route('testimonials.store')}}" enctype="multipart/form-data">
        {{csrf_field()}}


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
          <label for="post_cat_id">Category</label>
          <select name="post[{{ $code }}][post_cat_id]" class="form-control">
              <option value="">--Select any category--</option>
              @foreach($categories as $key=>$data)
                  <option value='{{$data->id}}'>{{$data->title}}</option>
              @endforeach
          </select>
        </div>

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Image</label>
        <input id="inputTitle" type="file" name="post[{{ $code }}][image]" class="form-control">
        </div>
                
        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Video Url</label>
        <input id="inputTitle" type="text" name="post[{{ $code }}][video_url]" placeholder="Enter Video Url"  class="form-control">
        </div>
        
        <div class="form-group">
          <label for="description" class="col-form-label">Description</label>
          <textarea class="form-control description" id="description_{{ $code }}" name="post[{{ $code }}][description]">{{old('description')}}</textarea>
        </div>  
        
        <div class="form-group">
          <label for="excerpt" class="col-form-label">Excerpt</label>
          <textarea class="form-control summary" id="summary_{{ $code }}" name="post[{{ $code }}][summary]">{{old('summary')}}</textarea>
        </div>
		
		<div class="main-seo-setting">
			<h4> SEO Setting: </h4>
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
              $('.summary').summernote({
                  tabsize: 2,
                  height: 100
              });
            });

            $(document).ready(function() {
              $('.description').summernote({
                  tabsize: 2,
                  height: 150
              });
            });
            // $('select').selectpicker();

          </script>
    @endpush


 @endforeach

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Client Name</label>
          <input id="inputTitle" type="text" name="client_name" placeholder="Enter Client Name"  class="form-control">
          @error('client_name')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div> 

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Client Email</label>
          <input id="inputTitle" type="text" name="client_email" placeholder="Enter Client Email"  class="form-control">
          @error('client_email')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div> 

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Company Name</label>
          <input id="inputTitle" type="text" name="company_name" placeholder="Enter Company Name"  class="form-control">
          @error('company_name')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div> 

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Company Website</label>
          <input id="inputTitle" type="text" name="company_website" placeholder="Enter Company Website"  class="form-control">
          @error('company_website')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div> 

        <div class="form-group" style="display:none">
          <label for="inputTitle" class="col-form-label">Url customize</label>
          <input id="inputTitle" type="text" name="page_slug" placeholder="Enter Url customize"  class="form-control">
          @error('page_slug')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div> 

        <div class="form-group" style="display:none;">
          <label for="added_by">Author</label>
          <select name="added_by" class="form-control">
              <option value="">--Select any one--</option>
              @foreach($users as $key=>$data)
                <option value='{{$data->id}}' {{($key==0) ? 'selected' : ''}}>{{$data->name}}</option>
            @endforeach
          </select>
        </div>

        
        <div class="form-group">
          <label for="status" class="col-form-label">Status </label>
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

<script>
    $('#lfm').filemanager('image');

    $(document).ready(function() {
      $('#quote').summernote({
        placeholder: "Write detail Quote.....",
          tabsize: 2,
          height: 100
      });
    });
    // $('select').selectpicker();

</script>

@endpush