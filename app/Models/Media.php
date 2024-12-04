<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
	protected $table = 'media';
    protected $fillable = ['filename', 'file_url', 'file_type','created_at','updated_at'];
}
