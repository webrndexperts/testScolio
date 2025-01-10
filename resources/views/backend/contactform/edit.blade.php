@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">View Contact Form
	<a href="{{route('contact-form.index',['lang' => $post->lang])}}" class="btn btn-primary btn-sm float-right" title="Back"><i class="fas fa-arrow-left"></i> Back</a>
	</h5>
    <div class="card-body">
      <form method="post" action="{{route('homepage-benifits.update',$post->id)}}" enctype="multipart/form-data">
        @csrf 
        @method('PATCH')

        <div class="form-group">
          <label class="col-form-label">Language</label>
          <input type="text"  value="{{$post->lang}}" class="form-control" readonly>
        </div>
	 
	    <div class="form-group">
          <label class="col-form-label">Contactform Type</label>
          <input type="text" value="{{$post->form_type}}" class="form-control" readonly>
        </div>
	
		
	   <div class="form-group">
          <label class="col-form-label">Contact Enquiry</label>
          <input type="text" value="{{$post->contact_enquiry}}" class="form-control" readonly>
        </div>
		
		 <div class="form-group">
          <label for="inputTitle" class="col-form-label">Name</label>
          <input id="inputTitle" type="text" value="{{$post->name}}" class="form-control" readonly>
        </div>

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Email Address</label>
          <input id="inputTitle" type="text" value="{{$post->email_address}}" class="form-control" readonly>
        </div>
		
		<div class="form-group">
          <label for="inputTitle" class="col-form-label">Phone Number</label>
          <input id="inputTitle" type="text" value="{{$post->phone_number}}" class="form-control" readonly>
        </div>
		
		<div class="form-group">
          <label for="inputTitle" class="col-form-label">Country</label>
          <input id="inputTitle" type="text" value="{{$post->country}}" class="form-control" readonly>
        </div>
		
        <div class="form-group">
          <label for="description" class="col-form-label">Message</label>
          <textarea class="form-control" readonly>{{$post->description}}</textarea>
        </div>

       @if($post->photo)
		<div class="form-group">
			<label for="inputTitle" class="col-form-label">Image</label>
			@foreach(json_decode($post->photo) as $imageUrl)
				<img src="{{ $imageUrl }}" alt="{{ basename($imageUrl) }}" style="max-width: 110px;">
			@endforeach
		</div>
	   @endif

		
		
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