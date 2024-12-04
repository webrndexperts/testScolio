<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeaderMainTitle extends Model
{
	protected $table = 'header_main_heading';
	protected $fillable=['title','slug','status','lang','header_main_parents_id'];



    public function header_main_title_test(){
        return $this->hasMany('App\Models\Headers','header_main_title','id');
    }
    use HasFactory;
}
