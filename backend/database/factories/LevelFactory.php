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
            'player_car' => [
                'x' => 0,
                'y' => 0,
                'width' => 20,
                'height' => 15,
                'rotate' => 0,
                'color' => fake()->hexColor()
            ],
            'parking_spots' => [
                [
                    'id' => 1,
                    'x' => 75,
                    'y' => 0,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => true,
                    'color' => fake()->hexColor()
                ],
                [
                    'id' => 2,
                    'x' => 75,
                    'y' => 15,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => fake()->hexColor()
                ],
                [
                    'id' => 3,
                    'x' => 75,
                    'y' => 30,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => fake()->hexColor()
                ],
                [
                    'id' => 4,
                    'x' => 75,
                    'y' => 45,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => fake()->hexColor()
                ],
                [
                    'id' => 5,
                    'x' => 75,
                    'y' => 60,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => fake()->hexColor()
                ],
                [
                    'id' => 6,
                    'x' => 75,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => fake()->hexColor()
                ]
            ]
        ];
    }
}
