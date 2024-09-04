<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user =
        [
            'name' => 'John Doe',
            'email' => 'john@gmail.com',
            'password' => bcrypt('password123'),
        ];
        User::create($user);

    }
}
