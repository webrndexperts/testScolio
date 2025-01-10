@extends('backend.layouts.master')

@section('main-content')
 <!-- DataTales Example -->
 <div class="card shadow mb-4">
    <div class="card-header py-3">
	 <h6 class="m-0 font-weight-bold text-primary float-left">Users List  <span style="color:black;">({{ $total_user_count }})</span>
	 </h6>
      <a href="{{route('users.create')}}" class="btn btn-primary btn-sm float-right" data-toggle="tooltip" data-placement="bottom" title="Add User"><i class="fas fa-plus"></i> Add User</a>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered" id="user-dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

		</table>
				
			  </div>
			</div>
		</div>
@endsection

@push('styles')
  <link href="{{asset('backend/vendor/datatables/dataTables.bootstrap4.min.css')}}" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css" />
  
@endpush

@push('scripts')

  <!-- Page level plugins -->
  <script src="{{asset('backend/vendor/datatables/jquery.dataTables.min.js')}}"></script>
  <script src="{{asset('backend/vendor/datatables/dataTables.bootstrap4.min.js')}}"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>

  <!-- Page level custom scripts -->
  <script src="{{asset('backend/js/demo/datatables-demo.js')}}"></script>
  <!--script>
      
      $('#user-dataTable').DataTable();

        // Sweet alert

        function deleteData(id){
            
        }
  </script-->
  
  
  <script type="text/javascript">

        function generateDataTable() {

        	var _url = "{{ route('forms.datatable') }}";

        	let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');



        	$('#user-dataTable').DataTable({

				"lengthMenu": [ [10, 50, 100, -1], [10, 50, 100, "All"] ],

				processing: true,

				serverSide: true,

				processing: true,

				order: [[ 0, "DESC" ]],

				ajax: {

					'url': _url,

					'type': 'post',

					"dataType": "json",

					"beforeSend": function (xhr) {

                        xhr.setRequestHeader('X-CSRF-TOKEN', token);

                    }

				},

				columns: [
					{
	                    "data": "DT_RowIndex",
	                    render: function (data, type, row, meta) {
	                        return meta.row + meta.settings._iDisplayStart + 1;
	                    }
	                },
					{data: 'name'},
					{data: 'email'},
					{data: 'join_date'},
					{data: 'role'},
					{data: 'status'},
					{data: 'actions', orderable: false, searchable: false}
				],

				"language":{

					"processing": `<div class="loader-image"></div>`,

				},

				"dom": '<"top table-search-flds d-flex align-items-center justify-content-between"fl>rt<"bottom table-paginater"ip><"clear">'

			});

        }



        generateDataTable();

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