<?php
namespace App\Repositories;

use App\Models\Item;
use Prettus\Repository\Eloquent\BaseRepository;

class ItemRepository extends BaseRepository {

    /**
     * Specify Model class name
     *
     * @return string
     */
    function model() {
        return Item::class;
    }
}
