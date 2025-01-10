    <td>
			<a href="{{route('coupon.edit',$coupon->id)}}" class="btn btn-primary btn-sm float-left mr-1" style="height:30px; width:30px;border-radius:50%" data-toggle="tooltip" title="edit" data-placement="bottom"><i class="fas fa-edit"></i></a>
			<form method="POST" action="{{route('coupon.destroy',[$coupon->id])}}">
			  @csrf 
			  @method('delete')
				  <button class="btn btn-danger btn-sm dltBtn" data-id="{{$coupon->id}}" style="height:30px; width:30px;border-radius:50%" data-toggle="tooltip" data-placement="bottom" title="Delete" onclick="return confirm('Are you sure you want to delete this coupon?');"><i class="fas fa-trash-alt"></i></button>
			</form>
    </td>