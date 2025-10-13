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
        <form method="post" action="{{route('product.update', $product->id)}}" enctype="multipart/form-data">
            @csrf
            @method('PATCH')

            <!-- Other fields remain unchanged -->
            <div class="form-group">
                <label for="inputTitle" class="col-form-label">Product Language</label>
                <input id="inputTitle" type="text" name="title" value="{{$product->lang}}" readonly class="form-control">
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
                <input type="checkbox" name='is_featured' id='is_featured' value='1' {{($product->is_featured ? 'checked' : '')}}> Yes
            </div>

            <div class="form-group">
                <label for="cat_id">Category </label>
                <select name="cat_id" id="cat_id" class="form-control">
                    <option value="">--Select any category--</option>
                    @foreach($categories as $key=>$cat_data)
                        <option value='{{$cat_data->id}}' {{($product->cat_id==$cat_data->id)? 'selected' : ''}}>{{$cat_data->title}}</option>
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label for="product_type">Product Type</label>
                <select id="product_type" name="product_type" class="form-control">
                    <option value="">--Select any type--</option>
                    <option value="simple-product" {{($product->product_type=='simple-product')? 'selected' : ''}}>Simple Product</option>
                    <option value="variable-product" {{($product->product_type=='variable-product')? 'selected' : ''}}>Variable Product</option>
                    <option value="digital" {{($product->product_type=='digital')? 'selected' : ''}}>Digital Product</option>
                    <option value="aws3-bucket-product" {{($product->product_type=='aws3-bucket-product')? 'selected' : ''}}>S3 Product</option>
                </select>
            </div>

            <div class="form-group" id="hiddenField" style="display: {{($product->product_type == 'variable-product') ? 'block' : 'none'}};">
                <div class="main-variable-product">
                    <h4>Variations:</h4>
                    {{-- {{ dd($productattributes) }} --}}
                    @foreach($productattributes as $key => $parent_attr)
                        @php
                            // Get sub-attributes for this parent attribute
                            $sub_attributes = \App\Models\ProductAttributes::where('parent_id', $parent_attr->id)->get();
                            // Get selected attribute IDs for this product and parent attribute
                            $selected_attributes = $product->product_dropdown_attribute
                                ->where('parent_attribute_id', $parent_attr->id)
                                ->pluck('attribute_id')
                                ->toArray();
                        @endphp
                        <div class="form-group">
                            <label>{{$parent_attr->title}}</label>
                            <select name="attr[{{$parent_attr->id}}][]" class="form-control child_attr_id" multiple data-live-search="true">
                                @foreach($sub_attributes as $sub_attr)
                                    <option value="{{$sub_attr->id}}" {{in_array($sub_attr->id, $selected_attributes) ? 'selected' : ''}}>{{$sub_attr->title}}</option>
                                @endforeach
                            </select>
                        </div>
                    @endforeach
                </div>
            </div>

            <div class="main-seo-setting">
                <h4>Shipping</h4>
                <div class="form-group">
                    <label for="product_actual_weight" class="col-form-label">Product Weight (g)</label>
                    <input type="text" name="product_actual_weight" value="{{$product->product_actual_weight}}" class="form-control">
                    <div class="tooltip">Hover over me
                        <span class="tooltiptext">Enter weight in grams</span>
                    </div>
                </div>
                <h5>Dimensions (cm)</h5>
                <div class="Length">
                    <div class="form-group">
                        <label for="dimension_length" class="col-form-label">Length</label>
                        <input type="text" name="dimension_length" value="{{$product->dimension_length}}" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="dimension_weight" class="col-form-label">Width</label>
                        <input type="text" name="dimension_weight" value="{{$product->dimension_weight}}" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="dimension_height" class="col-form-label">Height</label>
                        <input type="text" name="dimension_height" value="{{$product->dimension_height}}" class="form-control">
                    </div>
                </div>
            </div>

            <!-- Other fields (price, images, SEO, etc.) remain unchanged -->
            <div class="form-group">
                <label for="price" class="col-form-label">Price($)</label>
                <input id="price" type="text" name="price" value="{{$product->price}}" class="form-control">
            </div>
            <div class="form-group">
                <label for="indonesian_price" class="col-form-label">Indonesian Price(Rp)</label>
                <input id="indonesian_price" type="text" name="indonesian_price" value="{{$product->indonesian_price}}" class="form-control">
            </div>
            <div class="form-group">
                <label for="malaysian_price" class="col-form-label">Malaysian Price(RM)</label>
                <input id="malaysian_price" type="text" name="malaysian_price" value="{{$product->malaysian_price}}" class="form-control">
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
                @if(!empty($product->photo))
                    <img src="{{ $product->photo }}" alt="{{$product->photo}}" style="width:80px;">
                @endif
                <input id="inputTitle" type="file" name="photo" class="form-control">
            </div>

            <div class="form-group">
                <label for="inputTitle" class="col-form-label">Product Gallery</label>
                @php
                    $gallery = $product->product_gallery;
                    $galleryArray = is_string($gallery) ? array_map('trim', explode(',', $gallery)) : [];
                @endphp
                @if (!empty($galleryArray))
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
                <input type="text" name="featured_video_url" value="{{$product->featured_video_url}}" class="form-control">
            </div>

            <div class="main-seo-setting">
                <h4>SEO Setting:</h4>
                <div class="form-group">
                    <label for="inputTitle" class="col-form-label">Meta Title</label>
                    <input type="text" name="seo_meta_title" value="{{$product->seo_meta_title}}" class="form-control">
                </div>
                <div class="form-group">
                    <label for="inputTitle" class="col-form-label">Meta Description</label>
                    <input type="text" name="seo_meta_description" value="{{$product->seo_meta_description}}" class="form-control">
                </div>
                <div class="form-group">
                    <label for="inputTitle" class="col-form-label">Meta Keywords</label>
                    <input type="text" name="seo_meta_tag" value="{{$product->seo_meta_tag}}" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <label for="inputTitle" class="col-form-label">Product Slug</label>
                <input id="inputTitle" type="text" name="page_slug" value="{{$product->slug}}" class="form-control">
            </div>

            <div class="form-group">
                <label for="status" class="col-form-label">Status </label>
                <select name="status" class="form-control">
                    <option value="active" {{($product->status=='active')? 'selected' : ''}}>Publish</option>
                    <option value="inactive" {{($product->status=='inactive')? 'selected' : ''}}>Draft</option>
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
$(document).ready(function() {
    $('#summary').summernote({
        placeholder: "Write short description.....",
        tabsize: 2,
        height: 150
    });

    $('#description').summernote({
        placeholder: "Write detail Description.....",
        tabsize: 2,
        height: 150
    });

    $('.child_attr_id').selectpicker();

    $('#product_type').change(function() {
        if ($(this).val() === 'variable-product') {
            $('#hiddenField').show();
            $('.child_attr_id').selectpicker('refresh');
        } else {
            $('#hiddenField').hide();
        }
    });
});
</script>
@endpush
