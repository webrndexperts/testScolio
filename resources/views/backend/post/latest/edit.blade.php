@extends('backend.layouts.master')

@section('main-content')
<style>
.main-seo-setting {
    border: 1px solid #5555;
    padding: 20px;
}
</style>

@if(session('success') || session('error'))

    <div class="row">
      <div class="col-md-12">
         @include('backend.layouts.notification')
      </div>
  </div>
@endif
@foreach ($languages as $code => $language)
@php
$postCount = $posts->where('lang', $language->code)->count();

@endphp
@if ($postCount > 0)

<div class="accordion-single js-acc-single">
  <div class="accordion-single-item js-acc-item">

    <h2 class="accordion-single-title js-acc-single-trigger">{{ $language->name }}
      <?php if (!empty($language->icon)) { ?>
        
        <img src="{{ $language->icon }}" alt="{{ $language->icon }}"> 
      <?php } ?>
    </h2>
    <div class="accordion-single-content">


@foreach ($posts as $post)
@if($language->code == $post->lang)
  
      <div class="card">
     
          <h5 class="card-header">Edit Post</h5>
          <div class="card-body">
            <form id="post-edit-{{ $post->id }}" method="post" action="{{route('latestpost.update',$post->id)}}" enctype="multipart/form-data">
              @csrf 
              @method('PATCH')
      
              <div class="form-group">
                <label for="inputTitle" class="col-form-label">Language</label>
                <input id="inputTitle" type="text"  value="{{$post->lang}}" class="form-control" readonly>
              </div>
      
              <div class="form-group">
                <label for="inputTitle" class="col-form-label">Title</label>
                <input id="inputTitle" type="text" name="title" placeholder="Enter title"  value="{{$post->title}}" class="form-control">
                @error('title')
                <span class="text-danger">{{$message}}</span>
                @enderror
              </div>
      
              <div class="form-group" style="display:none;">
                <label for="post_cat_id">Category</label>
                <select name="post_cat_id" class="form-control">
                    <option value="">--Select any category--</option>
                    @foreach($categories as $key=>$data)
                        <option value='{{$data->id}}' {{(($data->id==$post->post_cat_id)? 'selected' : '')}}>{{$data->title}}</option>
                    @endforeach
                </select>
              </div>
              <div class="form-group">
                <label for="description" class="col-form-label">Description</label>
             
              {{-- <div id="desc-editor">{!! $post->description !!}</div> --}}
              {{-- <div id="desc-editor-{{$post->id}}" class="desc-editor">{!! $post->description !!}</div>
              <textarea class="form-control description-textarea" id="description-{{$post->id}}" name="description" hidden>{{$post->description}}</textarea> --}}

                <textarea class="form-control" id="description" name="description" hidden>{{$post->description}}</textarea>
                @error('description')
                <span class="text-danger">{{$message}}</span>
                @enderror
              </div>
      
      
              <div class="form-group">
                <label for="excerpt" class="col-form-label">Excerpt</label>
                <textarea class="form-control" id="excerpt" name="excerpt">{{$post->summary}}</textarea>
                @error('excerpt')
                <span class="text-danger">{{$message}}</span>
                @enderror
              </div>
      
      
              {{-- {{$post->tags}} --}}
              @php 
                      $post_tags=explode(',',$post->tags);
                      // dd($tags);
                    @endphp
              <div class="form-group" style="display:none;">
                <label for="tags">Tag</label>
                <select name="tags[]" multiple  data-live-search="true" class="form-control selectpicker">
                    <option value="">--Select any tag--</option>
                    @foreach($tags as $key=>$data)
                    
                    <option value="{{$data->title}}"  {{(( in_array( "$data->title",$post_tags ) ) ? 'selected' : '')}}>{{$data->title}}</option>
                    @endforeach
                </select>
              </div>
       
              <div class="form-group">
                <label for="inputTitle" class="col-form-label">Featured View Image</label>
            <?php if(!empty($post->photo)){ ?>
              
              <img src="{{ $post->photo }}" alt="{{$post->photo}}" style="width:90px;">
            <?php }?>
              <input id="inputTitle" type="file" name="photo" class="form-control">
           <input id="inputTitle" type="text" name="photo" class="form-control" value="{{$post->photo}}" style="display:none;">
              </div>
      
              <div class="main-seo-setting">
            <h4> SEO Setting: </h4>
            <div class="form-group">
              <label for="inputTitle" class="col-form-label">Meta Title</label>
              <input type="text" name="seo_meta_title" value="{{$post->seo_meta_title}}"  class="form-control">
            </div> 
      
            <div class="form-group">
              <label for="inputTitle" class="col-form-label">Meta Description</label>
              <input type="text" name="seo_meta_description" value="{{$post->seo_meta_description}}"  class="form-control">
            </div> 
            
            <div class="form-group">
              <label for="inputTitle" class="col-form-label">Meta Keywords</label>
              <input type="text" name="seo_meta_tag" value="{{$post->seo_meta_tag}}"  class="form-control">
            </div> 
             </div>
      
      
              <div class="form-group">
                <label for="inputTitle" class="col-form-label">Post Slug</label>
                <input id="inputTitle" type="text" name="page_slug" value="{{$post->slug}}" class="form-control">
              </div> 
      
      
              <div class="form-group">
                <label for="added_by">Author</label>
                <select name="added_by" class="form-control">
                    <option value="">--Select any one--</option>
                    @foreach($users as $key=>$data)
                      <option value='{{$data->id}}' {{(($post->added_by==$data->id)? 'selected' : '')}}>{{$data->name}}</option>
                    @endforeach
                </select>
              </div>
                      
              <div class="form-group">
                <label for="status" class="col-form-label">Status</label>
                <select name="status" class="form-control">
                  <option value="active" {{(($post->status=='active')? 'selected' : '')}}>Publish</option>
                  <option value="inactive" {{(($post->status=='inactive')? 'selected' : '')}}>Draft</option>
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

@endif
@endforeach




    </div>
  </div>
</div>
@endif
@endforeach

@endsection

@push('styles')
<link rel="stylesheet" href="{{asset('backend/summernote/summernote.min.css')}}">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css" />
<style>
  h1, h1 * {
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

  .orange-heading {
    color: #E97132 !important;
  }

  .ck-dropdown__panel .ck-list {
    max-height: 200px !important; /* Adjust height as needed */
    overflow-y: auto !important; /* Enables vertical scrolling */
  }

  .ql-toolbar .ql-customElement {
    min-width: 120px; /* Adjust width */
    border: 1px solid #ccc;
    color: black;
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

{{-- Quill Style --}}
<link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.min.js"></script>
<link rel="stylesheet" href="https://cdn.ckeditor.com/ckeditor5/43.0.0/ckeditor5.css">

@endpush
@push('scripts')
<script src="/vendor/laravel-filemanager/js/stand-alone-button.js"></script>
<script src="{{asset('backend/summernote/summernote.min.js')}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>


{{-- CK Editor --}}
<script type="importmap">

  {

      "imports": {

          "ckeditor5": "https://cdn.ckeditor.com/ckeditor5/43.0.0/ckeditor5.js",

          "ckeditor5/": "https://cdn.ckeditor.com/ckeditor5/43.0.0/"

      }

  }

  </script>


{{-- Quill JS --}}
<script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>
<script src="https://cdn.jsdelivr.net/npm/quill-better-table@1.2.9/dist/quill-better-table.min.js"></script>

{{-- <script>
  let fontSizes = [];

  // Add sizes from 10px to 20px
  for (let i = 10; i <= 20; i++) {
      fontSizes.push(i + 'px');
  }

  // Add sizes from 22px to 40px, incrementing by 2px
  for (let i = 22; i <= 40; i += 2) {
      fontSizes.push(i + 'px');
  }

  document.addEventListener("DOMContentLoaded", function () {

    const containers = document.querySelectorAll(".desc-editor");
        // Register custom font sizes (PX values)
        Quill.register({
  'modules/better-table': quillBetterTable
}, true)
    var Size = Quill.import("attributors/style/size");
    Size.whitelist = fontSizes;
    Quill.register(Size, true);
    const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // Basic formatting
  ['blockquote'],
  ['link', 'image', 'video', 'formula'],            // Media options

  [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }, { 'header': 4 }, { 'header': 5 }, { 'header': 6 }],               // Header levels
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],  
  [{ 'script': 'sub'}, { 'script': 'super' }],      // Subscript/Superscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // Indent/Outdent
  [{ 'size': Size.whitelist }], // ✅ Now includes px values

  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],        // Header dropdown

  [{ 'color': [] }, { 'background': [] }],          // Text & Background color
  [{ 'font': [] }],                                 // Font family
  [{ 'align': [] }],                                // Alignment
  [{ 'table': true }],
  ['clean'],                                        // Remove formatting

];
    containers.forEach(function(editorDiv) {
      
      let editorId = editorDiv.id; 
        let postId = editorDiv.id.split("-").pop(); // Extract post ID

        let textareaId = editorId.replace("desc-editor-", "description-"); 
        let textarea = document.getElementById(`description-${postId}`);
        let form = document.getElementById(`post-edit-${postId}`);

      let quill = new Quill(`#${editorId}`, {
            modules: {
              'better-table': {
                    operationMenu: {
                        items: {
                            unmergeCells: {
                                text: 'Unmerge Cells'
                            }
                        }
                    }
                },
                table:true,
                toolbar: toolbarOptions,   // `#toolbar-${postId}`
            },  
            placeholder: "Start typing...",
            theme: "snow"
        });
        quill.keyboard.addBinding({
  key: 13, // Enter key
  handler: function(range) {
    quill.insertText(range.index, "\n"); // Inserts newline instead of <p>
    quill.setSelection(range.index + 1);
  }
});
let toolbar = quill.getModule('toolbar');

// Ensure toolbar exists before adding event listener
if (toolbar) {
    let tableButton = toolbar.container.querySelector('.ql-table');
    
    if (tableButton) {
        tableButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default behavior
            quill.getModule('better-table').insertTable(3, 3);
        });
    }
}

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
                  let response = await fetch("{{ route('editor.upload') }}", {
                method: "POST",  // ✅ Set the correct HTTP method
                body: formData,
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                },
            });

            let result = await response.json(); // ✅ Parse response as JSON
            let imageUrl = result.link; // ✅ Make sure your backend returns { link: "uploaded_image_url" }

                    let range = quill.getSelection();
                    quill.insertEmbed(range.index, "image", imageUrl);
                } catch (error) {
                    console.error("Upload failed:", error);
                }
            };
        });

        // ✅ Video Embed
        quill.getModule("toolbar").addHandler("video", () => {
            let url = prompt("Enter video URL:");
            if (url) {
                let range = quill.getSelection();
                quill.insertEmbed(range.index, "video", url);
            }
        });

        quill.getModule("toolbar").addHandler("customElement", function(value) {
    if (value) {
        const selection = quill.getSelection();
        if (selection) {
            quill.format("customElement", value);
        }
    }
});

        // Set initial Quill content from the textarea
        quill.root.innerHTML = textarea.value;

        // Update textarea before form submission
        form.addEventListener("submit", function() {
            textarea.value = quill.root.innerHTML;
        });

// quill.on('text-change', function() {
//     setTimeout(() => {
//         let selection = quill.getSelection();
//         if (selection) {
//             let [block] = quill.getLine(selection.index); // Get the selected block

//             if (block && block.domNode.tagName.match(/^H[1-6]$/)) {
//                 let headerTag = block.domNode.tagName.toLowerCase();

//                 // Remove previous classes from all headings
//                 quill.root.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(heading => {
//                     heading.classList.remove(
//                         "orange-h1", "orange-h2", "orange-h3",
//                         "orange-h4", "orange-h5", "orange-h6"
//                     );
//                 });

//                 // ✅ Add orange class to the currently selected heading
//                 block.domNode.classList.add(`orange-${headerTag}`);
//             }
//         }
//     }, 0); // ✅ Ensures execution happens instantly
// });

let previousHeader = null; // Store the last edited heading

quill.on("text-change", function () {
    setTimeout(() => {
        let selection = quill.getSelection();
        if (selection) {
            let [block] = quill.getLine(selection.index); // Get the selected block

            if (block && block.domNode.tagName.match(/^H[1-6]$/)) {
                let headerTag = block.domNode.tagName.toLowerCase();

                // ✅ If the new heading is different from the last one, remove class from the old one
                if (previousHeader && previousHeader !== block.domNode) {
                    previousHeader.classList.remove(
                        "orange-h1", "orange-h2", "orange-h3",
                        "orange-h4", "orange-h5", "orange-h6"
                    );
                }

                // ✅ Add orange class to the newly selected heading
                block.domNode.classList.add(`orange-${headerTag}`);

                // ✅ Update previousHeader to track the last edited heading
                previousHeader = block.domNode;
            }
        }
    }, 0);
});



    })
      });



</script> --}}

<script>

    // $(document).ready(function() {
    //     // Initialize Summernote for all description fields
    //     $('textarea[name="description"]').summernote({
    //         placeholder: "Write detailed description...",
    //         tabsize: 2,
    //         height: 150
    //     });

    //     // Initialize Summernote for all excerpt fields
    //     $('textarea[name="excerpt"]').summernote({
    //         placeholder: "Write a short description...",
    //         tabsize: 2,
    //         height: 150
    //     });
    // });



    // $(document).ready(function() {
    //             $('textarea[name="description"]').summernote({
    //                 placeholder: "Write detailed description...",
    //                 tabsize: 2,
    //                 height: 150,
    //                 fontSizeUnits: ['px'], // Force px
    //                 toolbar: [
    //                     ['style', ['style']],
    //                     ['font', ['bold', 'italic', 'underline', 'clear']],
    //                     ['fontsize', ['fontsize']], // Enable Font Size option
    //                     ['fontname', ['fontname']],
    //                     ['color', ['color']],
    //                     ['para', ['ul', 'ol', 'paragraph']],
    //                     ['height', ['height']],
    //                     ['insert', ['link', 'picture', 'video']],
    //                     ['view', ['fullscreen', 'codeview', 'help']]
    //                 ],
    //                 styleTags: [{
    //                         title: 'Paragraph',
    //                         tag: 'p',
    //                         value: 'p'
    //                     },
    //                     {
    //                         title: 'H1',
    //                         tag: 'h1',
    //                         value: 'h1',
    //                         className: 'orange-h1'
    //                     },
    //                     {
    //                         title: 'H2',
    //                         tag: 'h2',
    //                         value: 'h2',
    //                         className: 'orange-h2'
    //                     },
    //                     {
    //                         title: 'H3',
    //                         tag: 'h3',
    //                         value: 'h3',
    //                         className: 'orange-h3'
    //                     },
    //                     {
    //                         title: 'H4',
    //                         tag: 'h4',
    //                         value: 'h4',
    //                         className: 'orange-h4'
    //                     },
    //                     {
    //                         title: 'H5',
    //                         tag: 'h5',
    //                         value: 'h5',
    //                         className: 'orange-h5'
    //                     },
    //                     {
    //                         title: 'H6',
    //                         tag: 'h6',
    //                         value: 'h6',
    //                         className: 'orange-h6'
    //                     },
    //                     {
    //                         title: 'Block Quote',
    //                         tag: 'blockquote',
    //                         className: 'blockquote',
    //                         value: 'blockquote'
    //                     },
    //                     {
    //                         title: 'Code Block',
    //                         tag: 'pre',
    //                         className: 'code-block',
    //                         value: 'pre'
    //                     }
    //                 ],
    //                 callbacks: {
    //                     onInit: function() {
    //                         $('.note-editable').css('font-size',
    //                         '14px'); // Default font-size in px
    //                     }
    //                 }
    //             });

    //             $(document).on('click', '.dropdown-fontsize .dropdown-item', function(e) {
    //                 e.preventDefault(); // Prevent default behavior

    //                 let selectedSize = $(this).text().replace('px', '').trim(); // Get selected size
    //                 let finalSize = selectedSize + "px"; // Ensure it's in px

    //                 let selection = window.getSelection();
    //                 if (!selection.rangeCount) return;
    //                 let range = selection.getRangeAt(0);
    //                 let span = document.createElement("span");
    //                 span.style.fontSize = finalSize;
    //                 span.textContent = range.toString();

    //                 // range.deleteContents();
    //                 // range.insertNode(span);
    //                 if (span.textContent.length > 0) { // Only insert if content is not empty
    //         range.deleteContents();
    //         range.insertNode(span);
    //     }

    //             });

    //             // Initialize Summernote for all excerpt fields
    //             $('textarea[name="excerpt"]').summernote({
    //                 placeholder: "Write a short description...",
    //                 tabsize: 2,
    //                 height: 150,
    //                 fontSizeUnits: ['px'], // Force px
    //                 toolbar: [
    //                     ['style', ['style']],
    //                     ['font', ['bold', 'italic', 'underline', 'clear']],
    //                     ['fontsize', ['fontsize']], // Enable Font Size option
    //                     ['fontname', ['fontname']],
    //                     ['color', ['color']],
    //                     ['para', ['ul', 'ol', 'paragraph']],
    //                     ['height', ['height']],
    //                     ['insert', ['link', 'picture', 'video']],
    //                     ['view', ['fullscreen', 'codeview', 'help']]
    //                 ],
    //                 styleTags: [{
    //                         title: 'Paragraph',
    //                         tag: 'p',
    //                         value: 'p'
    //                     },
    //                     {
    //                         title: 'H1',
    //                         tag: 'h1',
    //                         value: 'h1',
    //                         className: 'orange-h1'
    //                     },
    //                     {
    //                         title: 'H2',
    //                         tag: 'h2',
    //                         value: 'h2',
    //                         className: 'orange-h2'
    //                     },
    //                     {
    //                         title: 'H3',
    //                         tag: 'h3',
    //                         value: 'h3',
    //                         className: 'orange-h3'
    //                     },
    //                     {
    //                         title: 'H4',
    //                         tag: 'h4',
    //                         value: 'h4',
    //                         className: 'orange-h4'
    //                     },
    //                     {
    //                         title: 'H5',
    //                         tag: 'h5',
    //                         value: 'h5',
    //                         className: 'orange-h5'
    //                     },
    //                     {
    //                         title: 'H6',
    //                         tag: 'h6',
    //                         value: 'h6',
    //                         className: 'orange-h6'
    //                     },
    //                     {
    //                         title: 'Block Quote',
    //                         tag: 'blockquote',
    //                         className: 'blockquote',
    //                         value: 'blockquote'
    //                     },
    //                     {
    //                         title: 'Code Block',
    //                         tag: 'pre',
    //                         className: 'code-block',
    //                         value: 'pre'
    //                     }
    //                 ],
    //                 callbacks: {
    //                     onInit: function() {
    //                         $('.note-editable').css('font-size',
    //                         '14px'); // Default font-size in px
    //                     }
    //                 }
    //             });
    //         });
    $(document).ready(function() {
    function stripEmptySpans(content) {
        return content.replace(/<span[^>]*>\s*<\/span>/gi, '').replace(/\u200B/g, '');
    }

    function convertBrToNewline(content) {
        return content.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>\s*<p>/gi, "\n\n");
    }

    function convertNewlineToBr(content) {
        return content.replace(/\n/g, "<br>");
    }

    function initializeSummernote(selector, placeholderText) {
        $(selector).summernote({
            placeholder: placeholderText,
            tabsize: 2,
            height: 150,
            fontSizeUnits: ['px'],
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                ['fontsize', ['fontsize']],
                ['fontname', ['fontname']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['fullscreen', 'codeview', 'help']]
            ],
            styleTags: [
                { title: 'Paragraph', tag: 'p', value: 'p' },
                { title: 'H1', tag: 'h1', value: 'h1', className: 'orange-h1' },
                { title: 'H2', tag: 'h2', value: 'h2', className: 'orange-h2' },
                { title: 'H3', tag: 'h3', value: 'h3', className: 'orange-h3' },
                { title: 'H4', tag: 'h4', value: 'h4', className: 'orange-h4' },
                { title: 'H5', tag: 'h5', value: 'h5', className: 'orange-h5' },
                { title: 'H6', tag: 'h6', value: 'h6', className: 'orange-h6' },
                { title: 'Block Quote', tag: 'blockquote', className: 'blockquote', value: 'blockquote' },
                { title: 'Code Block', tag: 'pre', className: 'code-block', value: 'pre' }
            ],
            shortcuts: false,      // Disables automatic paragraph shortcuts
    blockquoteBreakingLevel: 2, // Prevents breaking into <p> when pressing Enter
    enter: 'br',           // Uses <br> instead of <p> when pressing Enter
    lineHeights: false ,    // Disables line-height auto-wrapping
            callbacks: {
                onInit: function() {
                    let editor = $(this);
                    setTimeout(function() {
                        // Remove auto <p><br></p> when empty
                        let content = editor.summernote('code');
                        if ($.trim(content) === '<p><br></p>') {
                            editor.summernote('code', '');
                        }
                    }, 100);
                },
                onKeydown: function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        document.execCommand('insertHTML', false, '<br><br>'); // Insert only <br> instead of <p>
                    }
                },
                onBlur: function() {
                    let editor = $(this);
                    let content = editor.summernote('code');
                    
                    // Prevent saving <p><br></p> when empty
                    if ($.trim(content) === '<p><br></p>') {
                        editor.summernote('code', '');
                    }
                }
            },

        });
    }

    // Initialize Summernote for individual textareas
    // initializeSummernote('textarea[name="description"]', "Write detailed description...");
    initializeSummernote('textarea[name="excerpt"]', "Write a short description...");

    // $(document).on('click', '.dropdown-fontsize .dropdown-item', function(e) {
    //     e.preventDefault();

    //     let selectedSize = $(this).text().replace('px', '').trim();
    //     let finalSize = selectedSize + "px";

    //     let selection = window.getSelection();
    //     if (!selection.rangeCount || selection.isCollapsed) return;

    //     let range = selection.getRangeAt(0);
    //     let span = document.createElement("span");
    //     span.style.fontSize = finalSize;
    //     span.textContent = range.toString().trim();

    //     if (span.textContent.length > 0) {
    //         range.deleteContents();
    //         range.insertNode(span);
    //     }
    // });


                 $(document).on('click', '.dropdown-fontsize .dropdown-item', function(e) {
                    e.preventDefault(); // Prevent default behavior

                    let selectedSize = $(this).text().replace('px', '').trim(); // Get selected size
                    let finalSize = selectedSize + "px"; // Ensure it's in px

                    let selection = window.getSelection();
                    if (!selection.rangeCount) return;
                    let range = selection.getRangeAt(0);
                    let span = document.createElement("span");
                    span.style.fontSize = finalSize;
                    span.textContent = range.toString();

                    // range.deleteContents();
                    // range.insertNode(span);
                    if (span.textContent.length > 0) { // Only insert if content is not empty
            range.deleteContents();
            range.insertNode(span);
        }  });

});


      
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
              // options: [10, 12, 14, 'default', 18, 20, 22],
              options: [
                ...Array.from({ length: 11 }, (_, i) => (10 + i) + 'px'),  // 10px to 20px
                ...Array.from({ length: 10 }, (_, i) => (22 + i * 2) + 'px') // 22px to 40px (increment by 2)
            ],
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



     
        document.querySelectorAll('textarea[name="description"]').forEach(textarea => {
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