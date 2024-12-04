<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeaderSubMenu extends Model
{
	protected $table = 'header_submenu_heading';
	protected $fillable=['title','slug','status','lang','header_main_parents_id','header_main_heading_id'];
	
	public function header_submenu_title_test(){
        return $this->hasMany('App\Models\Headers','header_submenu_title','id');
    }

    
    use HasFactory;
}