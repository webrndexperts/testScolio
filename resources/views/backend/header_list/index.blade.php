@extends('backend.layouts.master')

@section('main-content')
 <!-- DataTales Example -->
 <div class="card shadow mb-4">
     <div class="row">
         <div class="col-md-12">
            @include('backend.layouts.notification')
         </div>
     </div>
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary float-left">Header Sub Title List</h6>
	  <a style="display:none;" href="{{route('header-main-title.index')}}" class="btn btn-primary btn-sm float" data-toggle="tooltip" data-placement="bottom" title="Add Page">Header Main Titles</a>
	  <a style="display:none;" href="{{route('header-submenu-title.index')}}" class="btn btn-primary btn-sm float" data-toggle="tooltip" data-placement="bottom" title="Add Page">  Header Sub Menu Titles</a>
      <a href="{{route('header-menu.create')}}" class="btn btn-primary btn-sm float-right" data-toggle="tooltip" data-placement="bottom" title="Add Page"><i class="fas fa-plus"></i>Add New</a>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        @if(count($pages)>0)
        <table class="table table-bordered" id="product-dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>S.N.</th>
			  <th>Menu Heading Title</th>
			  <th>Menu Heading Sub Title</th>
              <th>Sub Title</th>
              <th>Photo</th>
              <th>Language</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>S.N.</th>
			  <th>Menu Heading Title</th>
			  <th>Menu Heading Sub Title</th>
              <th>Sub Title</th>
              <th>Photo</th>
              <th>Language</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tfoot>
          <tbody>
           
            @foreach($pages as $page)   
              @php 

              $author_info=DB::table('users')->select('name')->where('id',$page->added_by)->get();
             //dd($page);
              // dd($author_info);

              @endphp
                <tr>
                    <td>{{$page->id}}</td>
	                 <td>{{$page->header_main_titleinfo->title ?? ''}}</td>      
					 <td>{{$page->header_submenu_title_info->title ?? ''}}</td>   
                    <td>{{$page->title}}</td>
                    <td>
                        @if($page->photo)
                            <img src="{{$page->photo}}" alt="{{$page->photo}}" style="max-width:80px">
                        @endif
                    </td>   
                     <td>{{$page->lang}}</td>                   
                    <td>
                        @if($page->status=='active')
                            <span class="badge badge-success">Publish</span>
                        @else
                            <span class="badge badge-warning">Draft</span>
                        @endif
                    </td>
                    <td>
                        <a href="{{route('header-menu.edit',$page->id)}}" class="btn btn-primary btn-sm float-left mr-1" style="height:30px; width:30px;border-radius:50%" data-toggle="tooltip" title="edit" data-placement="bottom"><i class="fas fa-edit"></i></a>
                    <form method="POST" action="{{route('header-menu.destroy',[$page->id])}}">
                      @csrf 
                      @method('delete')
                          <button class="btn btn-danger btn-sm dltBtn" data-id={{$page->id}} style="height:30px; width:30px;border-radius:50%" data-toggle="tooltip" data-placement="bottom" title="Delete"><i class="fas fa-trash-alt"></i></button>
                        </form>
                    </td>
                </tr>  
            @endforeach
          </tbody>
        </table>
        <span style="float:right">{{$pages->links()}}</span>
        @else
          <h6 class="text-center">No header menu found!!! Please create header menu</h6>
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
      
      $('#product-dataTable').DataTable( {
            "columnDefs":[
                {
                    "orderable":false,
                    "targets":[8,9,10]
                }
            ]
        } );

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