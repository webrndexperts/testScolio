<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{-- <meta name="robots" content="index, follow"> --}}
    {{-- @if(View::shared('shouldNoIndex'))
    <meta name="robots" content="noindex, nofollow">
    @else
        <meta name="robots" content="index, follow">
    @endif --}}

    @if(preg_match('/^(?:[a-z]{2}_[A-Z]{2}\/)?product\/exercices-de-scoliose/', Request::path()))
    <meta name="robots" content="noindex, nofollow">
    @else
        <meta name="robots" content="index, follow">
    @endif
    <title>{{ $metas['metaTitle'] }}</title>
    <meta name="description" content="{{ $metas['metaDescription'] }}" />
    <link rel="canonical" href="{{ URL::current() }}" data-react-helmet="true" />
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="//cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" id="css-floating-css" href="{{ url('/assets/css/floating-wpp.min.css?ver=2.0.41') }}"
        type="text/css" media="all">
    <script src="//cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wdth,wght@0,75..100,300..800;1,75..100,300..800&display=swap"
        rel="stylesheet">
    <meta property="og:locale" content="{{ $metas['lang'] }}" data-react-helmet="true">
    <meta property="og:type" content="website" data-react-helmet="true">
    <meta property="og:title" content="{{ $metas['metaTitle'] }}" data-react-helmet="true">
    <meta property="og:description" content="{{ $metas['metaDescription'] }}" data-react-helmet="true">
    <meta property="og:url" content="{{ url('/') }}" data-react-helmet="true">
    <meta property="og:site_name" content="ScolioLife™" data-react-helmet="true">
    <meta property="article:publisher" content="https://www.facebook.com/ScolioLife/" data-react-helmet="true">
    <meta property="article:modified_time" content="2024-02-29T08:43:58+00:00">
    <meta property="og:image" content="{{ url('/uploads/2023/07/Award-1-EN.webp') }}" data-react-helmet="true">
    <meta name="twitter:card" content="summary_large_image" data-react-helmet="true">
    <meta name="twitter:site" content="@scoliolife" data-react-helmet="true">
    <meta name="keywords" content="{{ $metas['metaTags'] }}">

    <!-- Meta Pixel Code -->
    <script>
        ! function(f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function() {
                n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '999865305166859');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=999865305166859&ev=PageView&noscript=1" /></noscript>
    <!-- End Meta Pixel Code -->
    <!-- Google tag (gtag.js) -->
   

    <script async src="https://www.googletagmanager.com/gtag/js?{{ $gtag ? $gtag->gtag : 'G-YE2CS9TKM0' }}"></script>

    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', "{{ $gtag ? $gtag->gtag : 'G-YE2CS9TKM0' }}" );

    </script>


    <link rel="stylesheet" id="css-floating-css" href="{{ url('/assets/css/style.css') }}" type="text/css">
    <link rel="stylesheet" id="css-floating-css" href="{{ url('/assets/css/responsive.css') }}" type="text/css">
</head>

<body class="antialiased">
    <div id="root"></div> <!-- React will render here -->
    <script src="{{ mix('js/app.js') }}?version={{ time() }}"></script>
    <script src="//cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>
    <script src="//cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="{{ url('/assets/js/floating-wpp.min.js') }}" defer="defer"></script>
    
</body>

</html>
