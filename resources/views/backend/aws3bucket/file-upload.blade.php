<!DOCTYPE html>
<html>

   <body>
      <div class="container">
         <div class="panel panel-primary">
            <div class="panel-heading">
               <h2>Product Upload Csv</h2>
            </div>
     	<form action="{{ route('store.file') }}" method="post" enctype="multipart/form-data">
        @csrf
        <input type="file" name="filename" accept=".csv">
        <button type="submit" name="submit">Upload CSV</button>
        </form>
         </div>
      </div>
   </body>
</html>