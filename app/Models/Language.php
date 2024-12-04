<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{   
    use HasFactory;

    protected $table = 'langauge';
    protected $fillable = ['name','code','icon','slug','status','created_at','updated_at'];
    private static $getListActive  = null;

    public static function getListActive()
    {
        if (self::$getListActive === null) {
            self::$getListActive = self::where('status', 1)
                ->get()
                ->keyBy('code');
        }
        return self::$getListActive;
    }

    public function contactData() {
        return $this->hasOne(PhoneNumber::class, 'lang','code');
    }


   
   
}
