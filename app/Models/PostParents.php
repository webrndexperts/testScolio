<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Post;

class PostParents extends Model
{
    protected $table = 'posts_parents';
    protected $fillable = ['slug','created_at','updated_at'];
    use HasFactory;
    
    public function postParent()
    {
        return $this->hasMany(Post::class, 'id', 'post_parent_id');
    }
	
}
