<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Facades\Password;
use Illuminate\Http\Request;
use App\User;
use App\Models\ForgotPassword;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    public function forgotPassword(Request $request) {
        $data = array( 'status' => false, 'message' => 'passwords.forgot.noUser' );

        $response = Password::broker()->sendResetLink($request->only('email'));

        if ($response == Password::RESET_LINK_SENT) {
            $data['status'] = true;
            $data['message'] = '';
        }

        return response()->json($data);
    }

    public function checkToken($token, $email) {
        $data = array( 'status' => false, 'message' => 'passwords.reset.expired' );

        $check = ForgotPassword::where([
            ['email', $email],
            ['token', Hash::check($token, 'token')],
        ])->first();


        if ($check && Carbon::parse($check->created_at)->addMinutes(config('auth.passwords.users.expire'))->isFuture()) {
            $data['status'] = true;
            $data['message'] = '';
        }

        return response()->json($data);
    }

    public function resetPassword(Request $request) {
        $data = array( 'status' => false, 'message' => 'passwords.reset.failed' );

        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|confirmed|min:8',
        ]);

        $response = Password::broker()->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = hash('md5', $password);
                $user->save();
            }
        );

        if ($response == Password::PASSWORD_RESET) {
            $data['status'] = true;
            $data['message'] = '';
        } else if(trans($response) == 'This password reset token is invalid.') {
            $data['message'] = 'passwords.reset.invalid';
        }

        return response()->json($data);
    }
}
