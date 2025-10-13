@extends('backend.layouts.master')
@section('main-content')
 {!! Menu::render() !!}

@endsection
  


@push('scripts')
    {!! Menu::scripts() !!}
@endpush