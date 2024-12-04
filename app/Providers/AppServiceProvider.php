<?php

namespace App\Providers;

use App\Models\Page;
use App\Models\PhoneNumber;
use App\Models\Post;
use App\Models\Product;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use URL;
use View;
class AppServiceProvider extends ServiceProvider
{


    public function getMetaValues($slug, $lang, $type)
    {
        // dd($type,$slug,$lang);
        $metas = [
            'metaTitle' => 'Scoliosis Specialist Clinic and Doctor in Singapore',
            'metaDescription' => 'Discover the Scoliosis Clinic in Singapore, offering expert Scoliosis Chiropractic treatments. Find the best Scoliosis doctor for effective and personalized care.',
            'metaTags' => 'Scoliosis Treatment',
            'lang' => 'en_US'
        ];
        if ($type === 'page') {
            $page = null;
            if($slug == ''){
                $page = Page::where('slug','home')->where('lang', $lang)->first();
                $metas = $page ? $this->setMetaValues($page, $metas) : $metas;
            }else{
                $page = Page::where('slug', $slug)->where('lang', $lang)->first();
                $metas = $page ? $this->setMetaValues($page, $metas) : $metas;
            }
        } elseif ($type === 'product') {
            $product = Product::where('slug', $slug)->where('lang', $lang)->first();
            if ($product) {
                $metas = $this->setMetaValues($product, $metas);
            }
        } elseif ($type === 'articles') {
            $article = Post::where('slug', $slug)->where('lang', $lang)->first();
            if ($article) {
                $metas = $this->setMetaValues($article, $metas);
            }
        }

        return $metas;
    }


    public function setMetaValues($item, $metas)
    {
        if ($item->seo_meta_title) {
            $metas['metaTitle'] = $item->seo_meta_title;
        }
        if ($item->seo_meta_description) {
            $metas['metaDescription'] = $item->seo_meta_description;
        }
        if ($item->seo_meta_tag) {
            $metas['metaTags'] = $item->seo_meta_tag;
        }
        if ($item->lang) {
            $metas['lang'] = $item->lang;
        }
        return $metas;
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        Schema::defaultStringLength(191);
        $currentUrl = URL::current();
        $path = trim(parse_url($currentUrl, PHP_URL_PATH), '/');
        $parts = explode('/', $path);
        $defaultLang = 'en_US';
        $lang = $defaultLang;
        $slug = '';
        $type = 'page';
        // Determine if the URL is for a product, article, or a page
        if (in_array('product', $parts)) {
            if ($parts[0] == 'product') {
                $type = 'product';
                $slug = $parts[1] ?? '';
            } elseif (preg_match('/^[a-z]{2}(?:_[A-Z]{2})?$/', $parts[0])) {
                $type = 'product';
                $slug = $parts[2] ?? '';
                $lang = $parts[0];
            }
        } elseif (in_array('articles', $parts)) {
            if ($parts[0] == 'articles') {

                $type = 'article';
                $slug = $parts[1] ?? '';
            } elseif (preg_match('/^[a-z]{2}(?:_[A-Z]{2})?$/', $parts[0])) {
                $type = 'articles';
                $slug = $parts[2] ?? '';
                $lang = $parts[0];
            }
        } else {
            if (preg_match('/^[a-z]{2}(?:_[A-Z]{2})?$/', $parts[0])) {
                $lang = $parts[0];
                $slug = $parts[1] ?? '';
            } else {
                $slug = $parts[0] ?? '';
            }
        }

        $gtag = PhoneNumber::where('lang' , $lang)->first();
      
        $metas = $this->getMetaValues($slug, $lang, $type);
        View::composer('react', function ($view) use ($metas,$gtag) {
            $view->with('metas', $metas)->with('gtag', $gtag);
        });
    }

}
