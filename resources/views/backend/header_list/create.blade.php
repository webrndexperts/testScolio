@extends('backend.layouts.master')

@section('main-content')
<style>
 .accordion-single  {
  border-bottom: 1px solid #efefef;
  margin-top: 10px;
}

.accordion-single-title {
  border-top: 1px solid #efefef;
  padding: 20px;
  cursor: pointer;
  position: relative;
  font-size: 20px;
  margin: 0;
}

.accordion-single-title::after{
  content: "";
  position: absolute;
  right: 25px;
  top: 50%;
  transition: all 0.2s ease-in-out;
  display: block;
  width: 8px;
  height: 8px;
  border-top: solid 2px #999;
  border-right: solid 2px #999;
  transform: translateY(-50%) rotate(135deg);
}

.accordion-single-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height .3s ease-in-out;
}

.accordion-single-content p {
  padding: 20px;
}

.accordion-single-item.is-open .accordion-single-content  {
  max-height: fit-content;
}

.accordion-single-item.is-open .accordion-single-title::after  {
  transform: translateY(-50%) rotate(315deg);
}

</style>
<div class="card">
    <h5 class="card-header">Add Header Menu</h5>
    <div class="card-body">
      <form method="post" action="{{route('header-menu.store')}}" enctype="multipart/form-data">
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
			  <label for="header_menu_title">header Menu title</label>
			  <select name="post[{{ $code }}][header_main_menutitle]" class="form-control">
				  <option value="">--Select any one--</option>
				  @foreach($header_main_title as $key=>$data)
					  <option value='{{$data->id}}'>{{$data->title}}</option>
				  @endforeach
			  </select>
			</div>

     <div class="form-group">
			  <label for="header_sub_menu">header Sub Menu</label>
			  <select name="post[{{ $code }}][header_sub_menu_title]" class="form-control">
				  <option value="">--Select any one--</option>
				  @foreach($header_sub_menu as $key=>$data)
					  <option value='{{$data->id}}'>{{$data->title}}</option>
				  @endforeach
			  </select>
		</div>	



        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Title</label>
          <input id="inputTitle" type="text" name="post[{{ $code }}][title]" placeholder="Enter title"  class="form-control">
        </div> 
		
				
	  

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Image</label>
        <input id="inputImage" type="file" name="post[{{ $code }}][image]" class="form-control">
        </div>
		
        
      </div>
      </div>
   </div>


 @endforeach

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Url customize</label>
          <input id="inputTitle" type="text" name="page_slug" placeholder="Enter Url customize"  class="form-control">
        </div> 

        
        <div class="form-group">
          <label for="status" class="col-form-label">Status</label>
          <select name="status" class="form-control">
              <option value="active">Publish</option>
              <option value="inactive">Draft</option>
          </select>
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
<script>
  const accSingleTriggers = document.querySelectorAll('.js-acc-single-trigger');

accSingleTriggers.forEach(trigger => trigger.addEventListener('click', toggleAccordion));

function toggleAccordion() {
  const items = document.querySelectorAll('.js-acc-item');
  const thisItem = this.parentNode;

  items.forEach(item => {
    if (thisItem == item) {
      thisItem.classList.toggle('is-open');
      return;
    }
    item.classList.remove('is-open');
  });
}



</script>
@endpush