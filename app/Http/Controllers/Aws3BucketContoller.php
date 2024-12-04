<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Category;
use App\Models\Product;
use App\Models\Post;
use App\Models\Footer;
use App\Models\XrayResults;
use App\Models\BenifitHomepage;
use App\Models\Widgets;
use App\Models\Banner;
use App\Models\Testimonails;
 
class Aws3BucketContoller extends Controller
{
    public function getFileUploadForm()
    {

		
		$category=Category::where('is_parent',1)->get();
        return view('backend.aws3bucket.file-upload')->with('categories',$category);
    }
 
    public function store(Request $request)
    {
	
		  if ($request->hasFile('filename')) {
            $file = $request->file('filename');

            // Validate file
            // $request->validate([
                // 'filename' => 'required|mimes:csv,txt',
            // ]);

            // Process CSV file
            $csvFile = fopen($file->path(), 'r');
            
            // Read header row
            $header = fgetcsv($csvFile);
	        
            // Now you can iterate through the data rows
            while (($data = fgetcsv($csvFile)) !== false) {
                $csvValue = array_combine($header, $data);
				
				$csvValue['description'] = !empty($csvValue['description']) ? $csvValue['description'] : null;
				$insert_testi = XrayResults::create($csvValue);
				if($insert_testi){
                 echo'insert';					
				}else{
					echo'not insert';
				}
                // Your processing logic here
                // ...

                // Example: Insert post into 'posts' table
                // $post = new Post();
                // $post->post_title = $csvValue['Topic/Heading'];
                // $post->save();
            }

            fclose($csvFile);

            // Additional logic after processing the CSV file

         return redirect()->route('file-upload')->with('success', 'CSV file uploaded and processed successfully.');
        }

      //  return redirect()->route('upload.form')->withErrors(['filename' => 'Please upload a valid CSV file.']);
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		


    }
	
	
    // private function processCsvFile($filePath)
    // {
        // $csvData = [];

        // if (($handle = fopen($filePath, 'r')) !== false) {
            // while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                // $csvData[] = $data;
            // }
            // fclose($handle);
        // }

        // return $csvData;
    // }
	
	
	
}