@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Add Accordions</h5>
    <div class="card-body">
      <form method="post" action="{{route('accordions.store')}}" enctype="multipart/form-data">
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
          <label for="post_cat_id">Pages Type</label>
          <select name="post[{{ $code }}][post_cat_id]" class="form-control">
              <option value="">--Select Pages Type--</option>
              @foreach($categories as $key=>$data)
                  <option value='{{$data->id}}'>{{$data->title}}</option>
              @endforeach
          </select>
        </div>

        <div class="form-group">
          <label for="description" class="col-form-label">Description</label>
          <textarea class="form-control description" id="description_{{ $code }}" name="post[{{ $code }}][description]">{{old('description')}}</textarea>
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
              $('.description').summernote({
                  tabsize: 2,
                  height: 150
              });
            });
            // $('select').selectpicker();

          </script>
    @endpush


 @endforeach

        <div class="form-group" style="display:none;">
          <label for="inputTitle" class="col-form-label" >Url customize<span class="text-danger">*</span></label>
          <input id="inputTitle" type="text" name="page_slug" placeholder="Enter Url customize"  class="form-control">
          @error('page_slug')
          <span class="text-danger">{{$message}}</span>
          @enderror
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