<?php

namespace App\Console\Commands;

use App\Models\Language;
use App\Models\Page;
use App\Models\Post;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap for the website';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $languages = Language::all();

        // Define routes from JSON
        $routes = [
            "languageRoutes" => [
                "/:lang",
                "/:lang/shop",
                "/:lang/product/:slug",
                "/:lang/cart",
                "/:lang/checkout",
                "/:lang/articles",
                "/:lang/articles/:postId",
                "/:lang/contact-us",
                "/:lang/:slug",
                "/:lang/results",
                "/:lang/patients-worldwide",
                "/:lang/testimonials",
                "/:lang/product-category/:slug",
                "/:lang/thank-you",
                "/:lang/world",
                "/:lang/scoliolife-faq",
                "/:lang/chiropractic-faq",
                "/:lang/media-appearances",
                "/:lang/scoliotrack-faq",
                "/:lang/tour-our-clinic",
                "/:lang/my-account",
                "/:lang/account-details",
                "/:lang/order",
                "/:lang/orders/:orderId",
                "/:lang/order/complete/:orderId",
                "/:lang/ConsultationForm"
            ],
            "withoutLanguageRoutes" => [
                "/",
                "/shop",
                "/product/:slug",
                "/cart",
                "/checkout",
                "/articles",
                "/articles/:postId",
                "/contact-us",
                "/:slug",
                "/results",
                "/patients-worldwide",
                "/testimonials",
                "/product-category/:slug",
                "/thank-you",
                "/world",
                "/scoliolife-faq",
                "/chiropractic-faq",
                "/media-appearances",
                "/scoliotrack-faq",
                "/tour-our-clinic",
                "/my-account",
                "/account-details",
                "/order",
                "/orders/:orderId",
                "/order/complete/:orderId",
                "/ConsultationForm"
            ]
        ];
        $sitemap = Sitemap::create();
        foreach ($languages as $lang) {
            foreach ($routes["languageRoutes"] as $route) {
                $finalRoute = str_replace(':lang', $lang->code, $route);

                if (!str_contains($finalRoute, ':')) {
                    $sitemap->add(
                        Url::create(url($lang->code === 'en_US' ? str_replace("/{$lang->code}", '', $finalRoute) : $finalRoute))
                            ->setPriority(1)
                            ->setChangeFrequency('weekly')
                            ->setLastModificationDate(Carbon::now())
                    );
                }
            }
        }

        // Add pages to the sitemap
        $pages = Page::where('status', 'active')->get();
        foreach ($pages as $page) {
            // With language prefix
            foreach ($languages as $lang) {
                $sitemap->add(
                    Url::create(url($lang->code === 'en_US' ? "/{$page->slug}" : "/{$lang->code}/{$page->slug}"))
                        ->setPriority(1)
                        ->setChangeFrequency('weekly')
                        ->setLastModificationDate($page->updated_at)
                );
            }
        }


        // Add blog posts to the sitemap
        $posts = Post::where('status', 'active')->get();
        foreach ($posts as $post) {
            // With language prefix
            foreach ($languages as $lang) {
                $sitemap->add(
                    Url::create(url($lang->code === 'en_US' ? "/articles/{$post->slug}" : "/{$lang->code}/articles/{$post->slug}"))
                        ->setPriority(0.9)
                        ->setChangeFrequency('daily')
                        ->setLastModificationDate($post->updated_at)
                );
            }
        }

        // Add products to the sitemap
        $products = Product::where('status', 'active')->get();
        foreach ($products as $product) {

            // With language prefix
            foreach ($languages as $lang) {
                $sitemap->add(
                    Url::create(url($lang->code === 'en_US' ? "/product/{$product->slug}" : "/{$lang->code}/product/{$product->slug}"))
                        ->setPriority(0.9)
                        ->setChangeFrequency('monthly')
                        ->setLastModificationDate($product->updated_at)
                );
            }
        }

        // Save the sitemap
        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully.');
    }
}
