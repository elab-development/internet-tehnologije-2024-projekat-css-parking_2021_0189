<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Level;
use App\Models\UserLevel;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Kreiranje admin korisnika
        User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password')
        ]);

        // Kreiranje običnih korisnika
        User::factory(100)->create();

        // Kreiranje levela
        //Level::factory(5)->create();
        $this->call(LevelSeeder::class);

        // Kreiranje user_level veza
        foreach (User::all() as $user) {
            foreach (Level::all()->random(2) as $level) {
                UserLevel::create([
                    'user_id' => $user->id,
                    'level_id' => $level->id,
                    'duration' => rand(30, 300),
                ]);
            }
        }
    }
}
