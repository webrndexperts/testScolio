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
    <h5 class="card-header">Add Header Main title </h5>
    <div class="card-body">
      <form method="post" action="{{route('header-main-title.store')}}">
        {{csrf_field()}}
		<input type="hidden" name="header_type"  value="Header-Main-title" class="form-control">
	
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
        
      </div>
      </div>
   </div>


 @endforeach

        <div class="form-group">
          <label for="status" class="col-form-label">Status</label>
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
@endsection
