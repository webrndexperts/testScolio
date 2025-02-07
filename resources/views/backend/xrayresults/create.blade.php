@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Add Case Studies</h5>
    <div class="card-body">
      @if ($errors->any())
                <div class="alert alert-danger alert-dismissable fade show">
                    <button class="close" data-dismiss="alert" aria-label="Close">×</button>
                    @foreach ($errors->all() as $error)
                        <span class="text-danger">{{ $error }}</span>
                    @endforeach
                </div>
            @endif
      <form method="post" action="{{route('xrayresults.store')}}" enctype="multipart/form-data">
        {{csrf_field()}}


        @php
        $post = [];
        @endphp


<div class="accordion-single js-acc-single">
  <div class="accordion-single-item js-acc-item">
    <h2 class="accordion-single-title js-acc-single-trigger">English </h2>
    <div class="accordion-single-content">


        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Title <span class="text-danger">*</span></label>
          <input id="inputTitle" type="text" name="post[en_all][title]" value="{{ old('post.en_all.title') }}" placeholder="Enter title"  class="form-control">
          @error("post.en_all.title")
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div> 

        <div class="form-group">
          <label for="post_cat_id">Category</label>
          <select name="post[en_all][post_cat_id]" class="form-control">
              <option value="">--Select any category--</option>
              @foreach($categories as $key=>$data)
                  <option value='{{$data->id}}'>{{$data->title}}</option>
              @endforeach
          </select>
        </div>

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Image</label>
        <input id="inputTitle" type="file" name="post[en_all][image]" class="form-control">
        </div>               
			   
        
        <div class="form-group">
          <label for="description" class="col-form-label">Description</label>
          <textarea class="form-control description" id="description_en_all" name="post[en_all][description]">{{old('post.en_all.description')}}</textarea>
        </div>  
        
        <div class="form-group" style="display:none">
          <label for="excerpt" class="col-form-label">Excerpt</label>
          <textarea class="form-control excerpt" id="excerpt_en_all" name="post[en_all][excerpt]">{{old('post.en_all.excerpt')}}</textarea>
        </div>
		
		<div class="main-seo-setting">
			<h4> SEO Setting: </h4>
			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Meta Title</label>
			  <input type="text" name="post[en_all][seo_meta_title]" placeholder="Enter Meta Title"  class="form-control">
			</div> 

			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Meta Description</label>
			  <input type="text" name="post[en_all][seo_meta_description]" placeholder="Enter Meta Description"  class="form-control">
			</div> 
			
			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Meta Tag</label>
			  <input type="text" name="post[en_all][seo_meta_tag]" placeholder="Enter Meta Tag"  class="form-control">
			</div> 
       </div>
		
      </div>
      </div>
   </div>


  @foreach ($languages as $code => $language)
  @if(!str_starts_with($code, 'en_')) 
  <div class="accordion-single js-acc-single">
  <div class="accordion-single-item js-acc-item">
    <h2 class="accordion-single-title js-acc-single-trigger">{{ $language->name }} <img src="{{ $language->icon }}"></h2>
    <div class="accordion-single-content">


        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Title <span class="text-danger">*</span></label>
          <input id="inputTitle" type="text" name="post[{{ $code }}][title]" value="{{ old('post.'.$code.'.title') }}" placeholder="Enter title"  class="form-control">
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
          <label for="description" class="col-form-label">Description</label>
          <textarea class="form-control description" id="description_{{ $code }}" name="post[{{ $code }}][description]">{{old('description')}}</textarea>
        </div>  
        
        <div class="form-group" style="display:none">
          <label for="excerpt" class="col-form-label">Excerpt</label>
          <textarea class="form-control excerpt" id="excerpt_{{ $code }}" name="post[{{ $code }}][excerpt]">{{old('excerpt')}}</textarea>
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
			  <label for="inputTitle" class="col-form-label">Meta Tag</label>
			  <input type="text" name="post[{{ $code }}][seo_meta_tag]" placeholder="Enter Meta Tag"  class="form-control">
			</div> 
       </div>
		
      </div>
      </div>
   </div>
   @endif
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
                  height: 150
              });
            });
            // $('select').selectpicker();

          </script>
    @endpush


 @endforeach


        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Age</label>
          <input  type="number" name="age" class="form-control">
        </div> 

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Curve Degree</label>
          <input  type="number" name="curve_degree" class="form-control">
        </div> 

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Case Number</label>
          <input  type="text" name="case_number" placeholder="Enter Case Number"  class="form-control">
        </div> 

       <div class="form-group">
          <label for="inputTitle" class="col-form-label">Video Url</label>
        <input id="inputTitle" type="text" name="video_url" placeholder="Enter Video Url"  class="form-control">
        </div>

        
        <div class="form-group">
          <label for="status" class="col-form-label">Status <span class="text-danger">*</span></label>
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