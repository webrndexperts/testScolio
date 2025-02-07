<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\XrayResults;
use App\Models\XrayResultsCategory;
use App\Models\XrayResultsParents;
use App\Models\Language;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\User;

class XRayResultController extends Controller
{
    // public function __construct()
    //{
    //    $this->languages = Post::getListActive();
    /// }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function index()
    {
        // $posts = Post::select('id', 'post_parent_id', 'title','lang')
        // ->where('post_parent_id', 45)
        // ->whereNotNull('post_parent_id')
        // ->get();
        //   dd($posts);

        if (isset($_GET['lang'])) {
            $get_current_lang = !empty($_GET['lang']) ? $_GET['lang'] : '';
            $menu_model = XrayResults::where('lang', $get_current_lang)->latest()->paginate(10);
        }

        //$posts=XrayResults::getAllXrayResults();
        // return $posts;
        return view('backend.xrayresults.index')->with('posts', $menu_model)->with('get_current_lang', $get_current_lang);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {

        $categories = XrayResultsCategory::get();
        $users = User::get();
        $languages = Language::getListActive();
        return view('backend.xrayresults.create')->with('users', $users)->with('categories', $categories)->with('languages', $languages);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $this->validate($request,[
        //     'title'=>'required',
        //     'page_slug'=>'required',
        //     'status'=>'required|in:active,inactive'
        // ]);
        $this->validate($request, [
            'case_number' => 'required',
            'status' => 'required|in:active,inactive'
        ]);

        $data = $request->all();
        $enLanguages = Language::where('code', 'like', 'en_%')->pluck('code')->toArray();

        $hasFilledPost = collect($request->post)->contains(function ($item) {
            return !empty($item['title']) || !empty($item['description']);
        });

        if (!$hasFilledPost) {
            return back()->withErrors(['post' => 'At least fill all fields of one language.'])->withInput();
        }
        // dd($request->all());
        foreach ($data['post'] as $post) {
            $slug_title = $post['title'];


            if (isset($slug_title)) {
                $slug_data = Str::slug($slug_title);
                $data_by_slug[] = ['slug' => $slug_data];
            }
        }

        $saved_slug = [];
        foreach ($data_by_slug as $title_by_slug) {
            $saved_slug[] = ['slug' => $title_by_slug['slug']];
            $dataPostParents = [
                'slug' => $title_by_slug['slug'],
                'case_number' => !empty($data['case_number']) ? $data['case_number'] : ''
            ];
            $page = XrayResultsParents::create($dataPostParents);
        }
        $status_data = !empty($data['status']) ? $data['status'] : 'active';

        $case_number = $data['case_number'];
        $video_url = $data['video_url'];
        $age = $data['age'];
        $curve_degree = $data['curve_degree'];

        //dd($page);
        if (is_array($data['post']) || is_object($data['post'])) {

            foreach ($data['post'] as $code => $value) {

                $imageName = '';

                if (isset($value['image'])) {
                    // dd($value['image']);
                    $image = $value['image'];
                    $imageName = $value['image']->getClientOriginalName();

                    $image->move(public_path('custom_images/xray-results'), $imageName);

                }

                if ($code == 'en_all') {
                    foreach ($enLanguages as $enLang) {
                        $dataDes[] = [
                            'xray_parent_id' => $page->id,
                            'lang' => $enLang,
                            'case_number' => !empty($case_number) ? $case_number : '',
                            'age' => !empty($age) ? $age : '',
                            'curve_degree' => !empty($curve_degree) ? $curve_degree : null,
                            'title' => !empty($value['title']) ? $value['title'] : '',
                            'xray_cat_id' => !empty($value['post_cat_id']) ? $value['post_cat_id'] : '',
                            'description' => !empty($value['description']) ? $value['description'] : '',
                            'seo_meta_title' => !empty($value['seo_meta_title']) ? $value['seo_meta_title'] : '',
                            'seo_meta_description' => !empty($value['seo_meta_description']) ? $value['seo_meta_description'] : '',
                            'seo_meta_tag' => !empty($value['seo_meta_tag']) ? $value['seo_meta_tag'] : '',
                            'video_url' => !empty($value['video_url']) ? $value['video_url'] : '',
                            'photo' => !empty($imageName) ? asset('custom_images/xray-results/' . $imageName) : '',
                            'status' => $status_data,
                        ];
                    }
                } else {
                    // For other languages, store their respective data
                    $dataDes[] = [
                        'xray_parent_id' => $page->id,
                        'lang' => $code,
                        'case_number' => !empty($case_number) ? $case_number : '',
                        'age' => !empty($age) ? $age : '',
                        'curve_degree' => !empty($curve_degree) ? $curve_degree : null,
                        'title' => !empty($value['title']) ? $value['title'] : '',
                        'xray_cat_id' => !empty($value['post_cat_id']) ? $value['post_cat_id'] : '',
                        'description' => !empty($value['description']) ? $value['description'] : '',
                        'seo_meta_title' => !empty($value['seo_meta_title']) ? $value['seo_meta_title'] : '',
                        'seo_meta_description' => !empty($value['seo_meta_description']) ? $value['seo_meta_description'] : '',
                        'seo_meta_tag' => !empty($value['seo_meta_tag']) ? $value['seo_meta_tag'] : '',
                        'video_url' => !empty($value['video_url']) ? $value['video_url'] : '',
                        'photo' => !empty($imageName) ? asset('custom_images/xray-results/' . $imageName) : '',
                        'status' => $status_data,
                    ];
                }
                // if (isset($value['title'])) {
                //     $dataDes[] = [
                //         'xray_parent_id' => $page->id,
                //         'lang'  => $code,
                //         'case_number'  => !empty($case_number) ? $case_number : '',
                //         'age'  => !empty($age) ? $age : '',
                //         'curve_degree'  => !empty($curve_degree) ? $curve_degree : null,
                //         'title' => !empty($value['title']) ? $value['title'] : '',
                //         'xray_cat_id' => !empty($value['post_cat_id']) ? $value['post_cat_id'] : '',
                //         'description' => !empty($value['description']) ? $value['description'] : '',
                // 		'seo_meta_title' => !empty($value['seo_meta_title']) ? $value['seo_meta_title'] : '',
                //         'seo_meta_description' => !empty($value['seo_meta_description']) ? $value['seo_meta_description'] : '',
                //         'seo_meta_tag' => !empty($value['seo_meta_tag']) ? $value['seo_meta_tag'] : '',
                //         'video_url' => !empty($value['video_url']) ? $value['video_url'] : '',
                // 		'photo' => !empty($imageName) ? asset('custom_images/xray-results/' . $imageName) : '',
                // 		'status'  => $status_data,
                //     ];
                // } else {
                //     echo 'not insert';
                // }
            }
        }




        // $dataDesWithSlugs = [];

        // foreach ($dataDes as $index => $postData) {
        // 	if (isset($saved_slug[$index])) {
        // 		$slug = $saved_slug[$index]['slug'];
        // 	   // dd($slug);
        // 		// Check if a record with the same slug already exists
        // 		$count = XrayResults::where('slug', $slug)->count();

        // 		if ($count > 0) {
        // 			// If a record with the same slug exists, append a suffix or take another action
        // 			$slug .= '-' . Str::random(6); // Appending a random string to make it unique
        // 		}

        // 		// Add the slug to the data
        // 		$postData['slug'] = $slug;

        // 		// Add the data to the array
        // 		$dataDesWithSlugs[] = $postData;
        // 	}
        // }

        // // Create the Banner records
        // foreach ($dataDesWithSlugs as $postData) {
        // 	$status = XrayResults::create($postData);
        // }

        $dataDesWithSlugs = [];

        foreach ($dataDes as $index => $postData) {
            $slug = $saved_slug[$index]['slug'] ?? Str::slug($postData['title']);
            $count = XrayResults::where('slug', $slug)->count();

            if ($count > 0) {
                $slug .= '-' . Str::random(6);
            }

            $postData['slug'] = $slug;
            $dataDesWithSlugs[] = $postData;
        }

        // Insert all entries
        foreach ($dataDesWithSlugs as $postData) {
            $status = XrayResults::create($postData);
        }





        // Move the create method outside the loop
        // foreach ($dataDes as $postData) {

        // $status = XrayResults::create($postData);
        // }

        if ($status) {
            request()->session()->flash('success', 'Case Studies Successfully added');
        } else {
            request()->session()->flash('error', 'Please try again!!');
        }
        return redirect()->route('xrayresults.index', ['lang' => 'en_SG']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $post = XrayResults::findOrFail($id);
        $categories = XrayResultsCategory::get();
        $users = User::get();
        $languages = Language::getListActive();
        return view('backend.xrayresults.edit')->with('categories', $categories)->with('users', $users)->with('post', $post)->with('languages', $languages);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = XrayResults::findOrFail($id);
        // dd($post);

        //  $data=$request->all();

        //	dd($data);
        $exits_photo = $post->photo;

        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = $image->getClientOriginalName();
            $image->move(public_path('custom_images/xray-results'), $imageName);
        }
        //dd($request);

        $data = [
            'title' => !empty($request->title) ? $request->title : $post->title,
            'xray_cat_id' => !empty($request->xray_cat_id) ? $request->xray_cat_id : $post->xray_cat_id,
            'description' => !empty($request->description) ? $request->description : $post->description,
            'photo' => !empty($imageName) ? asset('custom_images/xray-results/' . $imageName) : $exits_photo,
            'age' => !empty($request->age) ? $request->age : $post->age,
            'curve_degree' => !empty($request->curve_degree) ? $request->curve_degree : $post->curve_degree,
            'case_number' => !empty($request->case_number) ? $request->case_number : $post->case_number,
            'seo_meta_title' => !empty($request->seo_meta_title) ? $request->seo_meta_title : $post->seo_meta_title,
            'seo_meta_description' => !empty($request->seo_meta_description) ? $request->seo_meta_description : $post->seo_meta_description,
            'seo_meta_tag' => !empty($request->seo_meta_tag) ? $request->seo_meta_tag : $post->seo_meta_tag,
            'slug' => !empty($request->page_slug) ? $request->page_slug : $post->slug,
            'status' => !empty($request->status) ? $request->status : $post->status
        ];





        //dd($data);
        // return $data;

        $status = $post->fill($data)->save();
        if ($status) {
            request()->session()->flash('success', 'Case Studies Successfully updated');
        } else {
            request()->session()->flash('error', 'Please try again!!');
        }
        return redirect()->route('xrayresults.index', ['lang' => $post->lang]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = XrayResults::findOrFail($id);

        $status = $post->delete();

        if ($status) {
            request()->session()->flash('success', 'Case Studies successfully deleted');
        } else {
            request()->session()->flash('error', 'Error while deleting xray results ');
        }
        return redirect()->route('xrayresults.index', ['lang' => 'en_SG']);
    }
}
