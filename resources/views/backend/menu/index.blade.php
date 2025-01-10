@extends('layouts.app')
@section('content')
 {!! Menu::render() !!}

@endsection
  


@push('script')
    {!! Menu::scripts() !!}
@endpush