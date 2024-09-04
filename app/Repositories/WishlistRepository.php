<?php
namespace App\Repositories;

use App\Models\Wishlist;
use Prettus\Repository\Eloquent\BaseRepository;

class WishlistRepository extends BaseRepository {

    /**
     * Specify Model class name
     *
     * @return string
     */
    function model() {
        return Wishlist::class;
    }
}
