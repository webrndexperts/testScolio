<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostParents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::getAllPostByLanguageApi();
		//dd($posts);
        return response()->json($posts);
    }

    public function filterByLanguage($language)
    {
		// $cacheKey = "PostsfilterByLanguage_{$language}";
		
		 // $posts = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($language) {
            // If the data is not in the cache, fetch it from the database or other source
            return Post::getAllPostByLanguageApi($language); // Replace with your actual data retrieval logic
        // });
		
        //$posts = Post::getAllPostByLanguageApi($language);
        return response()->json($posts);
    }

    public function show($slug, $language)
    {
        $post = Post::where('slug', $slug)
        ->where('lang', $language)
        ->first(); 
		
		if(!$post) {
			$post = 'null';
		}
        return response()->json($post);
    }
	
	public function singleSlugPost($id)
    {
		$allslug_postid = Post::where('post_parent_id', $id)->select('lang','slug')->get();
            // $yourModelInstance = PostParents::find($id)->postParent->pluck('slug');
        // $post = Post::where('slug', $slug)
        // ->where('lang', $language)
        // ->firstOrFail(); 
        return response()->json($allslug_postid);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $post = Post::create($validatedData);
        return response()->json($post, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $post = Post::findOrFail($id);
        $post->update($validatedData);

        return response()->json($post);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }
}
