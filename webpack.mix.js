const mix = require('laravel-mix');
const webpack = require('webpack'); // Make sure to require webpack
const esbuild = require('esbuild');
const EsbuildPlugin = require('esbuild-loader').EsbuildPlugin;
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

mix.js('resources/js/app.js', 'public/js')
    .webpackConfig({
        watchOptions: {
            ignored: /node_modules|public|storage/,
            aggregateTimeout: 300, // Delay the rebuild after the first change (in milliseconds)
            poll: 1000, // Check for changes every second
        },
        plugins: [
            new EsbuildPlugin({
                loader: 'jsx', // Set loader for JSX
                target: 'es2015', // Specify ECMAScript version
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
                    'REACT_APP_API_KEY': JSON.stringify(process.env.REACT_APP_API_KEY),
                    'REACT_APP_GOOGLE_CLIENT_ID': JSON.stringify(process.env.REACT_APP_GOOGLE_CLIENT_ID),
                    'REACT_APP_GOOGLE_CLIENT_ID2': JSON.stringify(process.env.REACT_APP_GOOGLE_CLIENT_ID2),
                    'REACT_APP_GOOGLE_CLIENT_SECRET': JSON.stringify(process.env.REACT_APP_GOOGLE_CLIENT_SECRET),
                    'REACT_APP_GOOGLE_CLIENT_SECRET2': JSON.stringify(process.env.REACT_APP_GOOGLE_CLIENT_SECRET2),
                    'REACT_APP_GOOGLE_API_KEY': JSON.stringify(process.env.REACT_APP_GOOGLE_API_KEY),
                    'REACT_GOOGLE_CLIENT_ID': JSON.stringify(process.env.REACT_GOOGLE_CLIENT_ID),
                    'REACT_APP_PUBLIC_URL': JSON.stringify(process.env.REACT_APP_PUBLIC_URL),
                    'REACT_APP_STRIPE_DEV': JSON.stringify(process.env.REACT_APP_STRIPE_DEV),
                    'REACT_APP_STRIPE_LIVE': JSON.stringify(process.env.REACT_APP_STRIPE_LIVE),
                    'REACT_APP_CAPTCHA_SITE_KEY': JSON.stringify(process.env.REACT_APP_CAPTCHA_SITE_KEY),
                    'REACT_APP_PAYMENT_MODE': JSON.stringify(process.env.REACT_APP_PAYMENT_MODE),
                }

            })
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'esbuild-loader',
                        options: {
                            loader: 'jsx', // Handle JSX syntax in .js files
                            target: 'es2015', // Specify the target ECMAScript version
                        },
                    },
                },
            ],
        },
    })
    .css('public/css/app.css', 'public/css');
