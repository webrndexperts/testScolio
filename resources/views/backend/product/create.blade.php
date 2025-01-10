@extends('backend.layouts.master')

@section('main-content')

<style>
.Length {
    column-count: 3;
}
table th, table td
    {
        width: 100px;
        padding: 5px;
        border: 1px solid #ccc;
    }
    .selected
    {
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
    <h5 class="card-header">Add Product</h5>
    <div class="card-body">
      <form method="post" action="{{route('product.store')}}" enctype="multipart/form-data">
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
          <label for="main_content" class="col-form-label">Main Content</label>
          <textarea class="form-control main_content" id="main_content_{{ $code }}" name="post[{{ $code }}][main_content]">{{old('main_content')}}</textarea>
        </div>
   
        <div class="form-group">
          <label for="description" class="col-form-label">Description</label>
          <textarea class="form-control description" id="description_{{ $code }}" name="post[{{ $code }}][description]">{{old('description')}}</textarea>
        </div>  
        
	
		
		<div class="form-group">
          <label for="inputTitle" class="col-form-label"> Product Gallery Images</label>
        <input id="inputTitle" type="file" name="post[{{ $code }}][product_gallery][]" multiple class="form-control">
        </div>
		
	    <div class="form-group">
          <label for="featured_video_url" class="col-form-label">Featured Video Url:</label>
          <input id="featured_video_url" type="text" name="post[{{ $code }}][featured_video_url]" placeholder="Enter Video Url"  class="form-control">
          @error('title')
          <span class="text-danger">{{$message}}</span>
          @enderror
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
              $('.main_content').summernote({
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
    

          </script>
    @endpush


 @endforeach

        <div class="form-group" style="display:none;">
          <label for="is_featured">Is Featured</label><br>
          <input type="checkbox" name='is_featured' id='is_featured' value='1' checked> Yes                        
        </div>
              {{-- {{$categories}} --}}

        <div class="form-group">
          <label for="cat_id">Category <span class="text-danger">*</span></label>
          <select name="cat_id" id="cat_id" class="form-control">
              <option value="">--Select any category--</option>
              @foreach($categories as $key=>$cat_data)
                  <option value='{{$cat_data->id}}'>{{$cat_data->title}}</option>
              @endforeach
          </select>
        </div>
		
		<div class="form-group">
          <label for="cat_id">Product Type</label>
          <select id="dropdown" name="product_type" id="product_type" class="form-control">
              <option value="">--Select any type--</option>
                  <option value="simple-product">Simple Product</option>
                  <option value="variable-product">Variable Product</option>
				  <option value="aws3-bucket-product">Aws3 Bucket Product</option>

          </select>
        </div>
		
		
        {{-- {{$attributes}} --}}
        
		@php
		  $attr = [];
		@endphp
		
        <div class="form-group" id="hiddenField" style="display: none;">
		<div class="main-variable-product">
			<h4> Varitions: </h4>
		  @foreach($productattributes as $key=>$cat_data)
		 
		@php
		   $sub_cat_info= DB::table('product_attributes')->select('title')->where('parent_id',$cat_data->id)->get();
		  @endphp
		    <span>{{$cat_data->title}}</span>
          <select name="attr[{{ $cat_data->title }}][]" class="form-control child_attr_id" multiple data-live-search="true">
			 @foreach($sub_cat_info as $key=>$sub_cat_data)
                  <option value='{{$sub_cat_data->title}}'>{{$sub_cat_data->title}}</option>
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
        
		</div>
		
		
		
		<div id="gpminvoice-group" class="postbox" style="display: none;">


		 <div id="videos_list_admin">
		  
		@php
        $aw3_buckets = [];
        @endphp
		  
		  <table id="repeatable-fieldset-one" width="100%" class="ui-sortable">
		  <tbody>
				<tr>
			  <td width="20%"> 
				<input type="text" class="video_title" placeholder="Title" title="Title" name="aw3_buckets[video_title][]"></td>
				<td width="20%">
			  <input type="text" class="video_duration" placeholder=" Video duration" name="aw3_buckets[video_duration][]">
			 </td>
			 <td width="25%">
				<div class="image_selected_dv">
					<input type="url" placeholder="Image Link" class="image_link large-text" name="aw3_buckets[image_link][]" style="display:none;">
					<input type="file" class="file_input" name="aw3_buckets[image_link][]">
				</div>
			  </td>
			  <td width="25%">
			  <div class="video_selected_dv">  
			<input type="url" placeholder="Video Link" class="video_link large-text" name="aw3_buckets[video_link][]" style="display:none;">
             <input type="file" class="file_input video_link" name="aw3_buckets[video_link][]">
			</div>





			  </td>
			  <td width="10%"><a class="button  cmb-remove-row-button button-disabled" href="#">Remove</a></td>
			</tr>
			
			<!-- empty hidden one for jQuery -->
			<tr class="empty-row screen-reader-text">
			  <td>
				<input type="text" class="video_title" placeholder="Title" name="aw3_buckets[video_title][]" value=""></td>
			  <td>
			  <input type="text" class="video_duration" placeholder=" Video duration" name="aw3_buckets[video_duration][]" value="">
			  </td>
			
				<td>
				<div class="image_selected_dv">
				

				
					<input type="url" placeholder="Image Link" class="image_link large-text" name="aw3_buckets[image_link][]" value="" style="display:none;">
					<input type="file" class="file_input" name="aw3_buckets[image_link][]">
				</div>
			  </td>
			  <td>
			 <div class="video_selected_dv">
			 <input type="url" placeholder="Video Link" class="video_link large-text" name="aw3_buckets[video_link][]" value="" style="display:none;">
			 <input type="file" class="file_input video_link" name="aw3_buckets[video_link][]">
			</div>
			</td>         
			  <td><a class="button remove-row" href="#">Remove</a></td>
			</tr>
		  </tbody>
		</table>
		<p><a id="add-row" class="button" href="#">Add another Video</a></p>
		</div>
		</div>
		
		
		
		<div class="main-seo-setting">
			<h4> Shipping </h4>
			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Product Weight (g)text</label>
			  <input type="text" name="product_actual_weight" class="form-control">
			  <div class="tooltip">Hover over me
			  <span class="tooltiptext">Tooltip text</span>
			  </div>
			</div> 
            <h5> Dimensions (cm) </h5>
			<div class="Length">
			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Length</label>
			  <input type="text" name="dimension_length" class="form-control">
			</div> 
			
			<div class="form-group">
			  <label for="inputTitle" class="col-form-label">Weight</label>
			  <input type="text" name="dimension_weight" class="form-control">
			</div> 
			 <div class="form-group">
			  <label for="inputTitle" class="col-form-label">Height</label>
			  <input type="text" name="dimension_height" class="form-control">
			</div> 
       </div>
		</div>
		<div class="form-group">
          <label for="price" class="col-form-label">Price($) <span class="text-danger">*</span></label>
          <input id="price" type="number" name="price" placeholder="Enter price"  value="{{old('price')}}" class="form-control">
          @error('price')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>
		
        <div class="form-group" style="display:none;">
          <label for="discount" class="col-form-label">Discount(%)</label>
          <input id="discount" type="number" name="discount" min="0" max="100" placeholder="Enter discount"  value="{{old('discount')}}" class="form-control">
          @error('discount')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>

        <div class="form-group" style="display:none;">
          <label for="stock">Quantity <span class="text-danger">*</span></label>
          <input id="quantity" type="number" name="stock" min="0" placeholder="Enter quantity"  value="{{old('stock')}}" class="form-control">
          @error('stock')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>
        <div class="form-group">
          <label for="inputTitle" class="col-form-label"> Featured Image</label>
        <input id="inputTitle" type="file" name="image" class="form-control">
        </div>

        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Product Slug<span class="text-danger">*</span></label>
          <input id="inputTitle" type="text" name="product_slug" placeholder="Enter Url customize" class="form-control">
        </div>
		 @error('product_slug')
          <span class="text-danger">{{$message}}</span>
          @enderror
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


 <script type="text/javascript">

    jQuery(document).ready(function( $ ){
        $( '#add-row' ).on('click', function() {
            var row = $( '.empty-row.screen-reader-text' ).clone(true);
            row.removeClass( 'empty-row screen-reader-text' );
            row.insertBefore( '#repeatable-fieldset-one tbody>tr:last' );
            return false;
        });

        $( '.remove-row' ).on('click', function() {
            $(this).parents('tr').remove();
            return false;
        });
    });
  </script>

<script>
  $(document).ready(function () {
		// Change 'dropdown' to the actual ID of your dropdown
		$('#dropdown').change(function () {
			// Change 'option1' and 'option2' to the values you want to trigger show/hide
   if ($(this).val() == 'variable-product') {
		$('#hiddenField').show();
		$('#gpminvoice-group').hide();
	}else if ($(this).val() == 'aws3-bucket-product') {
		$('#gpminvoice-group').show();
		$('#hiddenField').hide();
	}
	else {
		// Hide both fields if none of the options are selected
		$('#gpminvoice-group').hide();
		$('#hiddenField').hide();
	}
		});
	});
  
</script>
@endpush