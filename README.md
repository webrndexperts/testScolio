## Advance E-commerce website in  Laravel 9

### Features :
## ======= ADMIN =======

- Admin login, forget password
 - Posts Crud Modules
 - Pages Crud Modules
 - X-Ray Results Crud Modules
 - Testimonials Crud Modules
 - Accordian Faq Crud Modules
 - Multiple Languages Crud Modules
 - Users Crud Modules


### Set up :

1. Clone the repo and cd into it
2. In your terminal ```composer install```
3. Rename or copy ```.env.example``` file to ``.env`` - ```copy .env.example .env```
4. ```php artisan key:generate```
5. Set your database credentials in your ```.env``` file
6. Set your Braintree credentials in your ```.env``` file if you want to use PayPal
7. Import db file(```database/e-shop.sql```) into your database (```mysql,sql```)
8. ```npm install```
9. ```npm run watch```
10. run command[laravel file manager]:-  ```php artisan storage:link```
11. Edit ```.env``` file :- remove APP_URL
10. ```php artisan serve``` or use virtual host
11. Visit ```localhost:8000``` in your browser
12. Visit /admin if you want to access the admin panel. Admin Email/Password: ```admin@gmail.com```/```1111```.





