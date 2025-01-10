@extends('backend.layouts.master')

@section('main-content')
<style>
div#product-dataTable_length {
    display: none;
}
</style>
 <!-- DataTales Example -->
 <div class="card shadow mb-4">
     <div class="row">
         <div class="col-md-12">
            @include('backend.layouts.notification')
         </div>
     </div>
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary float-left">Product Lists</h6>
      <a href="{{route('product.create')}}" class="btn btn-primary btn-sm float-right" data-toggle="tooltip" data-placement="bottom" title="Add Product"><i class="fas fa-plus"></i> Add Product</a>
    </div>
	<div class="main-language-part">
		@php
		 $languages = App\Models\Language::all();
		@endphp
		@foreach ($languages as $language)
	<div class="custom-lang">

		@php
		   $language_slug = $language->code;
		 $menu_model = App\Models\Product::select('id','lang')->where('lang', $language_slug)->first();
		 $total_count_menu = App\Models\Product::select('id','lang')->where('lang', $language_slug)->count();
			$menu_id = '';
			$menu_lang = '';
			if ($menu_model) {
				// Access the 'lang' attribute and echo its value
				$menu_id = $menu_model->id;
				$menu_lang = $menu_model->lang;
			} else {
				$menu_id = 0;
				$menu_lang = $language_slug;
			}
        $urlWithParam = route('product.index', ['lang' => $menu_lang]);
		@endphp
		
		<a href="{{ $urlWithParam }}" class="language_click @if($language->code == $get_current_lang) selected @endif">
			{{ $language->name }} <span class="total-count-post">({{ $total_count_menu}}) </span> 
		</a>

		</div>	
	@endforeach

	</div>	
	
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered" id="product-dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Title</th>
              <th>Price</th>
              <th>Language</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>S.N.</th>
              <th>Title</th>
              <th>Price</th>
              <th>Language</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </tfoot>
          <tbody>
          @if(count($products)>0)
  
            @foreach($products as $product)
			 @php
                $serialNumber = ($products->currentPage() - 1) * $products->perPage() + $loop->iteration;
            @endphp
              @php
              $sub_cat_info=DB::table('categories')->select('title')->where('id',$product->child_cat_id)->get();
              // dd($sub_cat_info);
              $brands=DB::table('brands')->select('title')->where('id',$product->brand_id)->get();
              @endphp
                <tr>
                    <td>{{$serialNumber}}</td>
                    <td>{{$product->title}}</td>
                    <td>$@if($product->price) {{$product->price}} @else 0.00 @endif</td>
                    <td>{{$product->lang}}</td>
                    <td>
                        @if($product->photo)
                            @php
                              $photo=explode(',',$product->photo);
                              // dd($photo);
                            @endphp
                            <img src="{{$photo[0]}}" class="img-fluid zoom" style="max-width:80px" alt="{{$product->photo}}">
                        @else
                            <img src="{{asset('backend/img/thumbnail-default.jpg')}}" class="img-fluid" style="max-width:80px" alt="avatar.png">
                        @endif
                    </td>
                    <td>
                        <a href="{{route('product.edit',$product->id)}}" class="btn btn-primary btn-sm float-left mr-1" style="height:30px; width:30px;border-radius:50%" data-toggle="tooltip" title="edit" data-placement="bottom"><i class="fas fa-edit"></i></a>
                    <form method="POST" action="{{route('product.destroy',[$product->id])}}">
                      @csrf
                      @method('delete')
                          <button class="btn btn-danger btn-sm dltBtn" data-id={{$product->id}} style="height:30px; width:30px;border-radius:50%" data-toggle="tooltip" data-placement="bottom" title="Delete"><i class="fas fa-trash-alt"></i></button>
                        </form>
                    </td>
                </tr>
  
            @endforeach
		   
          </tbody>

        </table>
		  <span style="float:right">{{$products->appends(['lang' => $_GET['lang']])->links()}}</span>

        @endif
      </div>
    </div>
</div>
@endsection

@push('styles')
  <link href="{{asset('backend/vendor/datatables/dataTables.bootstrap4.min.css')}}" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css" />
  <style>
      div.dataTables_wrapper div.dataTables_paginate{
          display: none;
      }
      .zoom {
        transition: transform .2s; /* Animation */
      }

      .zoom:hover {
        transform: scale(5);
      }
  </style>
@endpush

@push('scripts')

  <!-- Page level plugins -->
  <script src="{{asset('backend/vendor/datatables/jquery.dataTables.min.js')}}"></script>
  <script src="{{asset('backend/vendor/datatables/dataTables.bootstrap4.min.js')}}"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>

  <!-- Page level custom scripts -->
  <script src="{{asset('backend/js/demo/datatables-demo.js')}}"></script>
  <script>

  $(document).ready(function() {
		$('#product-dataTable').DataTable();
	});

        // Sweet alert

        function deleteData(id){

        }
  </script>
  <script>
      $(document).ready(function(){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
          $('.dltBtn').click(function(e){
            var form=$(this).closest('form');
              var dataID=$(this).data('id');
              // alert(dataID);
              e.preventDefault();
              swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this data!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                       form.submit();
                    } else {
                        swal("Your data is safe!");
                    }
                });
          })
      })
  </script>
@endpush
