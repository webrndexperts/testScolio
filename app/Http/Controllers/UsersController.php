<?php

namespace App\Http\Controllers;
use App\Mail\Test;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Models\UserSecretCredentials;
use Carbon\Carbon;
use Mail;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       // $users=User::orderBy('id','DESC')->get();
        $total_user_count = User::count();
        //return view('backend.users.index')->with('users',$users)->with('total_user_count',$total_user_count);
        return view('backend.users.index', compact('total_user_count'));
    }
	
	public function test () {
        Mail::to('rnd.emp896@gmail.com')->send(new Test());
    }
	
	public function generateTable(Request $request) {
        $columns = array(
            0 => 'id',
            1 => 'name',
            2 => 'email',
            3 => 'created_at',
            4 => 'role',
            5 => 'status',
        );

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        $forms = User::Query();

        if(!empty($request->input('search.value'))) {
            $search = $request->input('search.value');

            $forms = $forms->where(function($q) use($search) {
                $q->where('id', 'LIKE', "%{$search}%")
                    ->orWhere('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('created_at', 'LIKE', "%{$search}%");
            });
        }

        $counts = $forms->count();
		//dd($counts);
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
			
			$_status = '<span class="badge badge-warning">Draft</span>';
			if($row->status=='active') {
                $_status = '<span class="badge badge-success">Publish</span>';
			}
			

            $data[$key]['DT_RowAttr'] = $_r;
            $data[$key]['id'] = $row->id;
            $data[$key]['name'] = $row->name;
            $data[$key]['email'] =$row->email;
            $data[$key]['role'] =$row->role;
            $data[$key]['status'] =$_status;
            $data[$key]['join_date'] = Carbon::parse($row->created_at)->format('Y-m-d h:i:s A');
            $data[$key]['actions'] = view('backend.users.actions', [ "user" => $row ])->render();
        }

        return $data;
    }
	

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('backend.users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,
        [
            'name'=>'string|required|max:30',
            'email'=>'string|required|unique:users',
            'password'=>'string|required',
            'role'=>'required|in:admin,user',
            'status'=>'required|in:active,inactive'
        ]);

        if (!empty($request->hasFile('photo'))) {
            $image = $request->file('photo');
            $imageName = $image->getClientOriginalName();
            $image->move(public_path('custom_images/users'), $imageName);
        }
		if($request->password){
				$data_password = hash('md5', $request->password);
				//$data_password = Hash::make($request->password);

		}	
        $status =  User::create([
            'name' => $request->name,
		    'email' => $request->email,
		    'password' => $data_password,
           // 'role' => $request->role,
            'status' => $request->status,
		    'photo' => !empty($imageName) ? asset('custom_images/users/' . $imageName) : ''
        ]);
        // dd($status);
        if($status){
		   $user_id = $status->id;
			if(!empty($user_id)){
				UserSecretCredentials::updateOrCreate(['user_id' => $user_id],['secret_pass' => $request->password]);
			}	
            request()->session()->flash('success','Successfully added user');
        }
        else{
            request()->session()->flash('error','Error occurred while adding user');
        }
        return redirect()->route('users.index');

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
        $user=User::findOrFail($id);
        return view('backend.users.edit')->with('user',$user);
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
        $user=User::findOrFail($id);
		$validateArray = [
            'name'=>'string|required|max:30',
            'email'=>'string|required',
            'role'=>'required|in:admin,user',
            'status'=>'required|in:active,inactive',
        ];
		
		if($request->password) {
			$validateArray['password'] = 'min:6|same:password_confirmation';
            $validateArray['password_confirmation'] = 'min:6';
		}
		
		
        $this->validate($request, $validateArray);
        
        if (!empty($request->hasFile('photo'))) {
            $image = $request->file('photo');
            $imageName = $image->getClientOriginalName();
            $image->move(public_path('custom_images/users'), $imageName);
        }
        
        $data =  [
            'name' => $request->name,
		    'email' => $request->email,
           // 'role' => $request->role,
            
			'photo' => !empty($imageName) ? asset('custom_images/users/' . $imageName) : '',
            'status' => $request->status
        ];
		if($request->password){
			$data_password = hash('md5', $request->password);
			//$data_password = Hash::make($request->password);
			$data['password'] = $data_password;
		}

      //   dd($data);
        
        $status=$user->fill($data)->save();
        if($status){
		
		   $user_id = $user->id;
			if(!empty($user_id)){
				UserSecretCredentials::updateOrCreate(['user_id' => $user_id],['secret_pass' => $request->password]);
			}			
			
            request()->session()->flash('success','Successfully updated');
        }
        else{
            request()->session()->flash('error','Error occured while updating');
        }
        return redirect()->route('users.index');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $delete=User::findorFail($id);
        $status= $delete->delete();
		
        if($status){
		   UserSecretCredentials::where('user_id', $id)->delete();
            request()->session()->flash('success','User Successfully deleted');
        }
        else{
            request()->session()->flash('error','There is an error while deleting users');
        }
        return redirect()->route('users.index');
    }
}
