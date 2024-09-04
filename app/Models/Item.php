<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model {
    use HasFactory;

    protected $guarded = [];

    public function wishLists() {
        return $this->hasManyThrough(Wishlist::class, WishlistItem::class, 'item_id', 'id', 'id', 'wishlist_id');
    }
    public function wishListItems(){
        return $this->hasMany(WishlistItem::class);
    }
}
