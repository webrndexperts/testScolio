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
      <h6 class="m-0 font-weight-bold text-primary float-left">Widgets List</h6>
      <a href="{{route('widgets.create')}}" class="btn btn-primary btn-sm float-right" data-toggle="tooltip" data-placement="bottom" title="Add New"><i class="fas fa-plus"></i> Add New</a>
    </div>
	
	<div class="main-language-part">
		@php
		 $languages = App\Models\Language::all();
		@endphp
		@foreach ($languages as $language)
	<div class="custom-lang">

		@php
		   $language_slug = $language->code;
		 $menu_model = App\Models\Widgets::select('id','lang')->where('lang', $language_slug)->first();
		 $total_count_menu = App\Models\Widgets::select('id','lang')->where('lang', $language_slug)->count();
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
        $urlWithParam = route('widgets.index', ['lang' => $menu_lang]);
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
			  <th>Section Type</th>
              <th>Language</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>S.N.</th>
              <th>Title</th>
			  <th>Section Type</th>
              <th>Language</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tfoot>
          <tbody>
           @if(count($pages)>0)

            @foreach($pages as $page)  
            @php
                $serialNumber = ($pages->currentPage() - 1) * $pages->perPage() + $loop->iteration;
            @endphp					
              @php 
              $author_info=DB::table('users')->select('name')->where('id',$page->added_by)->get();
             // dd($post_parents_info);
              // dd($author_info);

              @endphp
                <tr>
                    <td>{{$serialNumber}}</td>
                    <td>{{$page->title}}</td>
					 <td>{{$page->widgets_type}}</td>
                    <td>{{$page->lang}}</td>                
                    <td>
                        @if($page->status=='active')
                            <span class="badge badge-success">Publish</span>
                        @else
                            <span class="badge badge-warning">Draft</span>
                        @endif
                    </td>
                    <td>
                        <a href="{{route('widgets.edit',$page->id)}}" class="btn btn-primary btn-sm float-left mr-1" style="height:30px; width:30px;border-radius:50%" data-toggle="tooltip" title="edit" data-placement="bottom"><i class="fas fa-edit"></i></a>
                    <form method="POST" action="{{route('widgets.destroy',[$page->id])}}">
                      @csrf 
                      @method('delete')
                          <button class="btn btn-danger btn-sm dltBtn" data-id={{$page->id}} style="height:30px; width:30px;border-radius:50%" data-toggle="tooltip" data-placement="bottom" title="Delete"><i class="fas fa-trash-alt"></i></button>
                        </form>
                    </td>
                </tr>  

            @endforeach
          </tbody>
        </table>
		 <span style="float:right">{{$pages->appends(['lang' => $_GET['lang']])->links()}}</span>
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
      
      $('#product-dataTable').DataTable();

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