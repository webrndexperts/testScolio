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
      <h6 class="m-0 font-weight-bold text-primary float-left">Coupon List</h6>
      <a href="{{route('coupon.create')}}" class="btn btn-primary btn-sm float-right" data-toggle="tooltip" data-placement="bottom" title="Add User"><i class="fas fa-plus"></i> Add Coupon</a>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered" id="coupon-dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Coupon Code</th>
              <th>Coupon Type</th>
              <th>Coupon Value</th>
              <th>Coupon Expire Date</th>
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
  
  
  
  
    <script type="text/javascript">

        function generateDataTable() {

        	var _url = "{{ route('coupon.datatable') }}";

        	let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');



        	$('#coupon-dataTable').DataTable({

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
					{data: 'code'},
					{data: 'fixed'},
					{data: 'value'},
					{data: 'expiry_date'},
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
@endpush