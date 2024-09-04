<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Repositories\WishlistRepository;

class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $repository;
    private $itemRepository;

    public function __construct(WishlistRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        try {
            $wishlists = $this->repository->findByField('user_id', auth()->user()->id)->toArray();
            return Inertia('WishLists', ['wishlists' => $wishlists]);
        } catch (\Exception $e) {
            Log::error("message");
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:wishlists',
            'description' => 'string|nullable'
        ]);

        try {
            $input = [
                'name' => $request->name,
                'description' => $request->description,
                'user_id' => auth()->user()->id
            ];
            $this->repository->create($input);
            return back()->with('success','WishList saved successfully');
        } catch (\Exception $e) {
            Log::error($e);
            return back()->withErrors(['error' => 'Unable to Create Wishlist.'])->withStatus(422);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'string|nullable'
        ]);

        try {
            $input = [
                'name' => $request->name,
                'description' => $request->description
            ];
            $this->repository->update($input, $id);
            return back()->with('success','Wishlist Updated successfully');
        } catch (\Exception $e) {
            Log::error($e);
            return back()->withErrors(['error' => 'Unable to Update Wishlist.'])->withStatus(422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $this->repository->delete($id);
            return back()->with('success','item deleted successfully');
        } catch (\Exception $e) {
            Log::error($e);
            return back()->withErrors(['error' => 'Unable to Delete Wishlist.'])->withStatus(422);
        }

    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $wishlist = $this->repository->find($id);
            $items = $this->itemRepository->all();
            return Inertia('Wishlist', ['wishlist' => $wishlist, 'items' => $items]);
        } catch (\Exception $e) {
            Log::error($e);
            return back()->withErrors(['error' => 'Unable to Fetch Wishlist.'])->withStatus(422);
        }
    }
    /**
     * Display the specified resource with items.
     */
    public function getWishlistDetails(){
        try {

            $wishlist_details = $this->repository->with(['items'])->get()->keyBy('id')->toArray();
            return Inertia('WishlistDetails', ['wishlist_detail'=>$wishlist_details]);

        } catch (\Exception $e) {
            Log::error($e);
            return back()->withErrors(['error' => 'Unable to Fetch Wishlist.'])->withStatus(422);
        }
    }

}
