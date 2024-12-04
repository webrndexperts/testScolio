<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Models\Settings;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\UserAddressInfo;
use App\Models\UserSecretCredentials;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\RegisterEmail;
use App\Mail\AdminRegisterEmail;
use Newsletter;
use MikeMcLin\WpPassword\Facades\WpPassword;
use Illuminate\Hashing\BcryptHasher;

class UsersControllerAPIController extends Controller
{

	
	// login api function
 
 public function oldUserstoLaravel($email, $password, array $options = []){
	 //dd($password);
	 $hashedValue = User::where('email', $email)->first()->password ?? '';
	 if (Hash::needsRehash($hashedValue)) 
        {
            if (WpPassword::check($password, $hashedValue)) 
            {
                $newHashedValue = (new BcryptHasher)->make($password, $options);
               // User::update(['password' => $hashedValue])->where('email', $email);
			    User::where('email', $email)->update(['password' => $newHashedValue]);
                $hashedValue = $newHashedValue;
            }
        }
		return $hashedValue;
 }


    public function login(Request $request) 

    {
//dd('test');
        $validator = Validator::make($request->all(),[

            'email'    => 'required',

            'password' => 'required'

        ]);

        if($validator->fails()) {

            return response()->json([

                'success' => false,

                'message' => $validator->errors()->first()

            ]);

        }

        $user = User::where('email', $request->email)->orWhere('user_login', $request->email)->first();
       //dd($user);
        if(!$user) {

            return response()->json([

                'success' => false,

                'message' => 'User not found.'

            ]);

        }
		    // Manually compare the MD5 hashed password
		// if (hash('md5', $request->password) === $user->password) {
				// Auth::login($user);
				
				// return response()->json([
					// 'success' => true,
					// 'message' => 'User login successfully.',
					// 'user_data' => $user
				// ]);
			// }

			// return response()->json([
				// 'success' => false,
				// 'message' => 'Invalid credentials.'
			// ]);
			
			
			
			
			
			
			$check = $this->oldUserstoLaravel($request->email, $request->password);
			//dd($check);
			
			$credentials = $request->only('email', 'password');
			if (Auth::attempt($credentials)) {
				$user = Auth::user();

				return response()->json([
					'success' => true,
					'message' => 'User logged in successfully.',
					'user_data' => $user
				]);
				
				$ipAddress = $request->ip();
				Log::info('User logged in successfully on frontend.', [
					'email_or_login' => $request->email,
					'user_id' => $user->id, 
					'ip_address' => $ipAddress
				]);
			
			} else {

				return response()->json([
					'success' => false,
					'message' => 'Invalid credentials.'
				]);
				
				$ipAddress = $request->ip();	
				Log::warning('Failed login attempt for User on frontend.', [
					'email_or_login' => $request->email,
					'ip_address' => $ipAddress
				]);
			
			}
		
			

    }
	
		// register api function

	public function register(Request $request) 

		{
         //dd($request->all());
			// $validator = Validator::make($request->all(),[

				// 'name'     => 'required',

				// 'email'    => 'required',

				// 'password' => 'required'

			// ]);

			// if($validator->fails()) {

				// return response()->json([

					// 'success' => false,

					// 'message' => $validator->errors()->first()

				// ]);

			// }

			// if (User::where('email', $request->email)->exists()) {
				// $response = [
					// 'success' => false,
					// 'message' => 'User already exists with this email'
				// ];

				// return response()->json($response, 400); // You can use a different HTTP status code, like 400 Bad Request, to indicate that the request was invalid.
			// }

			// $user = User::create([

				// 'name'     => $request->name,

				// 'email'    => $request->email,

				// 'password' => Hash::make($request->password),

				// 'role'    => $request->role,
				
				// 'status'    => $request->status,
			// ]);
							
				// $user_sent_mail = ''; // Initialize $user_sent_mail variable

				// if($request-> === true) { // Fixed typo in condition

					// $register_information_mail = [
						// 'name' => $request->name
					// ];
                   // $user_email = $request->email;
					// $user_sent_mail = Mail::to($user_email)->send(new RegisterEmail($register_information_mail));				
				// }

				// if(isset($user_sent_mail)) {
					// return response()->json([
						// 'success' => false,
						// 'message' => 'Failed to send registration email.'
					// ]);
				// }

				// return response()->json([
					// 'success' => true,
					// 'message' => 'User registered successfully.',
					// 'user_data' => $user,
					// 'user_sent_mail' => $user_sent_mail
				// ]);

				\App::setLocale($request->lang);
		$validator = Validator::make($request->all(),[
					'name'     => 'required',
					'email'    => 'required|email',
					'password' => 'required'
				]);

				if($validator->fails()) {
					return response()->json([
						'success' => false,
						'message' => $validator->errors()->first()
					]);
				}

				// Check if the user with the given email already exists
				if (User::where('email', $request->email)->exists()) {
					$response = [
						'success' => false,
						'message' => 'User already exists with this email'
					];

					return response()->json($response, 400);
				}

				$user = User::create([
					'user_login'     => $request->name,
					'name'     => $request->name,
					'email'    => $request->email,
					//'password' => hash('md5', $request->password),
					'password' => Hash::make($request->password),
					'role'     => $request->role,
					'status'   => $request->status,
				]);
				


				if($user) {
				// $create_application_student = new UserSecretCredentials();
				// $create_application_student->user_id = $user->id;
				// $create_application_student->secret_pass = $request->password;
				// $create_application_student->save();	

				$user_id = $user->id;
				if(!empty($user_id)){
				UserSecretCredentials::create([
				'user_id' => $user_id,
				'secret_pass' => $request->password
				 ]);
				}
				
				
				
				
				
					
					$check_mailchimp_user = '';
					if ($request->subscribe === true) {
						// Send a static text email
				     if (!Newsletter::isSubscribed($request->email)) {
			         $check_mailchimp_user = Newsletter::subscribe($request->email);
		              }
					}
					
					$register_information_mail = [
						'name' => $request->name
					];

					$recipientEmail = $request->email;

					try {
						$settings = Settings::first();
		                $admin_recipientEmail = $settings->email;
						$user_admin_mail = Mail::to($recipientEmail)->send(new RegisterEmail($register_information_mail));
						$sent_admin_mail = Mail::to($admin_recipientEmail)->send(new AdminRegisterEmail($register_information_mail));
						$response = [
							'success' => true,
							'message' => 'User registered successfully.',
							'user_data' => $user,
							'check_mailchimp_user' => $check_mailchimp_user,
							'user_sent_mail' => true
						];
					} catch (\Exception $e) {
						// Log error or handle gracefully
						$response = [
							'success' => false,
							'message' => 'Failed to send email: ' . $e->getMessage(),
							'user_data' => $user,
							'user_sent_mail' => false
						];
					}
				} else {
					$response = [
						'success' => false,
						'message' => 'Failed to create user.'
					];
				}
				\App::setLocale('en');
				return response()->json($response);
		
		
		}

   public function getUserAddressesInfo($id){
	   
	//   $user = Auth::user();
	 //  if($user){
	
	   $user_id = $id;
	   $user_address_info = UserAddressInfo::where('user_id', $user_id)->first();
	    $response =  [

                'success' => true,
               'user_address_info'   => $user_address_info
	     ];	   
	   return response()->json($response, 200);
       // } else{
	    // $response = [
				// 'success' => false,
				// 'message' => 'user not logged in!'
			// ];

			// return response()->json($response, 400);
       // }	   
	  // dd($user);
		   
	   
   }
	
	// Gmail with login api function

	public function googlewithlogin(Request $request) 

		{

		// Check if the user with the given email already exists
		$user = User::where('email', $request->email)->first();
			if ($user) {
			// User exists, log them in
			Auth::login($user);


            return response()->json([

                'success' => true,

                'message' => 'Google User login successfully.',

                'user_data'    => $user

            ]);
		 } else {
		
		 $gmail_user_info = User::create([
			'name' => $request->name,
			'email' => $request->email,
			'role' => $request->role,
			'photo' => $request->imageUrl,
			'provider' => $request->register_type,
			'provider_id' => $request->googleId,
			'status' => $request->status,
		]);

		if ($gmail_user_info) {
			$customData = [
				'username' => $gmail_user_info->name,
				'email' => $gmail_user_info->email,
				'photo' => $gmail_user_info->photo,
				'provider' => $gmail_user_info->provider,
				'provider_id' => $gmail_user_info->provider_id
			];

			return response()->json([
				'success' => true,
				'message' => 'Gmail user login successful.',
				'gmail_user_info' => $customData
			]);
		} else {
			$response = [
				'success' => false,
				'message' => 'Gmail user not logged in!'
			];

			return response()->json($response, 400);
		}
			
	}
   }

}
