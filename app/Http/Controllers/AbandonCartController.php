<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\AbandonCart;
use App\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\AbandonCartMail;
use Newsletter;
use DrewM\MailChimp\MailChimp;

class AbandonCartController extends Controller
{
	
	public function index()
    {
        
		//$get_abandon_cart_data = AbandonCart::all();
		//$get_abandon_cart_data = AbandonCart::with('user')->get();
		//dd($get_abandon_cart_data);
		//return view('backend.abandon-cart.index')->with('get_abandon_cart_data', $get_abandon_cart_data);
		return view('backend.abandon-cart.index');
    }




	public function abandoncartgenerateTable(Request $request) {
        $columns = array(
            0 => 'id',
            1 => 'name',
            2 => 'email',
            3 => 'number_of_items',
            4 => 'mailsent_status',
            5 => 'created_at',
            6 => 'action'
        );

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        $forms = AbandonCart::with('user');

      if (!empty($request->input('search.value'))) {
        $search = $request->input('search.value');

        $forms->where(function($query) use ($search) {
            $query->where('id', 'LIKE', "%{$search}%")
                ->orWhereHas('user', function($query) use ($search) {
                    $query->where('name', 'LIKE', "%{$search}%")
                          ->orWhere('email', 'LIKE', "%{$search}%");
                })
                ->orWhere('created_at', 'LIKE', "%{$search}%");
        });
    }

        $counts = $forms->count();
        $forms = $forms->orderBy($order, $dir);
        if($limit >= 0) {
            $forms = $forms->offset($start)->limit($limit);
        }

        $forms = $forms->get();

        $values = $this->generateTableValues($forms);
        $json_data = array(
            "input" => $request->all(),
            "draw" => intval($request->input('draw')),
            "recordsTotal" => intval($counts),
            "recordsFiltered" => intval($counts),
            "data" => $values
        );

        return json_encode($json_data);
    }



	protected function generateTableValues($listing) {
        $data = array();

        foreach ($listing as $key => $row) {
            $_r = new \stdClass();
            // $_r->style = ($row->trashed()) ? "background-color: #f5c1c1;" : "";
			
			$_status = '<span class="badge badge-warning">NO</span>';
			if($row->mailsent_status=='yes') {
                $_status = '<span class="badge badge-success">YES</span>';
			}
			

            $data[$key]['DT_RowAttr'] = $_r;
            $data[$key]['id'] = $row->id;
            $data[$key]['name'] = $row->user->name;
            $data[$key]['email'] =$row->user->email;
            $data[$key]['number_of_items'] =$row->number_of_items;
            $data[$key]['created_at'] = $row->created_at->format('Y-m-d H:i:s');
            $data[$key]['mailsent_status'] =$_status;
			$data[$key]['actions'] = view('backend.abandon-cart.actions', [ "row_abandon_cart" => $row ])->render();
        }

        return $data;
    }
	
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

	
	
	public function storeAbandonCartData(Request $request)
    {
        try {
    

			// Extract data from request
			$user_id = $request->user_id;
			$get_language = $request->language;
			$number_of_items = $request->number_of_items;
			$user_ip_address = $request->user_ip_address;
			$user_cart_information = $request->user_cart_information;
			$mailsent_status = 'no';

            
          // Abandon Cart with login
			if(isset($user_id)) {
				
				$abandonCart = AbandonCart::updateOrCreate(
					['user_id' => $user_id], // Search condition
					[
					    'user_id' => $user_id,
						//'user_ip_address' => $user_ip_address,
						'user_cart_information' => json_encode($user_cart_information),
						'number_of_items' => $number_of_items,
						'mailsent_status' => $mailsent_status,
						'lang' => $get_language,
						'abandoncart_status' => 'active'
					]
				);
			}
  		
			// Retrieve the user's abandon cart information
			$user_abandoncart_info = AbandonCart::with('user')->where('user_id', $user_id)->first();

			if ($user_abandoncart_info) {
				$user_email_address = $user_abandoncart_info->user->email ?? '';

				if (!Newsletter::isSubscribed($user_email_addess)) {
					Newsletter::subscribe($user_email_addess);

					// Mailchimp API setup
					$mailchimp = new MailChimp('71464ed21fa57d2cff9013288391bd67-us17');
					$campaignId = '13571774'; // Replace with your actual Mailchimp campaign ID

					// Adjust merge fields as per your template
					$mergeFields = [
					'FNAME' => $user_abandoncart_info->user->name ?? '',
					// Add more merge fields as per your template
					];

					// Send the campaign
					$result = $mailchimp->post("campaigns/$campaignId/actions/send", [
					'email_address' => $user_email_addess,
					'merge_fields' => $mergeFields,
					]);

						if ($mailchimp->success()) {
							echo 'success';
						} else {
						// Failed to trigger the campaign
						$error = $mailchimp->getLastError();
						// Log or handle the error accordingly
						}
			    }
		
				
				// if (!Newsletter::isSubscribed($user_email_address)) {
					 // Newsletter::subscribe($user_email_address);
				// }
				
			}
	
	

            // Check if save/update was successful
            if ($abandonCart) {
                $response = [
                    'status' => 'true',
                    'message' => 'Abandon Cart data successfully saved.'
                ];
            } else {
                throw new \Exception('Failed to save data.');
            }
        } catch (\Exception $e) {
            // Handle any exceptions thrown during validation or database operations
            $response = [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }

        // Return JSON response
        return response()->json($response);
    }
	
	
	
	
	
	
	
	public function show($id)
    {
        $show_abandon_cart_data = AbandonCart::with('user')->find($id);
        // return $order;
        return view('backend.abandon-cart.view')->with('show_abandon_cart_data',$show_abandon_cart_data);
    }
	
	public function abandoncartSentMail($id)
	{
		$user_abandoncart_info = AbandonCart::with('user')->find($id);
		$user_cart =  json_decode($user_abandoncart_info->user_cart_information);
        $product = $user_cart->products[0];
        $rel_prod = Product::where('id' , $product->id)->with('releted_prods')->first();
        // dd($rel_prod->releted_prods);
	    if(!empty($user_abandoncart_info)){
		$user_name = ($user_abandoncart_info->user_id && $user_abandoncart_info->user) ? $user_abandoncart_info->user->name : '';
		$user_email_addess = ($user_abandoncart_info->user_id && $user_abandoncart_info->user) ? $user_abandoncart_info->user->email : '';
		$details = [
            'user_name' => $user_name,
            'user_cart_information' => $user_abandoncart_info->user_cart_information,
            'user_price_details' => $user_abandoncart_info->priceDetails,
            'rele_prod' => $rel_prod->releted_prods
        ];

        // echo "<pre>"; print_r($user_abandoncart_info); echo "</pre>"; die;
		
		
		if (!Newsletter::isSubscribed($user_email_addess)) {
		Newsletter::subscribe($user_email_addess);

		// Mailchimp API setup
		$mailchimp = new MailChimp('71464ed21fa57d2cff9013288391bd67-us17');
		$campaignId = '13571774'; // Replace with your actual Mailchimp campaign ID

		// Adjust merge fields as per your template
		$mergeFields = [
		'FNAME' => $user_abandoncart_info->user->name ?? '',
		// Add more merge fields as per your template
		];

		// Send the campaign
		$result = $mailchimp->post("campaigns/$campaignId/actions/send", [
		'email_address' => $user_email_addess,
		'merge_fields' => $mergeFields,
		]);

			if ($mailchimp->success()) {
				echo 'success';
			} else {
			// Failed to trigger the campaign
			$error = $mailchimp->getLastError();
			// Log or handle the error accordingly
			}
		}
		
		
		
		
		
		// if (!Newsletter::isSubscribed($user_email_addess)) {
	         // Newsletter::subscribe($user_email_addess);
		// }
		$recipientEmail = 'webdev20222@gmail.com';
		$sent_mail = Mail::to($user_email_addess)->send(new AbandonCartMail($details));
		if($sent_mail){
		 AbandonCart::updateOrCreate( ['user_id' => $user_abandoncart_info->user_id], ['mailsent_status' => 'yes'] );	
			
			return redirect('/admin/abandon-cart')->with('success', 'Mail sent successfully');
		       //echo 'sent mail successfully';	
		}else{
			 return redirect('/admin/abandon-cart')->with('error', 'Failed to send mail');
		}
		//dd($user_abandoncart_info);
		
		}
		
	}
	
	
	    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $page=AbandonCart::findOrFail($id);
       
        $status=$page->delete();
        
        if($status){
            request()->session()->flash('success','Abandon Cart User successfully deleted');
        }
        else{
            request()->session()->flash('error','Error while deleting user ');
        }
        return redirect()->route('abandon-cart.index');
    }
	
}