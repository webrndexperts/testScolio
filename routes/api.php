<?php

use App\Http\Controllers\NumberController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\AccordionController;
use App\Http\Controllers\API\PageController;
use App\Http\Controllers\API\LanguageController;
use App\Http\Controllers\API\TestimonialController;
use App\Http\Controllers\API\HeaderMenuController;
use App\Http\Controllers\API\MenuItemController;
use App\Http\Controllers\API\FooterMenuController;
use App\Http\Controllers\API\BenifitsHomepageController;
use App\Http\Controllers\API\ContactFormController;
use App\Http\Controllers\API\XRayController;
use App\Http\Controllers\API\WidgetsApiController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\UsersControllerAPIController;

use App\Http\Controllers\AbandonCartController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\ProductReviewController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\TaxController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\GoogleReviewsController;
use App\Http\Controllers\Auth\ForgotPasswordController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('v1')->group(function () {
    Route::get('endpoint', [PostController::class, 'index']);
    Route::get('number/get', [NumberController::class,'getNumber']);
  	
    /*
	|--------------------------------------------------------------------------
	| Reset Passwords Api's
	|--------------------------------------------------------------------------
	|
	*/
    Route::prefix('reset')->group(function () {
    	Route::post('/forgot', [ForgotPasswordController::class, 'forgotPassword']);
    	Route::get('/check-token/{token}/{email}', [ForgotPasswordController::class, 'checkToken']);
    	Route::post('/change-password', [ForgotPasswordController::class, 'resetPassword']);
    });




/*
|--------------------------------------------------------------------------
|get all post Apis for article page
|--------------------------------------------------------------------------
|
*/
    Route::apiResource('posts', PostController::class);
    Route::get('posts/filter/{language}', [PostController::class, 'filterByLanguage']);
    Route::get('posts/{slug}/{language}', [PostController::class, 'show']);
	Route::get('post_all_slug/{id}', [PostController::class, 'singleSlugPost']);


/*
|--------------------------------------------------------------------------
|get all page Apis for inner page
|--------------------------------------------------------------------------
|
*/

    Route::apiResource('pages', PageController::class);
	
    Route::get('pages/filter/{language}', [PageController::class, 'filterByLanguage']);
	Route::get('pages/{slug}/filter/{language}', [PageController::class, 'show']);

/*
|--------------------------------------------------------------------------
|get all testimonials Apis for Testimonials page
|--------------------------------------------------------------------------
|
*/

    Route::resource('testimonials', TestimonialController::class);
    Route::get('testimonials/filter/{language}', [TestimonialController::class, 'filterByLanguage']);
	
    Route::get('patients-worldwide/filter/{language}', [TestimonialController::class, 'BannerfilterByLanguage']);
	
	Route::get('print_appearances_section/filter/{language}', [BannerController::class, 'printAppearancesfilterByLanguage']);
	
	Route::get('media_personalities_section/filter/{language}', [BannerController::class, 'mediabPersonalitiesfilterByLanguage']);
	Route::get('radio_tv_section/filter/{language}', [BannerController::class, 'radiotvInterviewsfilterByLanguage']);
	
	
	





	/*
|--------------------------------------------------------------------------
|Header Nav Menu Apis
|--------------------------------------------------------------------------
|
*/
	
	Route::resource('headermenu', HeaderMenuController::class);
	
	Route::resource('menuitem', MenuItemController::class);
	Route::get('menuitem/header/{language}', [MenuItemController::class, 'headerMenufilterByLanguage']); 
	Route::get('menuitem/footer/{language}', [MenuItemController::class, 'footerMenufilterByLanguage']); 
	
	
    Route::get('headermenu/filter/{language}', [HeaderMenuController::class, 'filterByLanguage']);

	/*
|--------------------------------------------------------------------------
|Start Homapage Apis
|--------------------------------------------------------------------------
|
*/
	
	Route::resource('benifitshomepage', BenifitsHomepageController::class);
    Route::get('benifitshomepage/filter/{language}', [BenifitsHomepageController::class, 'filterByLanguageBenifits']);


    Route::get('nontreatment', [BenifitsHomepageController::class, 'nonTreatment']);
    Route::get('nontreatment/filter/{language}', [BenifitsHomepageController::class, 'filterByLanguagenonTreatment']);  

	Route::get('specailoffer', [BenifitsHomepageController::class, 'SpecailOffer']);
    Route::get('specailoffer/filter/{language}', [BenifitsHomepageController::class, 'filterByLanguageSpecailOffer']);
	
	Route::get('praisepatients/filter/{language}', [BenifitsHomepageController::class, 'filterByLanguagePraisePatients']);
	
		
	Route::resource('accordions', AccordionController::class);
	Route::get('accordions/filter/{language}', [AccordionController::class, 'filterByLanguage']);
    Route::get('accordions-pages/{slug}/{language}', [AccordionController::class, 'pagesByFaq']);
	
	
	/*
|--------------------------------------------------------------------------
|Start Footer Widget Apis for Address Information
|--------------------------------------------------------------------------
|
*/
	
	Route::get('contactinfo', [WidgetsApiController::class, 'ContactInfoWidget']);
	Route::get('contactinfo/filter/{language}', [WidgetsApiController::class, 'filterByLanguageContactWidgetInfo']);  
	
	Route::get('telephonewidget', [WidgetsApiController::class, 'TelephoneWidget']);
	Route::get('telephonewidget/filter/{language}', [WidgetsApiController::class, 'filterByLanguageTelephoneWidget']);  
	
	Route::get('openinghourswidget', [WidgetsApiController::class, 'OpeningHoursWidget']);
	
	Route::get('openinghourswidget/filter/{language}', [WidgetsApiController::class, 'filterByLanguageOpeningHoursWidget']);  
	
	/*
|--------------------------------------------------------------------------
|Google Reviews Apis 
|--------------------------------------------------------------------------
|
*/	

Route::get('googlereviews/filter/{language}', [GoogleReviewsController::class, 'googlereviewFilterByLanguage']);  


/*
|--------------------------------------------------------------------------
|Sidebar Widget Apis 
|--------------------------------------------------------------------------
|
*/

   Route::get('resultssidebar', [WidgetsApiController::class, 'ScoliosisResultsSidebarWidget']);
   Route::get('resultssidebar/filter/{language}', [WidgetsApiController::class, 'filterByLanguageScoliosisResultsSidebar']); 

   Route::get('ourpromisesidebar', [WidgetsApiController::class, 'OurPromiseSidebarWidget']);
   Route::get('ourpromisesidebar/filter/{language}', [WidgetsApiController::class, 'filterByLanguageOurPromiseSidebar']);   
   
   Route::get('bottomimagesidebar/filter/{language}', [WidgetsApiController::class, 'filterByBottomImage']);     
   


/*
|--------------------------------------------------------------------------
| Footer Menu Apis 
|--------------------------------------------------------------------------
|
*/

    Route::resource('footermenu', FooterMenuController::class);
    Route::get('footermenu/filter/{language}', [FooterMenuController::class, 'filterByLanguage']);
	
	Route::resource('widgets', WidgetsApiController::class);
    Route::get('widgets/filter/{language}', [WidgetsApiController::class, 'filterByLanguage']);


/*
|--------------------------------------------------------------------------
| Language Menu Apis 
|--------------------------------------------------------------------------
|
*/

    Route::resource('languages', LanguageController::class);
    Route::get('languages/filter/{language}', [LanguageController::class, 'filterBySingleLanguage']);
	
/*
|--------------------------------------------------------------------------
| Coupons Code Api 
|--------------------------------------------------------------------------
|
*/

     Route::post('coupons-code', [CouponController::class, 'couponStore']);
     Route::post('check-coupon', [CouponController::class, 'checkCoupon']);
	 
	 
	 
/*
|--------------------------------------------------------------------------
| Tax Product Api 
|--------------------------------------------------------------------------
|
*/

     Route::get('tax-product', [TaxController::class, 'taxDeatils']);
	 
	 
/*
|--------------------------------------------------------------------------
| Shipping Rates Api 
|--------------------------------------------------------------------------
|
*/

     Route::post('shipping-rates', [ShippingController::class, 'getShippingRates']);	 
     Route::get('shipping-list', [ShippingController::class, 'getShippingList']);	 
     Route::post('stripe-payment', [ShippingController::class, 'processPayment']);	 

     Route::post('payment-intent', [ShippingController::class, 'processAllPay']);
	 
	 
	 
/*
|--------------------------------------------------------------------------
| Orders data Api 
|--------------------------------------------------------------------------
|
*/

     Route::post('orders-checkout', [OrderController::class, 'store']);	 
     Route::get('single-order-info/{id}', [OrderController::class, 'singleOrderShowAPi']);
       Route::get('allOrder-byuser-id/{id}', [OrderController::class, 'allOrderByUserId']);	 
	   
       Route::get('get-user-addresses-info/{id}', [UsersControllerAPIController::class, 'getUserAddressesInfo']);	 	 
	 Route::post('get-aws-bucket-order' , [OrderController::class , 'awsBucketOrder']);

/*
|--------------------------------------------------------------------------
| Contact Form / Subsrcibe by Mailchimp  Apis 
|--------------------------------------------------------------------------
|
*/
	Route::post('contactform', [ContactFormController::class, 'contact_form_store']);
	Route::post('subsrcibe_mailchimp', [ContactFormController::class, 'subsrcibe_mailchimp']);
	
	
/*
|--------------------------------------------------------------------------
| Login / Register Form Apis 
|--------------------------------------------------------------------------
|
*/	

   Route::post('login', [UsersControllerAPIController::class, 'login']);
   Route::post('register', [UsersControllerAPIController::class, 'register']);
   Route::post('google_with_login', [UsersControllerAPIController::class, 'googlewithlogin']);
	




/*
|--------------------------------------------------------------------------
| Wish List Api 
|--------------------------------------------------------------------------
|
*/
	Route::group(['prefix' => 'wishlists'], function() {
	   	Route::get('{user_id}/{lang}',[WishlistController::class, 'getAllWishlistByUser']);
	   	Route::post('add', [WishlistController::class, 'save']);
	   	Route::post('delete/multiple',[WishlistController::class, 'removeMultiple']);
   	});



/*
|--------------------------------------------------------------------------
| Abandon Cart Api 
|--------------------------------------------------------------------------
|
*/

  Route::post('store-abandon-cart', [AbandonCartController::class, 'storeAbandonCartData']);	 
	
/*
|--------------------------------------------------------------------------
| X-ray Results Apis 
|--------------------------------------------------------------------------
|
*/
    Route::resource('xrays', XRayController::class);
    Route::get('xrays/filter/{language}', [XRayController::class, 'filterByLanguage']);
	Route::get('xrays-dropdown-filter-age/{language}/{slug}', [XRayController::class, 'DropdownFilterByAge']);
	//Route::get('xrays-dropdown-filter-curve-degree/{curve_degree}', [XRayController::class, 'DropdownFilterByCurveDegree']);
	
	
	/*
|--------------------------------------------------------------------------
|get all Apis for Product page
|--------------------------------------------------------------------------
|
*/

Route::resource('products', ProductController::class);
 Route::get('products/filter/{language}', [ProductController::class, 'filterByLanguage']);
 Route::get('products/{slug}/{language}/', [ProductController::class, 'show']);
 Route::post('product-reviews', [ProductReviewController::class, 'store']);
 
 Route::get('top-rated-reviewsproduct', [ProductController::class, 'TopRatedReviewsProduct']);
 
  Route::get('productcount_category/{language}', [ProductController::class, 'getAllCategoryWithProductCount']);
  
 Route::get('products_by_category/{slug}', [ProductController::class, 'product_by_category']);
 
 //Route::post('aw3uploadimages', [ProductController::class, 'aw3BucketsUploadImages']);
 Route::post('products/aws3/uploadimages', [ProductController::class, 'aw3UploadImages']);



 

});
