<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function items()
    {
        return $this->hasManyThrough(Item::class, WishlistItem::class, 'wishlist_id', 'id', 'id', 'item_id');
    }
    public function wishListItems()
    {
        return $this->hasMany(WishlistItem::class);
    }
}
