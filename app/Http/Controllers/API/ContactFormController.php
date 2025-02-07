<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ContactForm;
use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use App\Mail\MyMail;
use App\Mail\AdminCfMail;
use Newsletter;

class ContactFormController extends Controller
{

	public function contact_form_store(Request $request)
	{
		//dd($request->all());

		$data = $request->all();

		\App::setLocale($request->language);

		// Check if files were uploaded
		if ($request->hasFile('files')) {
			$imageNames = []; // Initialize an array to store image names

			// Loop through each uploaded file
			foreach ($request->file('files') as $file) {
				// Get original file name
				$imageName = $file->getClientOriginalName();
				$imageNames[] = asset('custom_images/contact-form/' . $imageName); // Store each image name in the array

				// Move the uploaded file to the desired directory
				$file->move(public_path('custom_images/contact-form'), $imageName);
			}
		}
		// dd('test');
		// dd('test');
		// if ($data['file']) {
		// $image = $data['file']; // Get the uploaded file object
		// $imageName = $image->getClientOriginalName(); // Get the original name of the image

		// $image->move(public_path('custom_images/contact-form'), $imageName);


		// } else {
		// $imageName = ''; 
		// }

		$save_form_info = [
			'name' => $request->name,
			'email_address' => $request->email_address,
			'phone_number' => $request->phone_number,
			'country' => $request->country,
			'contact_enquiry' => $request->contact_enquiry,
			'description' => $request->description,
			'form_type' => $request->form_type,
			'lang' => $request->lang,
			'photo' => isset($imageNames) ? json_encode($imageNames) : null,
		];

		//dd($data);
		$xray = ContactForm::create($save_form_info);

		if (!empty($xray)) {

			$details = [
				'name' => $request->name,
				'email_address' => $request->email_address,
				'phone_number' => $request->phone_number,
				'country' => $request->country,
				'contact_enquiry' => $request->contact_enquiry,
				'photo' => isset($imageNames) ? json_encode($imageNames) : null,
				'message' => $request->description
			];

			$user_name = $request->name;
			$user_email = $request->email_address;
			$settings = Settings::first();
			//$ccEmail = 'rnd.emp896@gmail.com';
			// $ccEmail = ['drkevinlau@scoliolife.com', 'shibashishoo007@gmail.com'];
			$ccEmail = 'drkevinlau@scoliolife.com';

			$recipientEmail = (($request->lang == 'en_MY') ? 'clinic.my@scoliolife.com' : ($request->lang == 'id_ID') )? 'clinic.id@scoliolife.com' : $settings->email;
			//$recipientEmail = 'webdev20222@gmail.com';
			//$recipientEmail = 'shibashishoo007@gmail.com';
			$sent_mail = Mail::to($user_email)->send(new MyMail($details));
			$admin_sent_mail = Mail::to($recipientEmail)->cc($ccEmail)->send(new AdminCfMail($details));

			//$sent_mail = Mail::to($user_email)->send(new MyMail($details));
			//if (!Newsletter::isSubscribed($user_email)) {
			$check_mailchimp_user = Newsletter::subscribe(
				$user_email,
				[
					'FNAME' => $user_name,
					'LNAME' => $user_name,
				]
			);
			if (Newsletter::lastActionSucceeded()) {
				$mailchimp_response = 'Subscribe saved successfully';
			} else {
				$mailchimp_response = 'Already subscribed with this email';
			}

		}



		$response = [
			'success' => true,
			'message' => 'Data saved successfully',
			'data' => $xray,
			'mailchimp_response' => $mailchimp_response
			//'sent_mail' => 'Email sent successfully' . $sent_mail,
		];

		\App::setLocale('en');
		return response()->json($response, 201);




	}
	public function subsrcibe_mailchimp(Request $request)
	{	
		try {
			if (!Newsletter::hasMember($request->subsrcibe_email)) {
				$status = Newsletter::subscribe($request->subsrcibe_email);
				// dd($status,Newsletter::isSubscribed($request->subsrcibe_email));
				// dd(Newsletter::getLastError());
				if ($status) {
					$response = [
						'success' => true,
						'message' => 'Subscribe saved successfully'
					];
					return response()->json($response, 201);
				} else {
					$response = [
						'success' => false,
						'message' => 'Failed to save subscription'
					];
					return response()->json($response, 500);
				}
			} else {
				$response = [
					'success' => false,
					'message' => 'Already subscribed with this email',
					'data' => ''
				];
				return response()->json($response, 400); // You can use a different HTTP status code, like 400 Bad Request, to indicate that the request was invalid.
			}
		} catch (\Throwable $th) {
			return response()->json(['error' => $th->getMessage()], 500);
		}

		

	}


}
