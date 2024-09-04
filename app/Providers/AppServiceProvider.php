<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\WishlistRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        $this->app->bind(WishlistRepository::class, WishlistRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
