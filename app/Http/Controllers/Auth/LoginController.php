<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Socialite;
use App\User;
use Auth;
class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/admin';

    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function credentials(Request $request){
        return ['email'=>$request->email,'password'=>$request->password,'status'=>'active','role'=>'admin'];
    }
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }
 
    public function Callback($provider)
    {
        $userSocial =   Socialite::driver($provider)->stateless()->user();
        $users      =   User::where(['email' => $userSocial->getEmail()])->first();
        // dd($users);
        if($users){
            Auth::login($users);
            return redirect('/admin')->with('success','You are login from '.$provider);
        }else{
            $user = User::create([
                'name'          => $userSocial->getName(),
                'email'         => $userSocial->getEmail(),
                'image'         => $userSocial->getAvatar(),
                'provider_id'   => $userSocial->getId(),
                'provider'      => $provider,
            ]);
         return redirect()->route('admin');
        }
    }
	public function customLogin(Request $request)
	{
		$user = User::where(function($query) use($request) {
                $query->where('email', $request->email)
                      ->orWhere('user_login', $request->email);
				})
				->where('password', hash('md5', $request->password))
				->where('role', 'admin')
				->first();
		
		if($user && $user->id) {
			
			Auth::login($user);
			  
		  // Log successful login with IP address
		    $ipAddress = $request->ip(); // Retrieve IP address
			Log::info('Admin login dashboard in successfully.', ['email_or_login' => $request->email, 'user_id' => $user->id, 'ip_address' => $ipAddress]);
			
		 return redirect('/admin')->with('success','You are login successfully.');
		}
		else{
			
			// Log failed login attempt with IP address
			$ipAddress = $request->ip();
			Log::warning('Failed login attempt for Admin.', [
				'email_or_login' => $request->email,
				'ip_address' => $ipAddress
			]);
         return redirect()->back()->with('error', 'Login user details is not found.');
        }
 


		
	}
}
