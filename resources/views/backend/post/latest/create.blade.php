@extends('backend.layouts.master')

@section('main-content')

    <div class="card">
        <h5 class="card-header">Add Post</h5>
        <div class="card-body">
            @if ($errors->any())
                <div class="alert alert-danger alert-dismissable fade show">
                    <button class="close" data-dismiss="alert" aria-label="Close">×</button>
                    @foreach ($errors->all() as $error)
                        <span class="text-danger">{{ $error }}</span>
                    @endforeach
                </div>
            @endif

            {{-- @error('post')
      <span class="text-danger">{{ $message }}</span>
  @enderror --}}
            <form method="post" action="{{ route('latestpost.store') }}" enctype="multipart/form-data">
                {{ csrf_field() }}


                @php
                    $post = [];
                @endphp
        
            <div class="accordion-single js-acc-single">
                <div class="accordion-single-item js-acc-item">

                    <h2 class="accordion-single-title js-acc-single-trigger">English
                        <?php //if(!empty($language->icon)){ ?>

                        {{-- <img src="{{ $language->icon }}" alt="{{ $language->icon }}"> --}}
                        <?php ///}?>
                    </h2>
                    <div class="accordion-single-content">


                        <div class="form-group">
                            <label for="inputTitle" class="col-form-label">Title</label>
                            <input id="inputTitle" type="text" name="post[en_all][title]"
                                placeholder="Enter title" value="{{ old('post.en_all.title') }}"
                                class="form-control">
                            {{-- @error('title')
  <span class="text-danger">{{$message}}</span>
  @enderror --}}
                            @if ($errors->has("post.en_all.title"))
                                <span class="text-danger">{{ $errors->first("post.en_all.title") }}</span>
                            @endif
                            @error("post.en_all.title")
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="inputTitle" class="col-form-label"> Slug for en_all<span
                                    class="text-danger">*</span></label>
                            <input id="inputTitle" type="text" name="post[en_all][slug]"
                                value="{{ old('post.en_all.slug') }}" placeholder="Enter Post Slug"
                                class="form-control">


                            @error('post.en_all.slug')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group" style="display:none;">
                            <label for="post_cat_id">Category</label>
                            <select name="post[en_all][post_cat_id]" class="form-control">
                                <option value="">--Select any category--</option>
                                @foreach ($categories as $key => $data)
                                    <option value='{{ $data->id }}'>{{ $data->title }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="description" class="col-form-label">Description</label>
                            <textarea class="form-control description" id="description_en_all"
                                name="post[en_all][description]">{{ old('post.en_all.description') }}</textarea>
                            @if ($errors->has("post.en_all.title"))
                                <span class="text-danger">{{ $errors->first("post.en_all.description") }}</span>
                            @endif
                        </div>

                        <div class="form-group">
                            <label for="excerpt" class="col-form-label">Excerpt</label>
                            <textarea class="form-control excerpt" id="excerpt_en_all" name="post[en_all][excerpt]">{{ old('post.en_all.excerpt') }}</textarea>
                            @if ($errors->has("post.en_all.title"))
                                <span class="text-danger">{{ $errors->first("post.en_all.excerpt") }}</span>
                            @endif
                        </div>

                        <div class="form-group">
                            <label for="inputTitle" class="col-form-label">Featured Image</label>
                            <input id="inputTitle" type="file" name="post[en_all][image]"
                                class="form-control img-upload">
                        </div>

                        <div class="main-seo-setting">
                            <h4> SEO Setting: </h4>
                            {{-- <div class="form-group">
<label for="inputTitle" class="col-form-label">Meta Title</label>
<input type="text" name="post[{{ $code }}][seo_meta_title]" placeholder="Enter Meta Title"  class="form-control">
</div> 

<div class="form-group">
<label for="inputTitle" class="col-form-label">Meta Description</label>
<input type="text" name="post[{{ $code }}][seo_meta_description]" placeholder="Enter Meta Description"  class="form-control">
</div>  --}}

                            <div class="form-group">
                                <label for="inputTitle" class="col-form-label">Meta Keywords</label>
                                <input type="text" name="post[en_all][seo_meta_tag]"
                                    value="{{ old('post.en_all.seo_meta_tag') }}"
                                    placeholder="Enter Meta Keywords" class="form-control">
                            </div>
                        </div>

                    </div>
                </div>
            </div>
                @foreach ($languages as $code => $language)
                @if(!str_starts_with($code, 'en_')) <!-- Check if it's the 'en_' language -->
          
                <div class="accordion-single js-acc-single">
                  <div class="accordion-single-item js-acc-item">
                    <h2 class="accordion-single-title js-acc-single-trigger">{{ $language->name }} 
                      @if(!empty($language->icon))
                        <img src="{{ $language->icon }}" alt="{{ $language->icon }}">
                      @endif
                    </h2>
                    <div class="accordion-single-content">
                      <!-- Form for 'en_' language -->
                      <div class="form-group">
                        <label for="inputTitle" class="col-form-label">Title</label>
                        <input id="inputTitle" type="text" name="post[{{ $code }}][title]" placeholder="Enter title" value="{{ old('post.'.$code.'.title') }}" class="form-control">
                        @error("post.{$code}.title")
                          <span class="text-danger">{{ $message }}</span>
                        @enderror
                      </div>
    
                      <div class="form-group">
                        <label for="inputTitle" class="col-form-label">Slug for {{ $code }}<span class="text-danger">*</span></label>
                        <input id="inputTitle" type="text" name="post[{{ $code }}][slug]" value="{{ old('post.'.$code.'.slug') }}" placeholder="Enter Post Slug" class="form-control">
                        @error('post.' . $code . '.slug')
                          <span class="text-danger">{{ $message }}</span>
                        @enderror
                      </div>
    
                      <div class="form-group">
                        <label for="description" class="col-form-label">Description</label>
                        <textarea class="form-control description" id="description_{{ $code }}" name="post[{{ $code }}][description]">{{ old('post.'.$code.'.description') }}</textarea>
                        @error("post.{$code}.description")
                          <span class="text-danger">{{ $message }}</span>
                        @enderror
                      </div>
    
                      <div class="form-group">
                        <label for="excerpt" class="col-form-label">Excerpt</label>
                        <textarea class="form-control excerpt" id="excerpt_{{ $code }}" name="post[{{ $code }}][excerpt]">{{ old('post.'.$code.'.excerpt') }}</textarea>
                        @error("post.{$code}.excerpt")
                          <span class="text-danger">{{ $message }}</span>
                        @enderror
                      </div>
    
                      <div class="form-group">
                        <label for="inputTitle" class="col-form-label">Featured Image</label>
                        <input id="inputTitle" type="file" name="post[{{ $code }}][image]" class="form-control img-upload">
                      </div>

                      <div class="main-seo-setting">
                        <h4> SEO Setting: </h4>
                    

                        <div class="form-group">
                            <label for="inputTitle" class="col-form-label">Meta Keywords</label>
                            <input type="text" name="post[{{ $code }}][seo_meta_tag]"
                                value="{{ old('post.'. $code .'.seo_meta_tag') }}"
                                placeholder="Enter Meta Keywords" class="form-control">
                        </div>
                    </div>

                    </div>
                  </div>
                </div>
         
              
                    @endif
                    @push('styles')
                        <link rel="stylesheet" href="{{ asset('backend/summernote/summernote.min.css') }}">
                    @endpush
                    @push('scripts')
                        <script src="{{ asset('backend/summernote/summernote.min.js') }}"></script>
                        <script>
                            $(document).ready(function() {
                                $('.excerpt').summernote({
                                    tabsize: 2,
                                    height: 100
                                });
                            });

                            $(document).ready(function() {
                                $('.description').summernote({
                                    tabsize: 2,
                                    height: 150,

                                    styleTags: [{
                                            title: 'Paragraph',
                                            tag: 'p',
                                            value: 'p'
                                        },
                                        {
                                            title: 'H1',
                                            tag: 'h1',
                                            value: 'h1',
                                            className: 'orange-h1',
                                        },
                                        
                                        {
                                            title: 'H2',
                                            tag: 'h2',
                                            value: 'h2',
                                            className: 'orange-h2',
                                        },
                                        {
                                            title: 'H3',
                                            tag: 'h3',
                                            value: 'h3',
                                            className: 'orange-h3',
                                        },
                                        {
                                            title: 'H4',
                                            tag: 'h4',
                                            value: 'h4',
                                            className: 'orange-h4',
                                        },
                                        {
                                            title: 'H5',
                                            tag: 'h5',
                                            value: 'h5',
                                            className: 'orange-h5',
                                        },
                                        {
                                            title: 'H6',
                                            tag: 'h6',
                                            value: 'h6',
                                            className: 'orange-h6',
                                        },
                                        {
                                            title: 'Block Quote',
                                            tag: 'blockquote',
                                            className: 'blockquote',
                                            value: 'blockquote'
                                        },
                                        {
                                            title: 'Code Block',
                                            tag: 'pre',
                                            className: 'code-block',
                                            value: 'pre'
                                        }
                                    ],
                                    codemirror: { // codemirror options
                                        theme: 'monokai'
                                    }
                                });
                            });
                            // $('select').selectpicker();
                        </script>
                    @endpush
                @endforeach

                <div class="form-group">
                    <label for="inputTitle" class="col-form-label"><b>Parent Slug</b><span
                            class="text-danger">*</span></label>
                    <input id="inputTitle" type="text" name="post_slug" placeholder="Enter Parent Slug"
                        value="{{ old('post_slug') }}" class="form-control ">
                    @error('post_slug')
                        <span class="text-danger slug_msg">{{ $message }}</span>
                    @enderror
                </div>

                <div class="form-group">
                    <label for="added_by">Author</label>
                    <select name="added_by" class="form-control">
                        <option value="">--Select any one--</option>
                        @foreach ($users as $key => $data)
                            <option value='{{ $data->id }}' {{ $key == 0 ? 'selected' : '' }}>{{ $data->name }}
                            </option>
                        @endforeach
                    </select>
                </div>


                <div class="form-group">
                    <label for="status" class="col-form-label">Status</label>
                    <select name="status" class="form-control">
                        <option value="active">Publish</option>
                        <option value="inactive">Draft</option>
                    </select>
                    @error('status')
                        <span class="text-danger">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group mb-3">
                    <button type="reset" class="btn btn-warning">Reset</button>
                    <button class="btn btn-success" type="submit">Publish</button>
                </div>
            </form>
        </div>
    </div>

@endsection

@push('styles')
    {{-- <link rel="stylesheet" href="{{asset('backend/summernote/summernote.min.css')}}"> --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.9.1/summernote-bs5.min.css"
        integrity="sha512-rDHV59PgRefDUbMm2lSjvf0ZhXZy3wgROFyao0JxZPGho3oOuWejq/ELx0FOZJpgaE5QovVtRN65Y3rrb7JhdQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css" />
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-bs5.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror.css">
    <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/theme/monokai.css">
    <style>
        .orange-h1 {
            color: #E97132 !important;
            font-size: 22px !important;
        }
        .orange-h2 {
            color: #E97132 !important;
            font-size: 20px !important;
        }
        .orange-h3 {
            color: #E97132 !important;
            font-size: 18px !important;
        }
        .orange-h4 {
            color: #E97132 !important;
            font-size: 16px !important;
        }
        .orange-h5 {
            color: #E97132 !important;
            font-size: 14px !important;
        }
        .orange-h6 {
            color: #E97132 !important;
            font-size: 12px !important;
        } 
    </style>
@endpush
@push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous">
    </script>

    {{-- <script src="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-bs4.min.js"></script> --}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.9.1/summernote-bs5.min.js"
        integrity="sha512-qTQLA91yGDLA06GBOdbT7nsrQY8tN6pJqjT16iTuk08RWbfYmUz/pQD3Gly1syoINyCFNsJh7A91LtrLIwODnw=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="/vendor/laravel-filemanager/js/stand-alone-button.js"></script>
    {{-- <script src="{{asset('backend/summernote/summernote.min.js')}}"></script> --}}
    {{-- <script type="text/javascript" src="cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script> --}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>

    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror.js"></script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/mode/xml/xml.js"></script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/2.36.0/formatting.js"></script>
@endpush

{{-- @push('scripts')
<script>
  $(document).ready(function () {
    // Check if the span element with validation error exists
    const errorElement = $('.slug_msg');

    if (errorElement.length) {
        // Scroll to the error element
        errorElement[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});
</script>
@endpush --}}
