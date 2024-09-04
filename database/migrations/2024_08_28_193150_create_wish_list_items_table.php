<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wishlist_items', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('wishlist_id')->unsigned()->nullable();
            $table->foreign('wishlist_id')
             ->references('id')->on('wishlists')
             ->onDelete('set null');
            $table->index(['wishlist_id']);

            $table->bigInteger('item_id')->unsigned()->nullable();
            $table->foreign('item_id')
             ->references('id')->on('items')
             ->onDelete('set null');
            $table->index(['item_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wishlist_items');
    }
};
