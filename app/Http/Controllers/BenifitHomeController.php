<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BenifitHomepage;
use App\Models\BenifitHomeParents;
use App\Models\Language;
use App\User;
use Illuminate\Support\Str;

class BenifitHomeController extends Controller
{
    public function index()
    {

        if (isset($_GET['lang'])) {
            $get_current_lang = !empty($_GET['lang']) ? $_GET['lang'] : '';
            $menu_model = BenifitHomepage::where('lang', $get_current_lang)->orderBy('id', 'DESC')->paginate(10);
        }

        //$pages=BenifitHomepage::getAllBenifitHomePage();
        // return $posts;
        return view('backend.homepage-benifits.index')->with('pages', $menu_model)->with('get_current_lang', $get_current_lang);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
        $languages = Language::getListActive();
        return view('backend.homepage-benifits.create')->with('languages', $languages);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'post_name' => 'required',
            'status' => 'required|in:active,inactive',
            'post' => 'required|array',
        ]);

        $data = $request->all();
        $postType = $data['post_name'];

        // Decide slug
        if (in_array($postType, ['non-treatment', 'specail-offer'])) {
            $slug = $data['page_slug'];
        } else {
            $slug = Str::slug($data['post']['en_SG']['title'] ?? uniqid());
        }

        // Ensure unique slug
        if (BenifitHomepage::where('slug', $slug)->exists()) {
            $slug .= '-' . time();
        }

        // Create parent
        $parent = BenifitHomeParents::create([
            'slug' => $slug
        ]);

        $dataDes = [];

        foreach ($data['post'] as $lang => $value) {

            if (empty($value['title'])) {
                continue;
            }

            $imagePath = '';

            if (!empty($value['image'])) {
                $image = $value['image'];
                $imageName = time() . '_' . $lang . '.' . $image->getClientOriginalExtension();

                $folder = ($postType === 'benifits-clinic')
                    ? 'custom_images/homepage-benifits'
                    : 'custom_images/non-treatment';

                $image->move(public_path($folder), $imageName);
                $imagePath = asset($folder . '/' . $imageName);
            }

            $dataDes[] = [
                'homebenifit_parent_id' => $parent->id,
                'slug' => $slug,
                'post_type' => $postType,
                'count_numbers' => $postType === 'benifits-clinic' ? ($data['count_numbers'] ?? '') : '',
                'lang' => $lang,
                'title' => $value['title'],
                'description' => $value['description'] ?? '',
                'photo' => $imagePath,
                'status' => $data['status']
            ];
        }

        BenifitHomepage::insert($dataDes);

        return redirect()
            ->route('homepage-benifits.index', ['lang' => 'en_SG'])
            ->with('success', 'Homepage Benefits added successfully');
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
        $post = BenifitHomepage::findOrFail($id);
        $languages = Language::getListActive();
        return view('backend.homepage-benifits.edit')->with('post', $post)->with('languages', $languages);
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
        $page = BenifitHomepage::findOrFail($id);
        $exits_photo = $page->photo;
        $post_type = $page->post_type;
     
        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = $image->getClientOriginalName();
            $image->move(public_path('custom_images/non-treatment'), $imageName);
        }

        $extraVideoUrls = null;
        if ($request->filled('extra_video_urls')) {
            $extraVideoUrls = array_values(
                array_filter(
                    array_map('trim', explode(',', $request->extra_video_urls))
                )
            );
        }

        $data = [
            'title' => !empty($request->title) ? $request->title : $page->title,
            'description' => !empty($request->description) ? $request->description : $page->description,
            //'photo' => !empty($imageName) ? asset('custom_images/non-treatment/' . $imageName) : $exits_photo,
            'photo' => !empty($request->photo) ? $request->photo : $exits_photo,
            'count_numbers' => !empty($request->count_numbers) ? $request->count_numbers : $page->count_numbers,
            'video_url' => !empty($request->video_url) ? $request->video_url : $page->video_url,
            'post_type' => !empty($request->post_name) ? $request->post_name : $post_type,
            'slug' => !empty($request->page_slug) ? $request->page_slug : $page->slug,
            'extra_video_urls' => !empty($extraVideoUrls) ? $extraVideoUrls : null,
            'status' => $request->status
        ];

        //dd($data);


        $status = $page->fill($data)->save();
        if ($status) {
            request()->session()->flash('success', 'Homepage Benifits Successfully updated');
        } else {
            request()->session()->flash('error', 'Please try again!!');
        }
        return redirect()->route('homepage-benifits.index', ['lang' => $page->lang]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $page = BenifitHomepage::findOrFail($id);

        $status = $page->delete();

        if ($status) {
            request()->session()->flash('success', 'Homepage Benifits successfully deleted');
        } else {
            request()->session()->flash('error', 'Error while deleting page ');
        }
        return redirect()->route('homepage-benifits.index', ['lang' => 'en_SG']);
    }
}
