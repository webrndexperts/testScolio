@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <h5 class="card-header">Add Mailchimp Api</h5>
    <div class="card-body">
      <form method="post" action="{{route('mailchimp.store')}}">
        {{csrf_field()}}
		<div class="form-group">
          <label for="inputTitle" class="col-form-label">Mailchimp Api Key</label>
        <input type="text" name="mailchimp_api_key"  value="{{old('mailchimp_api_key')}}" class="form-control">
          @error('mailchimp_api_key')
          <span class="text-danger">{{$message}}</span>
          @enderror
		  <p>The API key for connecting with your Mailchimp account. <a href="https://admin.mailchimp.com/account/api" target="_blank">Get your API key here.</a></p>
        </div>

        
        <div class="form-group">
          <label for="status" class="col-form-label">Status </label>
          <select name="status" class="form-control">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
          </select>
        </div>
        <div class="form-group mb-3">
          <button type="reset" class="btn btn-warning">Reset</button>
           <button class="btn btn-success" type="submit">Submit</button>
        </div>
      </form>
    </div>
</div>

@endsection
