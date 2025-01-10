@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Update Mailchimp Api</h5>
    <div class="card-body">
      <form method="post" action="{{route('mailchimp.update',$mailchimp_edit->id)}}" enctype="multipart/form-data">
        @csrf 
        @method('PATCH')


        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Mailchimp Api Key</label>
          <input id="inputTitle" type="text" name="mailchimp_api_key" placeholder="Enter title"  value="{{$mailchimp_edit->mailchimp_api_key}}" class="form-control">
          @error('title')
          <span class="text-danger">{{$message}}</span>
          @enderror
		  <p>The API key for connecting with your Mailchimp account. <a href="https://admin.mailchimp.com/account/api" target="_blank">Get your API key here.</a></p>
        </div>
		
        <div class="form-group">
          <label for="status" class="col-form-label">Status <span class="text-danger">*</span></label>
          <select name="status" class="form-control">
            <option value="active" {{(($mailchimp_edit->status=='active')? 'selected' : '')}}>Publish</option>
            <option value="inactive" {{(($mailchimp_edit->status=='inactive')? 'selected' : '')}}>Draft</option>
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

@endpush