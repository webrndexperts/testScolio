<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use MikeMcLin\WpPassword\Facades\WpPassword;
use Illuminate\Auth\Events\Attempting;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Hashing\BcryptHasher;
use Illuminate\Support\Facades\DB;

class WordPressPasswordUpdate
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Attempting $event)
    { die('sdfsdfsdfsd');
        $this->check($event->credentials['password'], User::where('email', $event->credentials['email'])->first()->password ?? 'not found');
    }

    public function check($value, $hashedValue, array $options = [])
    {
		die('sdfsdfsdfsd');
        if (Hash::needsRehash($hashedValue)) 
        {

            die('sdfsdfsdfsd');
            if (WpPassword::check($value, $hashedValue)) 
            {
                $newHashedValue = (new BcryptHasher)->make($value, $options);
                DB::update('UPDATE users SET `password` = "' . $newHashedValue . '" WHERE `password` = "' . $hashedValue . '"');
                $hashedValue = $newHashedValue;
            }
        }
    }
}
