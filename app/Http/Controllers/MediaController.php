<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{
  

	public function index(Request $request)
	{
		$query = $request->input('s');

		$media = Media::query();

		if (!empty($query)) {
			$media->where('filename', 'like', '%'.$query.'%');
		}

		$media = $media->latest()->get();

		return view('backend.media.index', compact('media'));
	}

    // public function upload(Request $request)
    // {
        // $request->validate([
            // 'file' => 'required|file|mimes:jpeg,png,pdf,docx|max:2048',
        // ]);

        // $file = $request->file('file');
        // $filename = $file->getClientOriginalName();
	    // $file->move(public_path('media'), $filename);
		// $get_image_url = asset('media/' . $filename);

        // $media = Media::create([
            // 'filename' => $filename,
            // 'file_url' => $get_image_url,
            // 'file_type' => $file->getClientMimeType(),
        // ]);

        // if($media){
            // request()->session()->flash('success','File uploaded successfully');
        // }
        // else{
            // request()->session()->flash('error','Please try again!!');
        // }
        // return redirect()->route('media.index');
    // }
	
	public function upload(Request $request)
	{
		// Validate the request if needed
		$request->validate([
			'files.*' => 'required|file|mimes:jpg,png|max:2048', // example validation rules
		]);

		// Initialize counters for success and failure
		$successCount = 0;
		$errorCount = 0;
      //   dd($request->file('files'));
		// Handle file uploads
		if ($request->hasFile('files')) {
			foreach ($request->file('files') as $file) {
				$filename = $file->getClientOriginalName();
				$fileSize = $file->getSize();
				$file->move(public_path('media'), $filename);
				$fileUrl = asset('media/' . $filename);
            //    dd($fileSize);
				// Attempt to save file details to database
				$media = Media::create([
					'filename' => $filename,
					'file_url' => $fileUrl,
					'file_type' => $file->getClientMimeType(),
				]);

				if ($media) {
					$successCount++;
				} else {
					$errorCount++;
				}
			}

			// Flash messages based on upload results
			if ($successCount > 0) {
				$request->session()->flash('success', $successCount . ' file(s) uploaded successfully.');
			}
			if ($errorCount > 0) {
				$request->session()->flash('error', 'Failed to upload ' . $errorCount . ' file(s). Please try again.');
			}
		} else {
			// No files were uploaded
			$request->session()->flash('error', 'No files were uploaded.');
		}

		// Redirect to the media index route
		return redirect()->route('media.index');
	}
	
	
	
	
	

    public function destroy($id)
    {
        $media = Media::findOrFail($id);
        $media->delete();
		
		if($media){
            request()->session()->flash('success','File successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting File ');
        }

		return redirect()->route('media.index');
        //return response()->json(['message' => 'File deleted successfully']);
    }
}