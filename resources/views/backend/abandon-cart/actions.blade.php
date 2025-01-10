<div class="custom-actions" style="	display: flex; align-items: center;">

<a href="{{ route('abandoncart-sentmail', $row_abandon_cart->id) }}" class="btn btn-primary btn-sm" style="height:30px; width:30px; border-radius:50%" title="Sent Mail" onclick="return confirm('Are you sure you want to send this email?');"><i class="fas fa-envelope"></i></a>

  <a href="{{route('abandon-cart.show',$row_abandon_cart->id)}}" class="btn btn-warning btn-sm float-left m-2" style="height:30px; width:30px;border-radius:50%" data-toggle="tooltip" title="view" data-placement="bottom"><i class="fas fa-eye"></i></a>
  
   <form method="POST" action="{{route('abandon-cart.destroy',[$row_abandon_cart->id])}}">
		  @csrf 
		  @method('delete')
	  <button class="btn btn-danger btn-sm dltBtn" data-id="{{$row_abandon_cart->id}}" style="height:30px; width:30px;border-radius:50%" data-toggle="tooltip" data-placement="bottom" title="Delete" onclick="return confirm('Are you sure you want to delete this user?');"><i class="fas fa-trash-alt"></i></button>
   </form>
</div>
