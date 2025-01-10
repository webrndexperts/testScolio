@extends('backend.layouts.master')

@section('main-content')
<style>
.main-seo-setting {
    border: 1px solid #5555;
    padding: 20px;
}
.main-variable-product {
    border: 1px solid #5555;
    padding: 20px;
}
</style>
<div class="card">
    <h5 class="card-header">Edit Product</h5>
    <div class="card-body">
      <form method="post" action="{{route('product.update',$product->id)}}" enctype="multipart/form-data">
        @csrf 
        @method('PATCH')
		
		<div class="form-group">
          <label for="inputTitle" class="col-form-label">Product Language</label>
          <input id="inputTitle" type="text" name="title"  value="{{$product->lang}}" readonly class="form-control">
        </div>
		
        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Title</label>
          <input id="inputTitle" type="text" name="title" value="{{$product->title}}" class="form-control">
        </div>

        <div class="form-group">
          <label for="summary" class="col-form-label">Main content </label>
          <textarea class="form-control" id="summary" name="summary">{{$product->summary}}</textarea>
        </div>

        <div class="form-group">
          <label for="description" class="col-form-label">Description</label>
          <textarea class="form-control" id="description" name="description">{{$product->description}}</textarea>
        </div>


        <div class="form-group" style="display:none;">
          <label for="is_featured">Is Featured</label><br>
          <input type="checkbox" name='is_featured' id='is_featured' value='{{$product->is_featured}}' {{(($product->is_featured) ? 'checked' : '')}}> Yes                        
        </div>
              {{-- {{$categories}} --}}

        <div class="form-group">
          <label for="cat_id">Category </label>
          <select name="cat_id" id="cat_id" class="form-control">
              <option value="">--Select any category--</option>
              @foreach($categories as $key=>$cat_data)
                  <option value='{{$cat_data->id}}' {{(($product->cat_id==$cat_data->id)? 'selected' : '')}}>{{$cat_data->title}}</option>
              @endforeach
          </select>
        </div>
        @php 
          $sub_cat_info=DB::table('categories')->select('title')->where('id',$product->child_cat_id)->get();
        // dd($sub_cat_info);

        @endphp
		
		<div class="form-group">
          <label for="cat_id">Product Type</label>
          <select id="dropdown" name="product_type" id="product_type" class="form-control">
              <option value="">--Select any type--</option>
                  <option value="simple-product" {{(($product->product_type=='simple-product')? 'selected' : '')}}>Simple Product</option>
                  <option value="variable-product" {{(($product->product_type=='variable-product')? 'selected' : '')}}>Variable Product</option>

          </select>
        </div>
		
		@php
		  $attr = [];
		  
		  $get_variable_data = $get_multi_attr;

		@endphp
        <div class="form-group" id="hiddenField" style="display: none;">
		@if($get_variable_data)
		<div class="main-variable-product">
			<h4> Varitions: </h4>
		  @if (is_array($get_variable_data) || is_object($get_variable_data))
		 	<span>Language</span>
		    @foreach ($get_variable_data as $key => $value)
			
			<select name="attr[{{$value->id}}][]"  class="form-control child_attr_id" multiple data-live-search="true">
					<option value="{{$value->id}}" {{(($value->title)? 'selected':'')}}>{{$value->title}}</option>
			</select>

		@push('styles')
			<link rel="stylesheet" href="{{asset('backend/summernote/summernote.min.css')}}">
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css" />
		@endpush 
		@push('scripts')
			<script src="/vendor/laravel-filemanager/js/stand-alone-button.js"></script>
			<script src="{{asset('backend/summernote/summernote.min.js')}}"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
			
			<script>
			jQuery('.child_attr_id').selectpicker();
			</script>
		@endpush
			 
		  @endforeach
			@endif
        </div>
	   
	   @else

		<div class="main-variable-product">
			<h4> Varitions: </h4>
		  @foreach($productattributes as $key=>$cat_data)
		 
		@php
		   $sub_cat_info= DB::table('product_attributes')->select('title','id')->where('parent_id',$cat_data->id)->get();
		  @endphp
		    <span>{{$cat_data->title}}</span>
          <select name="attr[{{ $cat_data->id }}][]" class="form-control child_attr_id" multiple data-live-search="true">
			 @foreach($sub_cat_info as $key=>$sub_cat_data)

                  <option value='{{$sub_cat_data->id}}'>{{$sub_cat_data->title}}</option>
              @endforeach
          </select>
		@push('styles')
			<link rel="stylesheet" href="{{asset('backend/summernote/summernote.min.css')}}">
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css" />
		@endpush 
		@push('scripts')
			<script src="/vendor/laravel-filemanager/js/stand-alone-button.js"></script>
			<script src="{{asset('backend/summernote/summernote.min.js')}}"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
			
			<script>
			jQuery('.child_attr_id').selectpicker();
			</script>
		@endpush
			 
		    @endforeach
        </div>
	 @endif
        </div>

		<div class="main-seo-setting">
			<h4> Shipping </h4>
			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Product Weight (g)text</label>
			  <input type="text" name="product_actual_weight" value="{{$product->product_actual_weight}}" class="form-control">
			  <div class="tooltip">Hover over me
			  <span class="tooltiptext">Tooltip text</span>
			  </div>
			</div> 
            <h5> Dimensions (cm) </h5>
			<div class="Length">
			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Length</label>
			  <input type="text" name="dimension_length" value="{{$product->dimension_length}}" class="form-control">
			</div> 
			
			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Weight</label>
			  <input type="text" name="dimension_weight" value="{{$product->dimension_weight}}" class="form-control">
			</div> 
			 <div class="form-group">
			  <label for="inputTitle" class="col-form-label">Height</label>
			  <input type="text" name="dimension_height" value="{{$product->dimension_height}}" class="form-control">
			</div> 
       </div>
		</div>

        <div class="form-group">
          <label for="price" class="col-form-label">Price($)</label>
          <input id="price" type="text" name="price"  value="{{$product->price}}" class="form-control">
        </div>

        <div class="form-group" style="display:none;">
          <label for="discount" class="col-form-label">Discount(%)</label>
          <input id="discount" type="number" name="discount" min="0" max="100" value="{{$product->discount}}" class="form-control">
          
        </div>

        <div class="form-group" style="display:none;">
          <label for="stock">Quantity </label>
          <input id="quantity" type="number" name="stock" min="0" value="{{$product->stock}}" class="form-control">
         
        </div>
        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Featured Image</label>
		  <?php if(!empty($product->photo)){ ?>
			  
        <img src="{{ $product->photo }}" alt="{{$product->photo}}" style="width:80px;">
		  <?php }?>
        <input id="inputTitle" type="file" name="photo" class="form-control">

        </div>
        
		 <div class="form-group">
          <label for="inputTitle" class="col-form-label">Product Gallery</label>
		  @php
                $gallery = $product->product_gallery;
				
				$galleryArray = explode(',', $gallery);

				$galleryArray = array_map('trim', $galleryArray);
								
            @endphp

            @if (is_array($galleryArray))
                @foreach ($galleryArray as $image)
                   <img src="{{ $image }}" alt="" style="width:100px;">
                @endforeach
            @else
                <p>No Gallery images available for this product.</p>
            @endif
			
        <input id="inputTitle" type="file" name="product_gallery[]" multiple class="form-control">
	
        </div>
		
		<div class="form-group">
          <label for="inputTitle" class="col-form-label">Product SKU</label>
          <input id="inputTitle" type="text" name="product_sku" value="{{$product->product_sku}}" class="form-control">
        </div>
		
		<div class="form-group">
          <label for="inputTitle" class="col-form-label">Product Amazon Link </label>
          <input id="inputTitle" type="text" name="amazon_link" value="{{$product->amazon_link}}" class="form-control">
        </div>
		
		<div class="form-group">
          <label for="inputTitle" class="col-form-label">Product Amazon Image Url </label>
          <input id="inputTitle" type="url" name="amazon_image_link" value="{{$product->amazon_image_link}}" class="form-control">
        </div>
		
		
		<div class="form-group">
	    <label for="inputTitle" class="col-form-label">Featured Video Url</label>
	    <input type="text" name="featured_video_url" value="{{$product->featured_video_url}}"  class="form-control">
	   </div> 

		
		<div class="main-seo-setting">
			<h4> SEO Setting: </h4>
			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Meta Title</label>
			  <input type="text" name="seo_meta_title" value="{{$product->seo_meta_title}}"  class="form-control">
			</div> 

			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Meta Description</label>
			  <input type="text" name="seo_meta_description" value="{{$product->seo_meta_description}}"  class="form-control">
			</div> 
			
			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Meta Keywords</label>
			  <input type="text" name="seo_meta_tag" value="{{$product->seo_meta_tag}}"  class="form-control">
			</div> 
       </div>


		
		<div class="form-group">
          <label for="inputTitle" class="col-form-label">Product Slug</label>
          <input id="inputTitle" type="text" name="page_slug" value="{{$product->slug}}" class="form-control">
        </div>
		
		
        <div class="form-group">
          <label for="status" class="col-form-label">Status </label>
          <select name="status" class="form-control">
            <option value="active" {{(($product->status=='active')? 'selected' : '')}}>Publish</option>
            <option value="inactive" {{(($product->status=='inactive')? 'selected' : '')}}>Draft</option>
        </select>
        
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

<script>
   // $('#lfm').filemanager('image');

    $(document).ready(function() {
    $('#summary').summernote({
      placeholder: "Write short description.....",
        tabsize: 2,
        height: 150
    });
    });
    $(document).ready(function() {
      $('#description').summernote({
        placeholder: "Write detail Description.....",
          tabsize: 2,
          height: 150
      });
    });
	
	  
  $(document).ready(function () {
	  $('#hiddenField').show();
		// Change 'dropdown' to the actual ID of your dropdown
		$('#dropdown').change(function () {
			// Change 'option1' and 'option2' to the values you want to trigger show/hide
   if ($(this).val() == 'variable-product') {
		$('#hiddenField').show();
	} else {
		// Hide both fields if none of the options are selected
		$('#hiddenField').hide();
	}
		});
	});
</script>

@endpush