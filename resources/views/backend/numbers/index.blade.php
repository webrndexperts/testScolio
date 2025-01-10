@extends('backend.layouts.master')
@section('main-content')
<div class="container-fluid">
    @include('backend.layouts.notification')
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary float-left">Phone Numbers List </h6>
            <a href="{{route('numbers.create' , ['lang' => 'en_SG'])}}" class="btn btn-primary btn-sm float-right" data-toggle="tooltip"
                data-placement="bottom" title="Add User"><i class="fas fa-plus"></i> Add Number</a>
        </div>

        <div class="main-language-part">
            @php
            $languages = App\Models\Language::all();
            @endphp
            @foreach ($languages as $language)
            <div class="custom-lang">

                @php
                $language_slug = $language->code;
                $menu_model = App\Models\PhoneNumber::select('id','lang')->where('lang', $language_slug)->first();
                $total_count_menu = App\Models\PhoneNumber::select('id','lang')->where('lang', $language_slug)->count();
                $menu_id = '';
                $menu_lang = '';
                if ($menu_model) {
                // Access the 'lang' attribute and echo its value
                $menu_id = $menu_model->id;
                $menu_lang = $menu_model->lang;
                } else {
                $menu_id = 0;
                $menu_lang = $language_slug;
                }
                $urlWithParam = route('numbers.index', ['lang' => $menu_lang]);
                @endphp

                <a href="{{ $urlWithParam }}"
                    class="language_click @if($language->code == $get_current_lang) selected @endif">
                    {{ $language->name }} <span class="total-count-post">({{ $total_count_menu}}) </span>
                </a>

            </div>
            @endforeach

        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="number-dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>S.N.</th>
                            <th>Whatsapp Number</th>
                            <th>Phone Numbers</th>
                            <th>Address</th>
                            <th>Language</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                </table>

            </div>
        </div>
    </div>

    @endsection