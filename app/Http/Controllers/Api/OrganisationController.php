<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Organisation\OrganisationRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;



class OrganisationController extends Controller
{
    protected $orgRepository;

    // Attach dependency injecttion
    public function __construct(OrganisationRepository $orgRepository)
    {
        $this->orgRepository = $orgRepository;
    }

    /*
    * Action: index
    * Params : Request $request
    */
    public function index(Request $request)
    {
        $data = $this->orgRepository->getList();
        return response()->json([
            "data"                  =>[
                'organisations' => $data
            ]
        ], 200);
    }
    /*
    * Action: create
    * Params : Request $request
    */
    public function save(Request $request, $id = 0)
    {

        $validator = Validator::make($request->json()->all(), [
            'name'      => 'required',
            'policy'    => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => 0,
                'errors' => $validator->errors()
            ]);
        }
        try {
            DB::beginTransaction();
            $data = array(
                'name'          => $request->input('name', null),
                'policy'        => serialize($request->input('policy', []))
            );
            if ($id > 0) {
                $item =  $this->orgRepository->update($id, $data);
            } else {
                $item = $this->orgRepository->create($data);
            }
            DB::commit();
            return response()->json([
                'status' => 200,
                'data'   => $item,
                'action' => $id > 0 ? 'update' :'create'
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
        $item = $this->orgRepository->find($id);
        return response()->json([
            "data"  => $item
        ], 200);
    }

    // /*
    // * Action: updateSingleUser
    // * Params : Request $request, $id
    // *
    // */
    // public function update(Request $request, $id)
    // {
    //     $password = $request->input('password', null);
    //     $data = array(
    //         'name'         => $request->input('name', null),
    //         'email'        => $request->input('email', null),
    //         'org_id'       => (int) $request->input('org_id', 0)
    //     );

    //     $validator = Validator::make($request->json()->all(), [
    //         'email'   => 'required|email|unique:users,email,'. $id,
    //         'name'    => 'required',
    //         'org_id'  => 'required',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status'  => 0,
    //             'errors' => $validator->errors()
    //         ]);
    //     }

    //     if ($password) {
    //         $data['password'] = Hash::make($password);
    //     }
    //     try {
    //         DB::beginTransaction();
    //         $item =  $this->orgRepository->update($id, $data);
    //         DB::commit();
    //         return response()->json([
    //             'status' => 200,
    //             'data'   => $item,
    //             'action' => 'update'
    //         ]);
    //     } catch (\Exception $e) {
    //         DB::rollback();
    //         $message = $e->getPrevious()->getMessage();
    //         return response()->json([
    //             'status' => 500,
    //             "message" => $message
    //         ]);
    //     }
    // }
    /*
    * Action:  delete
    * Params : $id
    */
    public function delete($id)
    {
        $item = $this->orgRepository->delete($id);
        return response()->json([
            "data"      => $item,
            'action'    => 'delete'
        ], 200);
    }
}
