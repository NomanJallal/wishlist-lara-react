<?php
namespace App\Http\Controllers;

use Exception;
use App\Models\Item;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Repositories\ItemRepository;
use App\Repositories\WishlistRepository;

class ItemController extends Controller {

    /**
     * @var ItemRepository
     */
    protected $repository;
    protected $wishlistRepository;

    public function __construct(ItemRepository $repository, WishlistRepository $wishlistRepository) {
        $this->repository = $repository;
        $this->wishlistRepository = $wishlistRepository;
    }
    public function index() {
        try {
            $items = $this->repository->with(['wishLists'])->all();
            return Inertia('Items', ['items' => $items, 'wishlists' => $this->wishlistRepository->all()]);
        } catch (\Exception $e) {
            Log::error($e);
            return back()->withErrors(['error' => $e->getMessage()])->withStatus(422);
        }
    }
    public function assignWishLists(Request $request) {
        $request->validate([
            'wishlist_id' => 'required|exists:wishlists,id',
            'item_id' => 'required|exists:items,id'
        ]);
        try {
            $wishlistId = $request->wishlist_id ?? null;
            $item = $this->repository->find($request->item_id);

            $item->wishListItems()->create([
                'wishlist_id' => $wishlistId,
                'item_id' => $item->id,
            ]);

            return back()->with('success', 'Wishlists assigned successfully');
        } catch (\Exception $e) {
            Log::error($e);
            return back()->withErrors(['error' => $e->getMessage()])->withStatus(422);
        }
    }

    public function removeWishList($itemId, $wishlistId) {
        try {
            $item = $this->repository->find($itemId);
            if (!$item) {
                throw new Exception("Item not found");
            }
            $exists = $this->wishlistRepository->where('id', $wishlistId)->where('user_id', auth()->id())->whereHas('wishListItems',function($query) use ($itemId){
                $query->where('item_id', $itemId);
            })->exists();
            if (!$exists) {
                throw new Exception("Wishlist not found");
            }
            $item->wishListItems()->where('wishlist_id', $wishlistId)->delete();
            return back()->with('success', 'Wishlist removed successfully');
        } catch (\Exception $e) {
            Log::error($e);
            return back()->withErrors(['error' => $e->getMessage()])->withStatus(422);
        }
    }

}
