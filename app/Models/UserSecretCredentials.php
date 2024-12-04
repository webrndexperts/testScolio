<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSecretCredentials extends Model
{
	protected $table = 'user_secret_credentials';
    protected $fillable=['user_id','secret_pass','created_at','updated_at'];
}
