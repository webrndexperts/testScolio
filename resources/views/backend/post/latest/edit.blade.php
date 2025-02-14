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
            <form method="post" action="{{route('latestpost.update',$post->id)}}" enctype="multipart/form-data">
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
                <textarea class="form-control" id="description" name="description">{{$post->description}}</textarea>
                <div id="example"></div>
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

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/4.0.15/css/froala_editor.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/codemirror.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/froala-editor@latest/css/plugins/colors.min.css">
<link rel="stylesheet" href="{{ asset('editor/css/code_view.min.css') }}">

@endpush
@push('scripts')
<script src="/vendor/laravel-filemanager/js/stand-alone-button.js"></script>
<script src="{{asset('backend/summernote/summernote.min.js')}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
<!-- Place the first <script> tag in your HTML's <head> -->
  {{-- <script src="https://cdn.tiny.cloud/1/sz7uct0l3k449es9dqu5kn1e8bm563h0u8mj8og80wf94an5/tinymce/7/tinymce.min.js" referrerpolicy="origin"></script>
  <script>
  tinymce.init({
    selector: 'textarea#description',
    plugins: [
        'code', 'image', 'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 
        'searchreplace', 'table', 'visualblocks', 'wordcount'
    ],
    toolbar: 'undo redo | code | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | checklist numlist bullist indent outdent | removeformat',
    
    // ✅ Force Font Size to Use Pixels
    // font_size_formats: "10px 12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 32px 36px 40px 48px 60px 72px",
    font_size_formats: "9px 10px 11px 12px 14px 16px 18px 20px 22px 24px 32px 36px",
    font_size_input_default_unit: 'px', // Forces font size input to use px
  
    // ✅ Ensure headings also use pixels (px)
    formats: {
        h1: { block: 'h1', styles: { 'font-size': '22px' }, classes: 'orange-h1' },
        h2: { block: 'h2', styles: { 'font-size': '20px' }, classes: 'orange-h2' },
        h3: { block: 'h3', styles: { 'font-size': '18px' }, classes: 'orange-h3' },
        h4: { block: 'h4', styles: { 'font-size': '16px' }, classes: 'orange-h4' },
        h5: { block: 'h5', styles: { 'font-size': '14px' }, classes: 'orange-h5' },
        h6: { block: 'h6', styles: { 'font-size': '12px' }, classes: 'orange-h6' }
    },

    // ✅ Optional: Define heading styles
    style_formats: [
        {
            title: 'Headings',
            items: [
                { title: 'H1', block: 'h1', styles: { 'font-size': '22px' }, classes: 'orange-h1' },
                { title: 'H2', block: 'h2', styles: { 'font-size': '20px' }, classes: 'orange-h2' },
                { title: 'H3', block: 'h3', styles: { 'font-size': '18px' }, classes: 'orange-h3' },
                { title: 'H4', block: 'h4', styles: { 'font-size': '16px' }, classes: 'orange-h4' },
                { title: 'H5', block: 'h5', styles: { 'font-size': '14px' }, classes: 'orange-h5' },
                { title: 'H6', block: 'h6', styles: { 'font-size': '12px' }, classes: 'orange-h6' }
            ]
        }
    ],

    // ✅ Apply consistent styles in editor
    content_style: `
        .orange-h1 { color: #E97132; font-size: 22px; } 
        .orange-h2 { color: #E97132; font-size: 20px; } 
        .orange-h3 { color: #E97132; font-size: 18px; } 
        .orange-h4 { color: #E97132; font-size: 16px; } 
        .orange-h5 { color: #E97132; font-size: 14px; } 
        .orange-h6 { color: #E97132; font-size: 12px; }
    `,
    images_upload_url: `{{  route('upload.image') }}`, // Laravel route for image upload
    automatic_uploads: true,

    images_upload_handler: (blobInfo, progress) => {
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());

            fetch(`{{  route('upload.image') }}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP Error: ' + response.status);
                }
                return response.json();
            })
            .then(json => {
                if (!json || typeof json.location !== 'string') {
                    throw new Error('Invalid JSON: ' + JSON.stringify(json));
                }
                resolve(json.location); // Return the uploaded image URL
            })
            .catch(error => {
                reject(error.message || 'Image upload failed');
            });
        });
    }

});

</script> --}}



<script src="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/4.0.15/js/froala_editor.pkgd.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/codemirror.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/mode/xml/xml.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/froala-editor@latest/js/plugins/colors.min.js"></script>
<script type="text/javascript" src="{{ asset('editor/js/code_view.min.js') }}"></script>
<script>
         document.addEventListener("DOMContentLoaded", function () {
const editor = new FroalaEditor("#description", { documentReady: true,
  // pluginsEnabled: ['codeView'],
  toolbarButtons: [
        'undo', 'redo', '|', 
        'bold', 'italic', 'underline', 'strikeThrough', '|',
        'subscript', 'superscript', '|',
        'fontFamily', 'fontSize', 'textColor', 'backgroundColor', '|',
        'paragraphFormat', 'align', 'outdent', 'indent', 'lineHeight', '|',
        'formatOL', 'formatUL', 'quote', '|',
        'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|',
        'specialCharacters', 'embedly', 'emoticons', '|',
        'html', 'codeView',
        'fullscreen', 'print', 'help', '|',
        'clearFormatting','|','Elements'
    ],
    codeMirror: true ,
    enter: FroalaEditor.ENTER_DIV,  
    paragraphDefaultSelection: 'div', 
    imageUpload: true, 
    imageUploadURL: `{{  route('editor.upload') }}`, 
    requestHeaders: {
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
    },
  styleTags: {
        'h1': 'H1',
        'h2': 'H2',
        'h3': 'H3',
        'h4': 'H4',
        'h5': 'H5',
        'h6': 'H6',
        'p': 'Paragraph'
    },
    heightMin: 300,
    heightMax: 150,
    colorsStep: 10, 
    htmlAllowedAttrs: ['class','style'],
    events: {
        'initialized': function () {
            let editor = this;

            editor.$el.on('mouseup keyup', function () {
                let selectedElement = editor.selection.element();
                
                if (selectedElement.tagName === 'H1') {
                    selectedElement.classList.add('orange-h1'); 
                } 
                else if (selectedElement.tagName === 'H2') {
                    selectedElement.classList.add('orange-h2'); 
                }
                else if (selectedElement.tagName === 'H3') {
                    selectedElement.classList.add('orange-h3'); 
                }
                else if (selectedElement.tagName === 'H4') {
                    selectedElement.classList.add('orange-h4'); 
                }
                else if (selectedElement.tagName === 'H5') {
                    selectedElement.classList.add('orange-h5'); 
                }
                else if (selectedElement.tagName === 'H6') {
                    selectedElement.classList.add('orange-h6'); 
                }
            });
        },
    }


    
  });
  // ✅ **Add Custom Dropdown**
  FroalaEditor.RegisterCommand('Elements', {
      title: 'Insert Element',
      type: 'dropdown',
      icon: '<i class="fa fa-code"></i>', 
      options: {
          'p': 'Paragraph',
          'h1': 'H1',
          'h2': 'H2',
          'h3': 'H3',
          'h4': 'H4',
          'h5': 'H5',
          'h6': 'H6',
          'blockquote': 'Blockquote',
          'article': 'Article',
      },
      callback: function (cmd, val) {
          this.html.insert(`<${val} class="custom-element">${val} Content</${val}><br>`);
      },
      refreshAfterCallback: true
 });
});
</script>

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
@endpush