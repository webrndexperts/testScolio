<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
   <!-- Sidebar - Brand -->
   <a class="sidebar-brand d-flex align-items-center justify-content-center" href="{{route('admin')}}">
      <div class="sidebar-brand-icon">
         <img src="{{asset('/custom_images/logo.png')}}" style="max-width: 35px;"class="logo-icon">
		  <img  src="{{asset('/custom_images/logo_en_AU.webp')}}" style="max-width: 130px;"class="logo-img">
      </div>
   </a>
   <!-- Divider -->
   <hr class="sidebar-divider my-0">
   <!-- Nav Item - Dashboard -->
   <li class="nav-item active">
      <a class="nav-link" href="{{route('admin')}}">
      <i class="fas fa-fw fa-tachometer-alt"></i>
      <span>{{__('messages.dashboard')}}</span></a>
	    <div id="dashboard" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="{{route('admin')}}">dashboard</a>
         </div>
      </div>
   </li>
   <!-- Divider -->
   <hr class="sidebar-divider">
   <!-- Heading -->
   <div class="sidebar-heading" style="display:none;">
      Banner
   </div>
   <!-- Nav Item - Pages Collapse Menu -->
   <!-- Nav Item - Charts -->
   <li class="nav-item" style="display:none;">
      <a class="nav-link" href="{{route('file-manager')}}">
      <i class="fas fa-fw fa-chart-area"></i>
      <span>Media Manager</span></a>
   </li>
   <li class="nav-item" style="display:none;">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
      <i class="fas fa-image"></i>
      <span>Patients Worldwide</span>
      </a>
      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Patients Worldwide Options:</h6>
            <a class="collapse-item" href="{{route('patients-worldwide.index')}}">Banners</a>
            <a class="collapse-item" href="{{route('patients-worldwide.create')}}">Add Banners</a>
         </div>
      </div>
   </li>

        <!-- Abandon Cart -->
   <li class="nav-item">
      <a class="nav-link" href="{{route('media.index')}}">
      <img src="https://sladmin.scoliolife.com/images/dashicons-admin-media.svg">
      <span> Media</span></a>
   </li>
   
   <!-- Posts -->
   <li class="nav-item ">
      <a class="nav-link collapsed " href="{{route('post.index', ['lang' => 'en_SG'])}}" data-toggle="" data-target="#postCollapse" aria-expanded="true" aria-controls="postCollapse">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16">
            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
         </svg>
         <span>Posts</span>
      </a>
      <div id="postCollapse" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="{{route('post.index', ['lang' => 'en_SG'])}}">Posts</a>
            <a class="collapse-item" href="{{route('post.create')}}">Add Post</a>
            <a class="collapse-item" href="{{route('post-category.index')}}">Category</a>
         </div>
      </div>
   </li>
   <!-- Pages -->
   <li class="nav-item">
      <a class="nav-link collapsed" href="{{route('page.index', ['lang' => 'en_SG'])}}" data-toggle="" data-target="#pageCollapse" aria-expanded="true" aria-controls="pageCollapse">
      <i class="fas fa-fw fa-file"></i>
      <span>Pages</span>
      </a>
      <div id="pageCollapse" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="{{route('page.index', ['lang' => 'en_SG'])}}" >Pages</a>
            <a class="collapse-item" href="{{route('page.create')}}">Add Page</a>
         </div>
      </div>
   </li>
   <!-- Pages -->
   <li class="nav-item">
      <a class="nav-link collapsed" href="{{route('xrayresults.index', ['lang' => 'en_SG'])}}" data-toggle="" data-target="#xrayCollapse" aria-expanded="true" aria-controls="xrayCollapse">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16">
            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
         </svg>
         <span>Case Studies</span>
      </a>
      <div id="xrayCollapse" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="{{route('xrayresults.index', ['lang' => 'en_SG'])}}">All Case Studies</a>
            <a class="collapse-item" href="{{route('xrayresults.create')}}">Add New</a>
            <a class="collapse-item" href="{{route('xrayresults-category.index')}}">Category</a>
         </div>
      </div>
   </li>
   <!-- Pages -->
   <li class="nav-item">
      <a class="nav-link collapsed" href="{{route('testimonials.index',['lang' => 'en_SG'])}}" data-toggle="" data-target="#TestimonialsCollapse" aria-expanded="true" aria-controls="TestimonialsCollapse">
      <i class="fas fa-fw fa-quote-left"></i>
      <span>Testimonials</span>
      </a>
      <div id="TestimonialsCollapse" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="{{route('testimonials.index',['lang' => 'en_SG'])}}">All Testimonials</a>
            <a class="collapse-item" href="{{route('testimonials.create')}}">Add Testimonials</a>
            <a class="collapse-item" href="{{route('testimonials-category.index')}}">Category</a>
         </div>
      </div>
   </li>

      <li class="nav-item">
      <a class="nav-link collapsed" href="{{route('patients-worldwide.index', ['lang' => 'en_SG'])}}" data-toggle="" data-target="#PatientsWorldwideCollapse" aria-expanded="true" aria-controls="pageCollapse">
      <i class="fas fa-fw fa-file"></i>
      <span>Patients Worldwide</span>
      </a>
      <div id="PatientsWorldwideCollapse" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="{{route('patients-worldwide.index', ['lang' => 'en_SG'])}}">Patients Worldwide</a>
         </div>
      </div>
   </li>

   <!-- Tags -->
   <li class="nav-item" style="display:none;">
      <a class="nav-link collapsed" href="{{route('post-tag.index')}}" data-toggle="" data-target="#tagCollapse" aria-expanded="true" aria-controls="tagCollapse">
      <i class="fas fa-tags fa-folder"></i>
      <span>Tags</span>
      </a>
      <div id="tagCollapse" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Tag Options:</h6>
            <a class="collapse-item" href="{{route('post-tag.index')}}">Tag</a>
            <a class="collapse-item" href="{{route('post-tag.create')}}">Add Tag</a>
         </div>
      </div>
   </li>
   {{-- Front Homepage--}}
   <li class="nav-item">
      <a class="nav-link collapsed" href="{{route('homepage-benifits.index',['lang' => 'en_SG'])}}" data-toggle="" data-target="#homepageCollapse" aria-expanded="true" aria-controls="homepageCollapse">
      <i class="fas fa-home fa-fw"></i>         
      <span>Homepage Sections</span>
      </a>
      <div id="homepageCollapse" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="{{route('homepage-benifits.index',['lang' => 'en_SG'])}}">Homepage Benifits</a>
			 <a class="collapse-item" href="{{route('widgets.index', ['lang' => 'en_SG'])}}">Widgets Menus</a>
			 <a class="collapse-item" href="{{route('accordions.index', ['lang' => 'en_SG'])}}">All Accordions</a>
			 <a class="collapse-item" href="{{route('accordions-category.index')}}">Accordions Category</a>
         </div>
      </div>
   </li>
      <!-- Accordions -->
   <li class="nav-item" style="display:none;">
      <a class="nav-link collapsed" href="{{route('accordions.index')}}" data-toggle="" data-target="#AccordionsFaQCollapse" aria-expanded="true" aria-controls="AccordionsFaQCollapse">
      <i class="fas fa-fw fa-question"></i>
      <span>Accordions FAQ</span>
      </a>
      <div id="AccordionsFaQCollapse" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="{{route('accordions.index')}}">All Accordions</a>
            <a class="collapse-item" href="{{route('accordions-category.index')}}">Accordions Category</a>
         </div>
      </div>
   </li>
   {{-- Header Menus--}}
   <li class="nav-item" style="display:none;">
      <a class="nav-link collapsed" href="{{route('header-main-title.index')}}" data-toggle="" data-target="#headerCollapse" aria-expanded="true" aria-controls="headerCollapse">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16">
            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
         </svg>
      <span>Header Menus</span>
      </a>
      <div id="headerCollapse" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="{{route('header-main-title.index')}}">Header Main Titles</a>
            <a class="collapse-item" href="{{route('header-submenu-title.index')}}">Header Sub Main Titles</a>
            <a class="collapse-item" href="{{route('header-menu.index')}}">Header Menus</a>
         </div>
      </div>
   </li>
   
    {{-- Menus--}}
   <li class="nav-item">
      <a class="nav-link collapsed" href="{{route('menu.index', ['menu' => 1, 'lang' => 'en_SG'])}}" data-toggle="" data-target="#MenusCollapse" aria-expanded="true" aria-controls="footerCollapse">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16">
            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
         </svg>
      <span>Menus</span>
      </a>
      <div id="MenusCollapse" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="{{route('menu.index', ['menu' => 1, 'lang' => 'en_SG'])}}">Menus List</a>
         </div>
      </div>
   </li>

   {{-- Footer Menus--}}
   <li class="nav-item" style="display:none;">
      <a class="nav-link collapsed" href="{{route('footer-menu.index')}}" data-toggle="" data-target="#footerCollapse" aria-expanded="true" aria-controls="footerCollapse">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16">
            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
         </svg>
      <span>Footer Menus</span>
      </a>
      <div id="footerCollapse" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="{{route('footer-menu.index')}}">Footer Menus List</a>
         </div>
      </div>
   </li>
   
   {{-- Products --}}
   <li class="nav-item">
      <a class="nav-link collapsed" href="{{route('product.index',['lang' => 'en_SG'])}}" data-toggle="" data-target="#productCollapse" aria-expanded="true" aria-controls="productCollapse">
      <i class="fas fa-cubes"></i>
      <span>Products</span>
      </a>
      <div id="productCollapse" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Product Options:</h6>
            <a class="collapse-item" href="{{route('product.index',['lang' => 'en_SG'])}}">All Products</a>
            <a class="collapse-item" href="{{route('product.create')}}">Add Product</a>
			<a class="collapse-item" href="{{route('category.index')}}">Category</a>
			<a class="collapse-item" href="{{route('product-attributes.index')}}">Attributes</a>
			
         </div>
      </div>
   </li>

    <!-- Coupon -->
   <li class="nav-item">
      <a class="nav-link" href="{{route('coupon.index')}}">
      <i class="fas fa-table"></i>
      <span>Coupon</span></a>
   </li>
         <!--Orders -->
   <li class="nav-item" >
      <a class="nav-link" href="{{route('order.index')}}">
      <i class="fas fa-hammer fa-chart-area"></i>
      <span>Orders</span>
      </a>
   </li>
   
@php
    $segment1 = Request::segment(1);
    $instaUsers = ['tax'];
@endphp

<li class="nav-item {{ in_array($segment1, $instaUsers) ? 'child-active' : '' }}">
    <a class="nav-link" href="{{ route('tax.index') }}">
        <i class="fas fa-table"></i>
        <span>Tax</span>
    </a>
</li>


  <!-- WishList -->
   <li class="nav-item">
      <a class="nav-link" href="{{route('wishlist.index')}}">
      <i class="far fa-heart"></i>
      <span>Wish List</span></a>
   </li>
  
   
         {{-- Shipping Methods--}}
   <!--li class="nav-item">
      <a class="nav-link collapsed" href="{{route('shipping.index')}}" data-toggle="" data-target="#ShippingMethodCollapse" aria-expanded="true" aria-controls="ShippingMethodCollapse">
      <i class="fas fa-truck"></i>
      <span>Shipping Methods </span>
      </a>
      <div id="ShippingMethodCollapse" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="{{route('shipping.index')}}">EasyShip Api</a>
         </div>
      </div>
   </li>
   
   
   
         {{-- Payment Methods  --}}
   <li class="nav-item">
      <a class="nav-link collapsed" href="{{route('payment-method')}}" data-toggle="" data-target="#PaymentMethodCollapse" aria-expanded="true" aria-controls="PaymentMethodCollapse">
      <i class="fas fa-recycle nav-icon"></i>
      <span>Payment Methods</span>
      </a>
      <div id="PaymentMethodCollapse" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="{{route('payment-method')}}">Stripe Api</a>
         </div>
      </div>
   </li>
   
     
  
     {{-- Mailchimp Api--}}
   <li class="nav-item">
      <a class="nav-link collapsed" href="{{route('mailchimp.index')}}" data-toggle="" data-target="#footerCollapse" aria-expanded="true" aria-controls="footerCollapse">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16">
            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
         </svg>
      <span>Mailchimp settings</span>
      </a>
      <div id="footerCollapse" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="{{route('mailchimp.index')}}">Mailchimp Api settings</a>
         </div>
      </div>
   </li-->
   
       {{-- Contact Form --}}
   <li class="nav-item">
      <a class="nav-link collapsed" href="{{route('contact-form.index',['lang' => 'en_SG'])}}" data-toggle="" data-target="#ContactFormCollapse" aria-expanded="true" aria-controls="ContactFormCollapse">
      <i class="fas fa-cubes"></i>
      <span>Contact Form</span>
      </a>
      <div id="ContactFormCollapse" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="{{route('contact-form.index',['lang' => 'en_SG'])}}">Contact Form</a>
         </div>
      </div>
   </li>
   

   <!-- Reviews -->
   <li class="nav-item">
      <a class="nav-link" href="{{route('review.index')}}">
      <i class="fas fa-comments"></i>
      <span>Product Reviews</span></a>
   </li>

   <!-- Google Reviews -->
   <li class="nav-item">
      <a class="nav-link" href="{{route('google-reviews.index')}}">
      <i class="fas fa-comments fa-chart-area"></i>
      <span>Google Reviews</span>
      </a>
   </li>
  
        <!-- Abandon Cart -->
   <li class="nav-item">
      <a class="nav-link" href="{{route('abandon-cart.index')}}">
      <i class="fas fa-shopping-cart"></i>
      <span>Abandon Cart</span></a>
   </li>
  
   <!-- Users -->
   <li class="nav-item">
      <a class="nav-link" href="{{route('users.index')}}">
      <i class="fas fa-users"></i>
      <span>Users</span></a>
   </li>
   <!-- Users -->
   <li class="nav-item">
      <a class="nav-link" href="{{route('numbers.create',['lang' => 'en_SG'])}}">
      <i class="fas fa-users"></i>
      <span>Numbers</span></a>
   </li>
   {{-- Language --}}
   <li class="nav-item">
      <a class="nav-link collapsed" href="{{route('language.index')}}" data-toggle="" data-target="#languageCollapse" aria-expanded="true" aria-controls="languageCollapse">
      <i class="fas fa-language nav-icon"></i>
      <span>Languages</span>
      </a>
      <div id="languageCollapse" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
         <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Languages Options:</h6>
            <a class="collapse-item" href="{{route('language.index')}}">Languages</a>
            <a class="collapse-item" href="{{route('language.create')}}">Add Languages</a>
         </div>
      </div>
   </li>
   <!-- General settings -->
   <li class="nav-item">
      <a class="nav-link" href="{{route('settings')}}">
      <i class="fas fa-cog"></i>
      <span>Settings</span></a>
   </li>
   <!-- Sidebar Toggler (Sidebar) -->
   <li class="nav-item">
      <div class="text-center d-none d-md-inline menu-span">
         <button class="rounded-circle border-0" id="sidebarToggle"></button>
         <span >Collapse menu</span>
      </div>
   </li>
</ul>