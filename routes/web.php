<?php

use App\Http\Controllers\NumberController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\Aws3BucketContoller;
use App\Http\Controllers\AbandonCartController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\MediaController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Auth::routes(['register'=>false]);
Route::group(['prefix' => 'admin'], function () {
    Auth::routes(['register' => false]);

Route::post('login','Auth\LoginController@customLogin')->name('login.custom_login');

// Route::get('/admin', function () {
// 	return redirect()->route('admin');
// })->middleware('auth');

Route::get('user/login','FrontendController@login')->name('login.form');
Route::post('user/login','FrontendController@loginSubmit')->name('login.submit');
Route::get('user/logout','FrontendController@logout')->name('user.logout');


// Socialite
Route::get('login/{provider}/', 'Auth\LoginController@redirect')->name('login.redirect');
Route::get('login/{provider}/callback/', 'Auth\LoginController@Callback')->name('login.callback');



Route::get('/cart',function(){
    return view('frontend.pages.cart');
})->name('cart');
Route::get('/checkout','CartController@checkout')->name('checkout')->middleware('user');
// Wishlist
// Route::get('/wishlist',function(){
    // return view('frontend.pages.wishlist');
// })->name('wishlist');
// Route::get('/wishlist/{slug}','WishlistController@wishlist')->name('add-to-wishlist')->middleware('user');
// Route::get('wishlist-delete/{id}','WishlistController@wishlistDelete')->name('wishlist-delete');
Route::post('cart/order','OrderController@store')->name('cart.order');
Route::get('order/pdf/{id}','OrderController@pdf')->name('order.pdf');
Route::get('/income','OrderController@incomeChart')->name('product.order.income');
// Route::get('/user/chart','AdminController@userPieChart')->name('user.piechart');

// Order Track
Route::get('/product/track','OrderController@orderTrack')->name('order.track');
Route::post('product/track/order','OrderController@productTrackOrder')->name('product.track.order');


// Product Review
Route::resource('/review','ProductReviewController');
//Route::post('product/{slug}/review','ProductReviewController@store')->name('review.store');

// Post Comment
Route::post('post/{slug}/comment','PostCommentController@store')->name('post-comment.store');
Route::resource('/comment','PostCommentController');
// Coupon
Route::post('/coupon-store','CouponController@couponStore')->name('coupon-store');
// Payment
Route::get('payment', 'PayPalController@payment')->name('payment');
Route::get('cancel', 'PayPalController@cancel')->name('payment.cancel');
Route::get('payment/success', 'PayPalController@success')->name('payment.success');


});

// Backend section start

Route::group(['prefix'=>'/admin','middleware'=>['auth','admin']],function(){
    
    

    Route::get('/','AdminController@index')->name('admin');
    Route::get('/file-manager',function(){
        return view('backend.layouts.file-manager');
    })->name('file-manager');
    // user route
    Route::resource('users','UsersController');
    Route::get('/test' ,[UsersController::class , 'test']);
	Route::post('/table-values', [UsersController::class, 'generateTable'])->name('forms.datatable');
    // Banner
    Route::resource('patients-worldwide','BannerController');
    // Brand
    Route::resource('brand','BrandController');

     // Brand
     Route::resource('language','CustomLanguageController');
    // Profile
    Route::get('/profile','AdminController@profile')->name('admin-profile');
    Route::post('/profile/{id}','AdminController@profileUpdate')->name('profile-update');
    // Category
    Route::resource('/category','CategoryController');
    // Product
    Route::resource('/product','ProductController');
	
	Route::get('file-upload', [ Aws3BucketContoller::class, 'getFileUploadForm' ])->name('get.fileupload');
    Route::post('file-upload', [ Aws3BucketContoller::class, 'store' ])->name('store.file');

	
	// Product Attributes
    Route::resource('/product-attributes','ProductAttributesController');
	// Ajax for sub attributes
    Route::post('/product-attributes/{id}/child','ProductAttributesController@getChildByParent');
    // Ajax for sub category
    Route::post('/category/{id}/child','CategoryController@getChildByParent');
    // POST category
    Route::resource('/post-category','PostCategoryController');
    // Post tag
    Route::resource('/post-tag','PostTagController');
    // Post
	//Route::get('/posts/{languageSlug}', 'PostController@showMenu')->name('posts.index');
	
    Route::resource('/post','PostController');
    Route::prefix('latest')->group(function () {
        Route::resource('latestpost', 'PostTestController');
    });    
    // Page
    Route::resource('/page','PageController');

	Route::post('/summer-note/uploadimage', 'PageController@summernoteUploadImage')->name('upload.image');
	
	// Menu
	Route::get('/menu', [MenuItemController::class, 'index'])->name('menu.index');
    Route::post('/menu/update-order', [MenuItemController::class, 'updateOrder'])->name('menu.updateOrder');

    // Accordions
        Route::resource('/accordions','AccordionsController');

    // Accordions category
    Route::resource('/accordions-category','AccordionsCategoryController');
	
	// Homepage Benifits
    Route::resource('/homepage-benifits','BenifitHomeController');
	
	// Header Menu
    Route::resource('/header-menu','HeaderController');
	// Header Main Title category
    Route::resource('/header-main-title','HeaderMainTitleController');
	// Header Sub Menu Title category
    Route::resource('/header-submenu-title','HeaderSubMenuController');

	// Footer Menu
    Route::resource('/footer-menu','FooterController');
	
	// Tax Products
    Route::resource('/tax','TaxController');
	
	// Widgets Menu
    Route::resource('/widgets','WidgetsController');
	
	// Media
	
	Route::get('/media', [MediaController::class, 'index'])->name('media.index');
	Route::post('/media/upload', [MediaController::class, 'upload'])->name('media.upload');
	Route::delete('/media/{id}', [MediaController::class, 'destroy'])->name('media.destroy');
	
	// Mailchimp Menu
    Route::resource('/mailchimp','MailchimpController');

    // Testimonials
    Route::resource('/testimonials','TestimonailsController');

    // Testimonials category
    Route::resource('/testimonials-category','TestimonailsCategoryController');
    
      // XRay-results
    Route::resource('/xrayresults','XRayResultController');

    // XRay-results category
    Route::resource('/xrayresults-category','XRayCategoryController');

    // Message
    Route::resource('/message','MessageController');
    Route::get('/message/five','MessageController@messageFive')->name('messages.five');
	
	// All Contact forms 
    Route::resource('/contact-form','ContactFormController');
	
	// All Google Reviews 
    Route::resource('/google-reviews','GoogleReviewsController');

    // Order
    Route::resource('/order','OrderController');
	Route::post('/order-table-values', [OrderController::class, 'ordergenerateTable'])->name('order.datatable');
    // Shipping
    Route::resource('/shipping','ShippingController');
	Route::get('/shipping-rates', 'ShippingController@getShippingRates')->name('shipping-rates');
	
	// Payment Method
    Route::get('/payment-method','ShippingController@indexPaymentMethod')->name('payment-method');
    Route::get('/payment-create','ShippingController@createPaymentMethod')->name('payment-create');
    Route::post('/payment-store','ShippingController@storePaymentMethod')->name('payment-store');
	Route::get('/payment-view/{id}','ShippingController@editPaymentMethod')->name('payment-view');
	Route::patch('/payment-update/{id}','ShippingController@updatePaymentMethod')->name('payment-update');
	Route::delete('/payment-delete/{id}','ShippingController@destroyPaymentMethod')->name('payment-delete');
	
	// Wishlist
	 Route::resource('wishlist', 'WishlistController'); 
	 Route::post('/wishlist-table-values', [WishlistController::class, 'wishlistgenerateTable'])->name('wishlist.datatable');
	
	// Abandon Cart
	 Route::resource('abandon-cart', 'AbandonCartController'); 
	 Route::get('abandoncart-sentmail/{id}', [AbandonCartController::class, 'abandoncartSentMail'])->name('abandoncart-sentmail'); 
	 Route::post('/abandon-table-values', [AbandonCartController::class, 'abandoncartgenerateTable'])->name('abandoncart.datatable');
	
    // Coupon
    Route::resource('/coupon','CouponController');
	Route::post('/coupon-table-values', [CouponController::class, 'coupongenerateTable'])->name('coupon.datatable');
    // Settings
    Route::get('settings','AdminController@settings')->name('settings');
    Route::post('setting/update','AdminController@settingsUpdate')->name('settings.update');

    // Notification
    Route::get('/notification/{id}','NotificationController@show')->name('admin.notification');
    Route::get('/notifications','NotificationController@index')->name('all.notification');
    Route::delete('/notification/{id}','NotificationController@delete')->name('notification.delete');
    // Password Change
    Route::get('change-password', 'AdminController@changePassword')->name('change.password.form');
    Route::post('change-password', 'AdminController@changPasswordStore')->name('change.password');
    Route::resource('numbers' , NumberController::class);
    Route::get('lang/{lang}', ['as' => 'lang.switch', 'uses' => 'App\Http\Controllers\LanguageController@switchLang']);
});






// User section start
Route::group(['prefix'=>'/user','middleware'=>['user']],function(){
    Route::get('/','HomeController@index')->name('user');
     // Profile
     Route::get('/profile','HomeController@profile')->name('user-profile');
     Route::post('/profile/{id}','HomeController@profileUpdate')->name('user-profile-update');
    //  Order
    Route::get('/order',"HomeController@orderIndex")->name('user.order.index');
    Route::get('/order/show/{id}',"HomeController@orderShow")->name('user.order.show');
    Route::delete('/order/delete/{id}','HomeController@userOrderDelete')->name('user.order.delete');
    // Product Review
    Route::get('/user-review','HomeController@productReviewIndex')->name('user.productreview.index');
    Route::delete('/user-review/delete/{id}','HomeController@productReviewDelete')->name('user.productreview.delete');
    Route::get('/user-review/edit/{id}','HomeController@productReviewEdit')->name('user.productreview.edit');
    Route::patch('/user-review/update/{id}','HomeController@productReviewUpdate')->name('user.productreview.update');

    // Post comment
    Route::get('user-post/comment','HomeController@userComment')->name('user.post-comment.index');
    Route::delete('user-post/comment/delete/{id}','HomeController@userCommentDelete')->name('user.post-comment.delete');
    Route::get('user-post/comment/edit/{id}','HomeController@userCommentEdit')->name('user.post-comment.edit');
    Route::patch('user-post/comment/udpate/{id}','HomeController@userCommentUpdate')->name('user.post-comment.update');

    // Password Change
    Route::get('change-password', 'HomeController@changePassword')->name('user.change.password.form');
    Route::post('change-password', 'HomeController@changPasswordStore')->name('change.password');

});

Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web', 'auth']], function () {
    \UniSharp\LaravelFilemanager\Lfm::routes();
});
/* Route For Render React Frontend */

Route::get('/{any}', function () {
    \Log::info('Request received', ['url' => request()->fullUrl()]);
    return view('react');  
})->where('any', '^(?!admin|user).*$');
/* End Route For Render React Frontend */