@extends('backend.layouts.master')

@section('main-content')

 <div class="card shadow mb-4">
     <div class="row">
         <div class="col-md-12">
            @include('backend.layouts.notification')
         </div>
     </div>
	 
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary float-left">Media Library ( {{ count($media)}} )</h6>
	   <a id="add_new_file_images" class="btn btn-primary btn-sm float-left" data-toggle="tooltip" data-placement="bottom" title=" Add New File Media"> Add New File Media</a>
		<div class="custom-search float-right">
		 <form action="{{ route('media.index') }}" method="get">
			<label>Search:</label>
			<input type="search" name="s" value="{{ request('s') }}">
		 </form>
		</div>
    </div>
	
	 @if ($errors->any())
	<div class="alert alert-danger">
		<ul>
			@foreach ($errors->all() as $error)
				<li>{{ $error }}</li>
			@endforeach
		</ul>
	</div>
	@endif

	 <div class="upload_images-to-add" style="display:none;">
	 <label>File Upload:</label>
	   <form action="{{ route('media.upload') }}" method="post" enctype="multipart/form-data">
        @csrf
        <input type="file" name="files[]" multiple>
        <button type="submit">Upload</button>
    </form>
	 </div>


	
	
    <div class="card-body">
    <ul class="custom-media-images">
        @foreach ($media as $file)
            <li>
				<img src="{{ $file->file_url }}" title="{{ $file->filename }}" onclick="showFileInfo('{{ $file->filename }}', '{{ $file->file_url }}', '{{ $file->file_type }}')">
				<form action="{{ route('media.destroy', $file->id) }}" method="post">
                    @csrf
                    @method('DELETE')
                    <button class="btn btn-danger btn-sm" type="submit" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </form>
				
            </li>
        @endforeach
    </ul>
    </div>
</div>

@endsection

@push('styles')
  <link href="{{asset('backend/vendor/datatables/dataTables.bootstrap4.min.css')}}" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css" />
  <style>
	ul.custom-media-images img {
		height: 125px;
		width: 170px;
		margin: 0px 8px;
	}
	ul.custom-media-images {
		display: flex;
		gap: 30px;
		margin: 10px 0;
		padding-top: 30px;
	}
	ul.custom-media-images li {
		list-style: none;
		display: flex;
		align-items: start;
		justify-content: center;
	}
	
	.swal-icon.swal-icon--custom img {
		height: 240px;
		width: 365px;
		object-fit: cover;
	}
	
	a#add_new_file_images {
    color: #fff !important;
    margin-left: 20px;
    }
  </style>
@endpush

@push('scripts')

  <!-- Page level plugins -->

  <script src="{{asset('backend/vendor/datatables/dataTables.bootstrap4.min.js')}}"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>
<script>

	$(document).ready(function() {
	  $('#add_new_file_images').click(function() {
		$('.upload_images-to-add').toggle(); // Toggle visibility of the upload form
	  });
	});

    function showFileInfo(filename, fileurl, filetype) {
		
	    var dialogContent = document.createElement('div');
            // Set innerHTML with file information
        dialogContent.innerHTML = `
			<p><b>File Name</b>: ${filename}</p>
			<p><b>File Type</b>: ${filetype}</p>
			<p><b>File Url</b>: ${fileurl}</p>
			<button id="copyUrlBtn" class="btn btn-secondary">Copy File URL</button>
          `;

        swal({
            title: "File information",
			content: dialogContent,
            icon: fileurl ? fileurl : "info",
            buttons: {
                confirm: {
                    text: "Close",
                    value: true,
                    visible: true,
                    className: "btn btn-primary",
                    closeModal: true
                }
            },
        });
		
		 // Add click event listener to the copy URL button
        dialogContent.querySelector('#copyUrlBtn').addEventListener('click', function() {
            copyToClipboard(fileurl);
            swal("Copied!", "URL has been copied to clipboard.", "success");
        });
    }
	
	    // Function to copy text to clipboard
    function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }
</script>
@endpush