<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Level>
 */
class LevelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->words(3, true),
            'order' => fake()->unique()->numberBetween(1, 20),
            'description' => fake()->sentence(),
            'base_color' => fake()->hexColor(),
            'player_car' => json_encode([
                'x' => 50,
                'y' => 50,
                'width' => 60,
                'height' => 30,
                'rotate' => 0,
                'color' => '#FF6347'
            ]),
            'parking_spots' => json_encode([
                [
                    'id' => 1,
                    'x' => 200,
                    'y' => 100,
                    'width' => 70,
                    'height' => 40,
                    'rotate' => 0,
                    'is_target' => true,
                    'color' => '#000000'
                ],
                [
                    'id' => 2,
                    'x' => 300,
                    'y' => 100,
                    'width' => 70,
                    'height' => 40,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#1E90FF'
                ],
                [
                    'id' => 3,
                    'x' => 400,
                    'y' => 100,
                    'width' => 70,
                    'height' => 40,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#26b349ff'
                ],
                [
                    'id' => 4,
                    'x' => 500,
                    'y' => 100,
                    'width' => 70,
                    'height' => 40,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#e5e90fff'
                ]
            ])
        ];
    }
}
