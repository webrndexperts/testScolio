<div class="custom-actions" style="	display: flex; align-items: center;">

  <!--a href="{{route('wishlist.show',$row_wishlist->id)}}" class="btn btn-warning btn-sm float-left m-2" style="height:30px; width:30px;border-radius:50%" data-toggle="tooltip" title="view" data-placement="bottom"><i class="fas fa-eye"></i></a-->
  
   <form method="POST" action="{{route('wishlist.destroy',[$row_wishlist->id])}}">
		  @csrf 
		  @method('delete')
	  <button class="btn btn-danger btn-sm dltBtn" data-id="{{$row_wishlist->id}}" style="height:30px; width:30px;border-radius:50%" data-toggle="tooltip" data-placement="bottom" title="Delete" onclick="return confirm('Are you sure you want to delete this user?');"><i class="fas fa-trash-alt"></i></button>
   </form>
</div>
