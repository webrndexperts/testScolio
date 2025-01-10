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
      <h6 class="m-0 font-weight-bold text-primary float-left">Order Lists 
	   <span style="color:black;">({{ $total_orders_count }})</span>
	  </h6>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered" id="order-dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Order No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Total Amount</th>
              <th>Payment Method</th>
			  <th>Publish Date</th>
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

        	var _url = "{{ route('order.datatable') }}";

        	let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');



        	$('#order-dataTable').DataTable({

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
					{data: 'order_number'},
					{data: 'name'},
					{data: 'email'},
					{data: 'sub_total'},
					{data: 'payment_method'},
					{data: 'created_at'},
					{data: 'payment_status'},
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
  
  
  
  <!--script>
      
      // $('#order-dataTable').DataTable( {
            // "columnDefs":[
                // {
                    // "orderable":false,
                    // "targets":[8]
                // }
            // ]
        // } );

        // Sweet alert

        function deleteData(id){
            
        }
  </script-->
  
  
  

@endpush