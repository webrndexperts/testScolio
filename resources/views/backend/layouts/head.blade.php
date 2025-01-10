<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Scoliolife || DASHBOARD</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>  

	@stack('script')
    <!-- Custom fonts for this template-->
    <link href="{{asset('/backend/vendor/fontawesome-free/css/all.min.css')}}" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
	
	  <!-- Custom css for backend all files-->
    <link href="{{asset('/backend/css/custom.css')}}" rel="stylesheet">
  
    <!-- Custom styles for this template-->
    <link href="{{asset('/backend/css/sb-admin-2.min.css')}}" rel="stylesheet">
    @stack('styles')
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
.main-seo-setting {
    border: 1px solid #5555;
    padding: 20px;
}
</style>

  
</head>