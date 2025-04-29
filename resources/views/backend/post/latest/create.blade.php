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
            <form method="post" id="post-form" action="{{ route('latestpost.store') }}" enctype="multipart/form-data">
                {{ csrf_field() }}


                @php
                    $post = [];
                @endphp

                <div class="accordion-single js-acc-single">
                    <div class="accordion-single-item js-acc-item">

                        <h2 class="accordion-single-title js-acc-single-trigger">English
                            <?php //if(!empty($language->icon)){
                            ?>

                            {{-- <img src="{{ $language->icon }}" alt="{{ $language->icon }}"> --}}
                            <?php ///}
                            ?>
                        </h2>
                        <div class="accordion-single-content">


                            <div class="form-group">
                                <label for="inputTitle" class="col-form-label">Title</label>
                                <input id="inputTitle" type="text" name="post[en_all][title]" placeholder="Enter title"
                                    value="{{ old('post.en_all.title') }}" class="form-control">
                                {{-- @error('title')
  <span class="text-danger">{{$message}}</span>
  @enderror --}}
                                @if ($errors->has('post.en_all.title'))
                                    <span class="text-danger">{{ $errors->first('post.en_all.title') }}</span>
                                @endif
                                @error('post.en_all.title')
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

                                {{-- <div id="desc-editor">{!! $post->description !!}</div> --}}
                                {{-- <div id="desc-editor-en_all" class="desc-editor">{!! old('post.en_all.description') !!}</div> --}}
                                {{-- <textarea class="form-control description-textarea" id="description-{{$post->id}}" name="description" hidden>{{$post->description}}</textarea> --}}
                                {{-- <textarea class="form-control description" id="description_en_all"
                                name="post[en_all][description]">{{ old('post.en_all.description') }}</textarea> --}}
                                <textarea class="form-control description" id="description_en_all" name="post[en_all][description]" hidden>{{ old('post.en_all.description') }}</textarea>
                                @if ($errors->has('post.en_all.title'))
                                    <span class="text-danger">{{ $errors->first('post.en_all.description') }}</span>
                                @endif
                            </div>

                            <div class="form-group">
                                <label for="excerpt" class="col-form-label">Excerpt</label>
                                <textarea class="form-control excerpt" id="excerpt_en_all" name="post[en_all][excerpt]">{{ old('post.en_all.excerpt') }}</textarea>
                                @if ($errors->has('post.en_all.title'))
                                    <span class="text-danger">{{ $errors->first('post.en_all.excerpt') }}</span>
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
                                        value="{{ old('post.en_all.seo_meta_tag') }}" placeholder="Enter Meta Keywords"
                                        class="form-control">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                @foreach ($languages as $code => $language)
                    @if (!str_starts_with($code, 'en_'))
                        <!-- Check if it's the 'en_' language -->

                        <div class="accordion-single js-acc-single">
                            <div class="accordion-single-item js-acc-item">
                                <h2 class="accordion-single-title js-acc-single-trigger">{{ $language->name }}
                                    @if (!empty($language->icon))
                                        <img src="{{ $language->icon }}" alt="{{ $language->icon }}">
                                    @endif
                                </h2>
                                <div class="accordion-single-content">
                                    <!-- Form for 'en_' language -->
                                    <div class="form-group">
                                        <label for="inputTitle" class="col-form-label">Title</label>
                                        <input id="inputTitle" type="text" name="post[{{ $code }}][title]"
                                            placeholder="Enter title" value="{{ old('post.' . $code . '.title') }}"
                                            class="form-control">
                                        @error("post.{$code}.title")
                                            <span class="text-danger">{{ $message }}</span>
                                        @enderror
                                    </div>

                                    <div class="form-group">
                                        <label for="inputTitle" class="col-form-label">Slug for {{ $code }}<span
                                                class="text-danger">*</span></label>
                                        <input id="inputTitle" type="text" name="post[{{ $code }}][slug]"
                                            value="{{ old('post.' . $code . '.slug') }}" placeholder="Enter Post Slug"
                                            class="form-control">
                                        @error('post.' . $code . '.slug')
                                            <span class="text-danger">{{ $message }}</span>
                                        @enderror
                                    </div>

                                    <div class="form-group">
                                        <label for="description" class="col-form-label">Description</label>
                                        {{-- <div id="desc-editor">{!! $post->description !!}</div> --}}
                                        {{-- <div id="desc-editor-{{ $code }}" class="desc-editor"> --}}
                                            {{-- {!! old('post.' . $code . '.description') !!}</div> --}}
                                        {{-- <textarea class="form-control description-textarea" id="description-{{$post->id}}" name="description" hidden>{{$post->description}}</textarea> --}}
                                        {{-- <textarea class="form-control description" hidden id="description-{{ $code }}" --}}
                                            {{-- name="post[{{ $code }}][description]">{{ old('post.' . $code . '.description') }}</textarea> --}}
                                        <textarea class="form-control description" id="description_{{ $code }}" name="post[{{ $code }}][description]">{{ old('post.'.$code.'.description') }}</textarea>
                                        @error("post.{$code}.description")
                                            <span class="text-danger">{{ $message }}</span>
                                        @enderror
                                    </div>

                                    <div class="form-group">
                                        <label for="excerpt" class="col-form-label">Excerpt</label>
                                        <textarea class="form-control excerpt" id="excerpt_{{ $code }}" name="post[{{ $code }}][excerpt]">{{ old('post.' . $code . '.excerpt') }}</textarea>
                                        @error("post.{$code}.excerpt")
                                            <span class="text-danger">{{ $message }}</span>
                                        @enderror
                                    </div>

                                    <div class="form-group">
                                        <label for="inputTitle" class="col-form-label">Featured Image</label>
                                        <input id="inputTitle" type="file" name="post[{{ $code }}][image]"
                                            class="form-control img-upload">
                                    </div>

                                    <div class="main-seo-setting">
                                        <h4> SEO Setting: </h4>


                                        <div class="form-group">
                                            <label for="inputTitle" class="col-form-label">Meta Keywords</label>
                                            <input type="text" name="post[{{ $code }}][seo_meta_tag]"
                                                value="{{ old('post.' . $code . '.seo_meta_tag') }}"
                                                placeholder="Enter Meta Keywords" class="form-control">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    @endif
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
        h1, h1 * {
            color: #E97132 !important;
            /* font-size: 22px !important; */
            font-size:  2.5rem !important;
        }

        .orange-h2 {
            color: #E97132 !important;
            /* font-size: 20px !important; */
            font-size: 2rem !important;
        }

        .orange-h3 {
            color: #E97132 !important;
            /* font-size: 18px !important; */
            font-size: 1.5rem !important;
        }

        .orange-h4 {
            color: #E97132 !important;
            /* font-size: 16px !important; */
            font-size: 1.25rem !important;
        }

        .orange-h5 {
            color: #E97132 !important;
            font-size: 14px !important;
        }

        .orange-h6 {
            color: #E97132 !important;
            font-size: 12px !important;
        }
        .orange-heading {
    color: #E97132 !important;
  }

        /* Apply font sizes to the Quill dropdown */
.ql-picker.ql-size .ql-picker-item[data-value="10px"] {
    content: "10px";
    font-size: 10px;
}
.ql-picker.ql-size .ql-picker-item[data-value="12px"] {
    content: "12px";
    font-size: 12px;
}
.ql-picker.ql-size .ql-picker-item[data-value="14px"] {
    content: "14px";
    font-size: 14px;
}
.ql-picker.ql-size .ql-picker-item[data-value="16px"] {
    content: "16px";
    font-size: 16px;
}
.ql-picker.ql-size .ql-picker-item[data-value="18px"] {
    content: "18px";
    font-size: 18px;
}
.ql-picker.ql-size .ql-picker-item[data-value="20px"] {
    content: "20px";
    font-size: 20px;
}
.ql-picker.ql-size .ql-picker-item[data-value="24px"] {
    content: "24px";
    font-size: 24px;
}
.ql-picker.ql-size .ql-picker-item[data-value="32px"] {
    content: "32px";
    font-size: 32px;
}
.ql-picker.ql-size .ql-picker-item[data-value="40px"] {
    content: "40px";
    font-size: 40px;
}

.ql-snow {
  .ql-picker {
    &.ql-size {
      .ql-picker-label,
      .ql-picker-item {
        font-size: inherit !important; /* Ensures correct text rendering */

        &::before {
          content: attr(data-value) !important;
          font-size: inherit; /* Ensures it reflects the actual font size */
        }
      }
    }
  }
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
@push('styles')
    <link rel="stylesheet" href="{{ asset('backend/summernote/summernote.min.css') }}">
    {{-- Quill Style --}}
    <link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.ckeditor.com/ckeditor5/43.0.0/ckeditor5.css">

@endpush
@push('scripts')
    <script src="{{ asset('backend/summernote/summernote.min.js') }}"></script>

    {{-- Quill JS --}}
    <script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>

    <!-- Quill Better Table (Optional) -->
    <script src="https://cdn.jsdelivr.net/npm/quill-better-table@1.2.10"></script>

    <script type="importmap">

        {
      
            "imports": {
      
                "ckeditor5": "https://cdn.ckeditor.com/ckeditor5/43.0.0/ckeditor5.js",
      
                "ckeditor5/": "https://cdn.ckeditor.com/ckeditor5/43.0.0/"
      
            }
      
        }
      
        </script>
    {{-- <script>

document.addEventListener("DOMContentLoaded", function () {
    var Size = Quill.import("attributors/style/size");
    Size.whitelist = ["10px", "12px", "14px", "16px", "18px", "20px", "24px", "32px", "40px"];
    Quill.register(Size, true);


    const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // Basic formatting
  ['blockquote'],
  ['link', 'image'],            // Media options

  [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }, { 'header': 4 }, { 'header': 5 }, { 'header': 6 }],               // Header levels
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],  
  [{ 'script': 'sub'}, { 'script': 'super' }],      // Subscript/Superscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // Indent/Outdent
  [{ 'size': Size.whitelist }], // ✅ Now includes px values

  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],        // Header dropdown

  [{ 'color': [] }, { 'background': [] }],          // Text & Background color
  [{ 'font': [] }],                                 // Font family
  [{ 'align': [] }],                                // Alignment

  ['clean'],                                        // Remove formatting

];

    function initializeEditor(editorId, textareaId, toolbarId, dropdownId) {
        let editorDiv = document.getElementById(editorId);
        let textarea = document.getElementById(textareaId);
        let form = document.getElementById("post-form"); // Selects the correct form
        let dropdown = document.getElementById(dropdownId);

        if (editorDiv && textarea && form) {
            let quill = new Quill(`#${editorId}`, {
                modules: { toolbar: toolbarOptions },
                placeholder: "Start typing...",
                theme: "snow",
            });


//             quill.on("selection-change", function (range) {
//     if (range) {
//         let [block] = quill.getLine(range.index);
        
//         if (block && block.domNode.tagName.match(/^H[1-6]$/)) {
//             // Remove font size formatting from selection
//             quill.format("size", false); 

//             // Find all span tags inside the heading and remove their styles
//             setTimeout(() => {
//                 let spans = block.domNode.querySelectorAll("span[style]");
//                 spans.forEach((span) => {
//                     span.removeAttribute("style"); // Remove inline styles
//                 });
//             }, 0);
//         }
//     }
// });
// quill.on("selection-change", function (range) {
//     if (range) {
//         let [block] = quill.getLine(range.index);

//         if (block && block.domNode.tagName.match(/^H[1-6]$/)) {
//             // Remove font size formatting from the selection
//             quill.format("size", false);

//             // Remove inline styles but keep ql-cursor
//             setTimeout(() => {
//                 let spans = block.domNode.querySelectorAll("span[style]");
//                 spans.forEach((span) => {
//                     if (!span.classList.contains("ql-cursor")) {
//                         let parent = span.parentNode;
//                         while (span.firstChild) {
//                             parent.insertBefore(span.firstChild, span); // Move text outside span
//                         }
//                         parent.removeChild(span); // Remove empty span
//                     }
//                 });
//             }, 0);
//         }
//     }
// });

// quill.on("text-change", function (delta, oldDelta, source) {
//     if (source === "user") {
//         let selection = quill.getSelection();
//         if (selection) {
//             let [block] = quill.getLine(selection.index);

//             if (block && block.domNode.tagName.match(/^H[1-6]$/)) {
//                 // Remove font size formatting
//                 quill.format("size", false);

//                 // Remove inline styles instantly when heading is applied
//                 setTimeout(() => {
//                     let spans = block.domNode.querySelectorAll("span[style]");
//                     spans.forEach((span) => {
//                         if (!span.classList.contains("ql-cursor")) {
//                             let parent = span.parentNode;
//                             while (span.firstChild) {
//                                 parent.insertBefore(span.firstChild, span); // Move text outside span
//                             }
//                             parent.removeChild(span); // Remove empty span
//                         }
//                     });
//                 }, 0);
//             }
//         }
//     }
// });

quill.on("text-change", function (delta, oldDelta, source) {
    if (source === "user") {
        let selection = quill.getSelection();
        if (selection) {
            let [block] = quill.getLine(selection.index);

            if (block && block.domNode.tagName.match(/^H[1-6]$/)) {
                // Remove font size, text color, and background color
                quill.format("size", false);
                quill.format("color", false);
                quill.format("background", false);

                // Remove inline styles from spans inside headings
                setTimeout(() => {
                    let spans = block.domNode.querySelectorAll("span[style]");
                    spans.forEach((span) => {
                        if (!span.classList.contains("ql-cursor")) {
                            let parent = span.parentNode;
                            while (span.firstChild) {
                                parent.insertBefore(span.firstChild, span); // Move text outside span
                            }
                            parent.removeChild(span); // Remove empty span
                        }
                    });
                }, 0);
            }
        }
    }
});




            // ✅ Image Upload to Server
            quill.getModule("toolbar").addHandler("image", () => {
                let input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.click();

                input.onchange = async () => {
                    let file = input.files[0];
                    let formData = new FormData();
                    formData.append("file", file);

                    try {
                        let response = await fetch("{{ route('editor.upload') }}", { // Replace with actual Laravel route
                            method: "POST",
                            body: formData,
                            headers: {
                                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                            },
                        });

                        let result = await response.json();
                        let imageUrl = result.link;

                        let range = quill.getSelection();
                        quill.insertEmbed(range.index, "image", imageUrl);
                    } catch (error) {
                        console.error("Upload failed:", error);
                    }
                };
            });

            // Custom Element Handler
            quill.getModule("toolbar").addHandler("customElement", function (value) {
                if (value) {
                    const selection = quill.getSelection();
                    if (selection) {
                        quill.format("customElement", value);
                    }
                }
            });

            // Set initial Quill content from textarea
            setTimeout(() => {
                 quill.root.innerHTML = textarea.value;
            }, 100);

            // Update textarea before form submission
            form.addEventListener("submit", function () {
                textarea.value = quill.root.innerHTML;
            });

            // Track last edited heading
            let previousHeader = null;

            // quill.on("text-change", function () {
            //     setTimeout(() => {
            //         let selection = quill.getSelection();
            //         if (selection) {
            //             let [block] = quill.getLine(selection.index);

            //             if (block && block.domNode.tagName.match(/^H[1-6]$/)) {
            //                 let headerTag = block.domNode.tagName.toLowerCase();

            //                 if (previousHeader && previousHeader !== block.domNode) {
            //                     previousHeader.classList.remove(
            //                         "orange-h1", "orange-h2", "orange-h3",
            //                         "orange-h4", "orange-h5", "orange-h6"
            //                     );
            //                 }

            //                 block.domNode.classList.add(`orange-${headerTag}`);
            //                 previousHeader = block.domNode;
            //             }
            //         }
            //     }, 0);
            // });

            quill.on("text-change", function () {
    setTimeout(() => {
        let selection = quill.getSelection();
        if (selection) {
            let [block] = quill.getLine(selection.index);

            if (block && block.domNode.tagName.match(/^H[1-6]$/)) {
                let headerTag = block.domNode.tagName.toLowerCase();
                
                // Remove previous orange class only if it's different
                block.domNode.classList.forEach(cls => {
                    if (cls.startsWith("orange-") && cls !== `orange-${headerTag}`) {
                        block.domNode.classList.remove(cls);
                    }
                });

                // Add the correct class if it's not already added
                if (!block.domNode.classList.contains(`orange-${headerTag}`)) {
                    block.domNode.classList.add(`orange-${headerTag}`);
                }
            }
        }
    }, 0);
});

        }
    }

    // Initialize editors
    document.querySelectorAll(".desc-editor").forEach(function (editorDiv) {
        let editorId = editorDiv.id;
        let langCode = editorId.replace("desc-editor-", "");

        if (editorId === "desc-editor-en_all") {
                initializeEditor("desc-editor-en_all", "description_en_all", "#toolbar-en_all","custom-dropdown-en_all");
        } else { 
            initializeEditor(editorId, `description-${langCode}`, `#toolbar-${langCode}`, `custom-dropdown-${langCode}`);
        }
    });
});

    </script> --}}
    <script>
        $(document).ready(function() {
            $('.excerpt').summernote({
                tabsize: 2,
                height: 100,
                fontSizes: ['8', '10', '12', '14', '16', '18', '20', '24', '28', '32', '36', '40'],

            });
        });

        // $(document).ready(function() {
        //     $('.description').summernote({
        //         tabsize: 2,
        //         height: 150,
        //         fontSizes: ['8', '10', '12', '14', '16', '18', '20', '24', '28', '32', '36', '40'],
        //         toolbar: [
        //                 ['style', ['style']],
        //                 ['font', ['bold', 'italic', 'underline', 'clear']],
        //                 ['fontsize', ['fontsize']],  // Enable Font Size option
        //                 ['color', ['color']],
        //                 ['para', ['ul', 'ol', 'paragraph']],
        //                 ['height', ['height']],
        //                 ['insert', ['link', 'picture', 'video']],
        //                 ['view', ['fullscreen', 'codeview', 'help']]
        //             ],
        //         styleTags: [{
        //                 title: 'Paragraph',
        //                 tag: 'p',
        //                 value: 'p'
        //             },
        //             {
        //                 title: 'H1',
        //                 tag: 'h1',
        //                 value: 'h1',
        //                 className: 'orange-h1',
        //             },

        //             {
        //                 title: 'H2',
        //                 tag: 'h2',
        //                 value: 'h2',
        //                 className: 'orange-h2',
        //             },
        //             {
        //                 title: 'H3',
        //                 tag: 'h3',
        //                 value: 'h3',
        //                 className: 'orange-h3',
        //             },
        //             {
        //                 title: 'H4',
        //                 tag: 'h4',
        //                 value: 'h4',
        //                 className: 'orange-h4',
        //             },
        //             {
        //                 title: 'H5',
        //                 tag: 'h5',
        //                 value: 'h5',
        //                 className: 'orange-h5',
        //             },
        //             {
        //                 title: 'H6',
        //                 tag: 'h6',
        //                 value: 'h6',
        //                 className: 'orange-h6',
        //             },
        //             {
        //                 title: 'Block Quote',
        //                 tag: 'blockquote',
        //                 className: 'blockquote',
        //                 value: 'blockquote'
        //             },
        //             {
        //                 title: 'Code Block',
        //                 tag: 'pre',
        //                 className: 'code-block',
        //                 value: 'pre'
        //             }
        //         ],
        //         codemirror: { // codemirror options
        //             theme: 'monokai'
        //         },
        //     });
        // });
        // $('select').selectpicker();
    </script>























<script type="module">

    import {
        ClassicEditor,
        AccessibilityHelp,
        Alignment,
        Autoformat,
        AutoLink,
        Autosave,
        BalloonToolbar,
        BlockQuote,
        Bold,
        Code,
        Essentials,
        FindAndReplace,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        GeneralHtmlSupport,
        Heading,
        Highlight,
        HorizontalLine,
        Indent,
        IndentBlock,
        Italic,
        Link,
        Paragraph,
        RemoveFormat,
        SelectAll,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersLatin,
        SpecialCharactersMathematical,
        SpecialCharactersText,
        Strikethrough,
        Style,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        Underline,
        Undo,
        Image,
        ImageInsert,
        List,
        ImageStyle,
        ImageToolbar,
        ImageCaption,
        ImageResize,
        LinkImage,
        
    } from 'ckeditor5';
    class MyUploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }
  
        upload() {
            return this.loader.file
                .then(file => new Promise((resolve, reject) => {
                    const data = new FormData();
                    data.append('upload', file);
  
                    fetch("{{ route('editor.upload') }}", {
                            method: 'POST',
                            headers: {
                                'X-CSRF-TOKEN': '{{ csrf_token() }}'
                            },
                            body: data
                        })
                        .then(response => response.json())
                        .then(result => {
                            if (result.error) {
                                return reject(result.error.message);
                            }
                            resolve({
                                default: result.url
                            });
                        })
                        .catch(error => {
                            reject(error);
                        });
                }));
        }
  
        abort() {}
    }
  
    function MyUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new MyUploadAdapter(loader);
        };
    }
  
    document.addEventListener('DOMContentLoaded', function() {
  
        let editorConfig = {
  
            toolbar: {
                items: ['undo', 'redo', '|', 'heading', 'style', '|', 'fontSize', 'fontFamily', 'fontColor',
                    'fontBackgroundColor', '|', 'bold', 'italic', 'underline', '|', 'link',
                    'insertTable', 'highlight', 'blockQuote', '|', 'alignment', '|', 'outdent',
                    'indent', 'insertImage', 'bulletedList', 'numberedList',
                ],
                shouldNotGroupWhenFull: false
            },
            image: {
                toolbar: [
                    'imageStyle:alignLeft',
                    'imageStyle:alignCenter',
                    'imageStyle:alignRight',
                    '|',
                    'toggleImageCaption',
                    'imageTextAlternative',
                    '|',
                    'linkImage',
                ],
  
                insert: {
                    // If this setting is omitted, the editor defaults to 'block'.
                    // See explanation below.
                    type: 'auto'
                }
            },
  
            extraPlugins: [MyUploadAdapterPlugin],
            plugins: [AccessibilityHelp, Alignment, Autoformat, AutoLink, Autosave, BalloonToolbar,
                BlockQuote, Bold, Code, Essentials, FindAndReplace, FontBackgroundColor, FontColor,
                FontFamily, FontSize, GeneralHtmlSupport, Heading, Highlight, HorizontalLine, Indent,
                IndentBlock, Italic, Link, Paragraph, RemoveFormat, SelectAll, SpecialCharacters,
                SpecialCharactersArrows, SpecialCharactersCurrency, SpecialCharactersEssentials,
                SpecialCharactersLatin, SpecialCharactersMathematical, SpecialCharactersText,
                Strikethrough, Style, Subscript, Superscript, Table, TableCaption, TableCellProperties,
                TableColumnResize, TableProperties, TableToolbar, TextTransformation, Underline, Undo,
                Image, ImageInsert, List, ImageStyle, ImageToolbar, ImageCaption, ImageResize, LinkImage
            ],
  
            balloonToolbar: ['bold', 'italic', '|', 'link'],
            fontFamily: {
                supportAllValues: true
            },
            fontSize: {
                options: [10, 12, 14, 'default', 18, 20, 22],
                supportAllValues: true
            },
            heading: {
                options: [{
                        model: 'paragraph',
                        title: 'Paragraph',
                        class: 'ck-heading_paragraph'
                    },
                    {
                        model: 'heading1',
                        view: 'h1',
                        title: 'Heading 1',
                        class: 'ck-heading_heading1 orange-heading'
                        
                    },
                    {
                        model: 'heading2',
                        view: 'h2',
                        title: 'Heading 2',
                        class: 'ck-heading_heading2 orange-heading'
                    },
                    {
                        model: 'heading3',
                        view: 'h3',
                        title: 'Heading 3',
                        class: 'ck-heading_heading3 orange-heading'
                    },
                    {
                        model: 'heading4',
                        view: 'h4',
                        title: 'Heading 4',
                        class: 'ck-heading_heading4 orange-heading'
                    }
                ]
            },
            htmlSupport: {
                allow: [{
                    name: /^.*$/,
                    styles: true,
                    attributes: true,
                    classes: true
                }]
            },
            // initialData: `{!! $data !!}`,
            link: {
                addTargetToExternalLinks: true,
                defaultProtocol: 'https://',
                decorators: {
                    toggleDownloadable: {
                        mode: 'manual',
                        label: 'Downloadable',
                        attributes: {
                            download: 'file'
                        }
                    }
                }
            },
            menuBar: {
                isVisible: true
            },
            placeholder: 'Type or paste your content here!',
            style: {
                definitions: [{
                        name: 'Article category',
                        element: 'h3',
                        classes: ['category']
                    },
                    {
                        name: 'Title',
                        element: 'h2',
                        classes: ['document-title']
                    },
                    {
                        name: 'Subtitle',
                        element: 'h3',
                        classes: ['document-subtitle']
                    },
                    {
                        name: 'Info box',
                        element: 'p',
                        classes: ['info-box']
                    },
                    {
                        name: 'Side quote',
                        element: 'blockquote',
                        classes: ['side-quote']
                    },
                    {
                        name: 'Marker',
                        element: 'span',
                        classes: ['marker']
                    },
                    {
                        name: 'Spoiler',
                        element: 'span',
                        classes: ['spoiler']
                    },
                    {
                        name: 'Code (dark)',
                        element: 'pre',
                        classes: ['fancy-code', 'fancy-code-dark']
                    },
                    {
                        name: 'Code (bright)',
                        element: 'pre',
                        classes: ['fancy-code', 'fancy-code-bright']
                    }
                ]
            },
            table: {
                contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties',
                    'tableCellProperties'
                ]
            }
        };
        // let editor;
        // editor = ClassicEditor.create(document.querySelector('#description'), editorConfig)
        // window.editor = editor;
  
  
  
       
          document.querySelectorAll('.description').forEach(textarea => {
            // debugger
           editorConfig.initialData = textarea.value
              ClassicEditor
                  .create(textarea,editorConfig)
                  .then(editor => {
                      // Update textarea value on form submit
                      textarea.closest("form").addEventListener("submit", function () {
                          textarea.value = editor.getData();
                      });
                  })
                  .catch(error => {
                      console.error("CKEditor Error:", error);
                  });
          });
   
    });
  </script>
@endpush
