<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\User\UserRepository;
use App\Repositories\Organisation\OrganisationRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;



class UserController extends Controller
{
    protected $userRepository;

    // Attach dependency injecttion
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /*
    * Action: index
    * Params : Request $request
    */
    public function index(Request $request)
    {
        $orgRe = new OrganisationRepository();
        // Get options for selectbox reactjs
        $selectBoxItems = (object) array_merge([0 => "Select a group"], $orgRe->getAll()->pluck('name', 'id')->toArray());
        $arrSearch = [
            'org_id'       => $request->input('org_id', null),
            'name'   => $request->input('name', null),
        ];
        $users = $this->userRepository->getList($arrSearch);
        return response()->json([
            "data"                  =>[
                "users"             => $users,
                "data_select_box"   => $selectBoxItems
            ]
        ], 200);
    }
    /*
    * Action: create
    * Params : Request $request
    */
    public function create(Request $request)
    {
        $data = array(
            'name'         => $request->input('name', null),
            'email'        => $request->input('email', null),
            'password'     => $request->input('password', null),
            'org_id'       => $request->input('org_id', null),
        );
        $validator = Validator::make($request->json()->all(), [
            'email'   => 'required|email|unique:users,email',
            'name'    => 'required',
            'password'=> 'required|min:6|max:20',
            'org_id'  => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => 0,
                'errors' => $validator->errors()
            ]);
        }

        try {
            DB::beginTransaction();
            $item = $this->userRepository->create([
                'name'      => $data['name'],
                'email'     => $data['email'],
                'org_id'    => $data['org_id'],
                'password'  => Hash::make($data['password']),
            ]);
            DB::commit();
            return response()->json([
                'status' => 200,
                'data'   => $item,
                'action' => 'create'
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            $message = $e->getPrevious()->getMessage();
            return response()->json([
                'status' => 500,
                "message" => $message
            ]);
        }
    }

    /*
    * Action: get
    * Params : Request $request->id
    */
    public function get($id)
    {
        $user = $this->userRepository->find($id);
        return response()->json([
            "data"  => $user
        ], 200);
    }

    /*
    * Action: update
    * Params : Request $request, $id
    *
    */
    public function update(Request $request, $id)
    {
        $password = $request->input('password', null);
        $data = array(
            'name'         => $request->input('name', null),
            'email'        => $request->input('email', null),
            'org_id'       => (int) $request->input('org_id', 0)
        );

        $validator = Validator::make($request->json()->all(), [
            'email'   => 'required|email|unique:users,email,'. $id,
            'name'    => 'required',
            'org_id'  => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => 0,
                'errors' => $validator->errors()
            ]);
        }

        if ($password) {
            $data['password'] = Hash::make($password);
        }
        try {
            DB::beginTransaction();
            $item =  $this->userRepository->update($id, $data);
            DB::commit();
            return response()->json([
                'status' => 200,
                'data'   => $item,
                'action' => 'update'
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            $message = $e->getPrevious()->getMessage();
            return response()->json([
                'status' => 500,
                "message" => $message
            ]);
        }
    }
    /*
    * Action:  delete
    * Params : $id
    */
    public function delete($id)
    {
        $user = $this->userRepository->delete($id);
        return response()->json([
            "data"      => $user,
            'action'    => 'delete'
        ], 200);
    }
}
