<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Seeder;

class ItemsSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $wishlistItems = [
            [
                'name' => 'Smart Watch',
                'image' => 'images/smartwatch.webp',
            ],
            [
                'name' => 'Bluetooth Speaker',
                'image' => 'images/blutooth.webp',
            ],
            [
                'name' => 'Gaming Console',
                'image' => 'images/game.webp',
            ],
            [
                'name' => 'Noise Cancelling Headphones',
                'image' => 'images/headphones.webp',

            ],
            [
                'name' => 'Fitness Tracker',
                'image' => 'images/fitness.webp',
            ],
            [
                'name' => 'Personalized Mug',
                'image' => 'images/mug.webp',
            ],
            [
                'name' => 'Gift Card',
                'image' => 'images/card.webp',

            ],
            [
                'name' => 'Sweater',
                'image' => 'images/sweeter.webp',
            ],
            [
                'name' => 'Scented Candles',
                'image' => 'images/candal.webp',
            ],
            [
                'name' => 'Travel Bag',
                'image' => 'images/bag.webp',
            ],
        ];

        foreach ($wishlistItems as $key => $item) {
            Item::updateOrCreate(
                ['name' => $item['name']],
                ['image' => $item['image']]
            );
        }

    }
}
