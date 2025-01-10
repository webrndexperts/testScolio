@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Edit Header Main Title</h5>
    <div class="card-body">
      <form method="post" action="{{route('header-main-title.update',$xrayCategory->id)}}">
        @csrf 
        @method('PATCH')
		<input type="hidden" name="header_type"  value="{{$xrayCategory->header_main_parents_id}}" class="form-control">
		
		 <input id="inputTitle" type="text" name="title" value="{{$xrayCategory->lang}}" class="form-control" readonly>
        <div class="form-group">
          <label for="inputTitle" class="col-form-label">Title</label>
          <input id="inputTitle" type="text" name="title" placeholder="Enter title"  value="{{$xrayCategory->title}}" class="form-control">
          @error('title')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>

        <div class="form-group">
          <label for="status" class="col-form-label">Status</label>
          <select name="status" class="form-control">
            <option value="active" {{(($xrayCategory->status=='active') ? 'selected' : '')}}>Publish</option>
            <option value="inactive" {{(($xrayCategory->status=='inactive') ? 'selected' : '')}}>Draft</option>
          </select>
          @error('status')
          <span class="text-danger">{{$message}}</span>
          @enderror
        </div>
        <div class="form-group mb-3">
           <button class="btn btn-success" type="submit">Update</button>
        </div>
      </form>
    </div>
</div>

@endsection
