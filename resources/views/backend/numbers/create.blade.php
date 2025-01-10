@extends('backend.layouts.master')

@section('main-content')

<style>
  .Length {
    column-count: 3;
  }

  table th,
  table td {
    width: 100px;
    padding: 5px;
    border: 1px solid #ccc;
  }

  .selected {
    background-color: #666;
    color: #fff;
  }

  tr.empty-row.screen-reader-text {
    display: none;
  }

  .file_input::-webkit-file-upload-button {
    visibility: hidden;
  }

  .file_input::before {
    content: 'Upload Images';
    display: inline-block;
    background: linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
  }

  .file_input video_link::-webkit-file-upload-button {
    visibility: hidden;
  }

  .file_input video_link::before {
    content: 'Upload Video';
    display: inline-block;
    background: linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
  }
</style>

<div class="card">
  <h5 class="card-header">Add Number</h5>
  <div class="card-body">
    <form method="post" action="{{route('numbers.store')}}" id="number_form" enctype="multipart/form-data">
      @csrf
      @foreach ($languages as $code => $language)
      <div class="accordion-single js-acc-single">
        <div class="accordion-single-item js-acc-item">
          <h2 class="accordion-single-title js-acc-single-trigger">{{ $language->name }} <img
              src="{{ $language->icon }}"></h2>
          <div class="accordion-single-content">
            <div class="form-group">
              <label for="whatsapp_number" class="col-form-label">Whatsapp Number <span
                  class="text-danger">*</span></label>
              <input id="whatsapp_number"
                value="{{ $language->contactData ? $language->contactData->whatsapp_number : '' }}" type="text"
                name="post[{{ $language->code }}][whatsapp_number]" placeholder="Enter Whatsapp Number"
                class="form-control">
              @error('title')
              <span class="text-danger">{{$message}}</span>
              @enderror
            </div>

            <div class="form-group">
              <label for="phone_number" class="col-form-label">Phone Numbers</label>
              <input class="form-control phone_number" id="phone_number_{{ $code }}" multiple
                name="post[{{ $language->code }}][phone_number]"
                value="{{ $language->contactData ? $language->contactData->phone_number : '' }}" />
            </div>
            <div class="form-group">
              <label for="email" class="col-form-label">Email</label>
              <input type="email" class="form-control" id="email_{{ $code }}" name="post[{{ $language->code }}][email]"
                value="{{ $language->contactData ? $language->contactData->email : '' }}" />
            </div>

            <div class="form-group">
              <label for="address" class="col-form-label">Address</label>
              <textarea class="form-control address" id="address_{{ $code }}"
                name="post[{{ $language->code }}][address]">{{ $language->contactData ? $language->contactData->address : '' }}</textarea>
            </div>
            <div class="form-group">
              <label for="address_href" class="col-form-label">Address Href</label>
              <input class="form-control address_href" id="address_href_{{ $code }}"
                name="post[{{ $language->code }}][address_href]"  value="{{ $language->contactData ? $language->contactData->address_href : '' }}"/>
            </div>
            <div class="form-group">
              <label for="gtag" class="col-form-label">Google Tag Id</label>
              <input class="form-control gtag" id="gtag_{{ $code }}"
                name="post[{{ $language->code }}][gtag]"  value="{{ $language->contactData ? $language->contactData->gtag : '' }}"/>
            </div>
          </div>
        </div>
      </div>
      @endforeach
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

  // Change 'dropdown' to the actual ID of your dropdown
  $(document).ready(function () {
    $('.address').summernote();

   
    $('.phone_number').on('change, keyup', function () {
      var currentInput = $(this).val();
      var fixedInput = currentInput.replace(/[A-Za-z!@#$%^&*]/g, '');
      $(this).val(fixedInput);
      console.log(fixedInput);
    });
  });


</script>
@endpush