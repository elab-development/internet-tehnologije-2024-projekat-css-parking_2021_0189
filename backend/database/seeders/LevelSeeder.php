<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Level;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $levels = [
            [
                'title' => 'Nivo 1',
                'order' => 1,
                'description' => 'Koristi translateX() da parkiraš auto. Pronađi pravu vrednost da se pomeriš na prazno mesto.',
                'base_color' => '#525252ff',
                'player_car' => [
                    'x' => 0, 'y' => 0, 'width' => 20, 'height' => 15, 'rotate' => 0, 'color' => '#FF0000',
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
                    'color' => '#525252ff'
                ],
                [
                    'id' => 2,
                    'x' => 75,
                    'y' => 15,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#09ff00ff'
                ],
                [
                    'id' => 3,
                    'x' => 75,
                    'y' => 30,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#0011ffff'
                ],
                [
                    'id' => 4,
                    'x' => 75,
                    'y' => 45,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#e100ffff'
                ],
                [
                    'id' => 5,
                    'x' => 75,
                    'y' => 60,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#fffb00ff'
                ],
                [
                    'id' => 6,
                    'x' => 75,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#00fff2ff'
                ]
                ],
            ],
            [
                'title' => 'Nivo 2',
                'order' => 2,
                'description' => 'Koristi translateY() da parkiraš auto. Pronađi pravu vrednost da se pomeriš na prazno mesto.',
                'base_color' => '#525252ff',
                'player_car' => [
                    'x' => 0, 'y' => 0, 'width' => 20, 'height' => 15, 'rotate' => 90, 'color' => '#FF0000',
                ],
                'parking_spots' => [
                [
                    'id' => 1,
                    'x' => 0,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => true,
                    'color' => '#525252ff'
                ],
                [
                    'id' => 2,
                    'x' => 8,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => false,
                    'color' => '#09ff00ff'
                ],
                [
                    'id' => 3,
                    'x' => 16,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => false,
                    'color' => '#0011ffff'
                ],
                [
                    'id' => 4,
                    'x' => 24,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => false,
                    'color' => '#e100ffff'
                ],
                [
                    'id' => 5,
                    'x' => 32,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => false,
                    'color' => '#fffb00ff'
                ],
                [
                    'id' => 6,
                    'x' => 40,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => false,
                    'color' => '#00fff2ff'
                ],
                [
                    'id' => 7,
                    'x' => 48,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => false,
                    'color' => '#9900ffff'
                ],
                [
                    'id' => 8,
                    'x' => 56,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => false,
                    'color' => '#ff5100ff'
                ]
                ],
            ],
            [
                'title' => 'Nivo 3',
                'order' => 3,
                'description' => 'Iskoristi translateX() i translateY() da pomeriš auto na slobodno parking mesto. Pronađi pravu kombinaciju i parkiraj ga savršeno!',
                'base_color' => '#525252ff',
                'player_car' => [
                    'x' => 0, 'y' => 0, 'width' => 20, 'height' => 15, 'rotate' => 0, 'color' => '#FF0000',
                ],
                'parking_spots' => [
                [
                    'id' => 1,
                    'x' => 75,
                    'y' => 0,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#ff5100ff'
                ],
                [
                    'id' => 2,
                    'x' => 75,
                    'y' => 15,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#09ff00ff'
                ],
                [
                    'id' => 3,
                    'x' => 75,
                    'y' => 30,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#0011ffff'
                ],
                [
                    'id' => 4,
                    'x' => 75,
                    'y' => 45,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#e100ffff'
                ],
                [
                    'id' => 5,
                    'x' => 75,
                    'y' => 60,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#fffb00ff'
                ],
                [
                    'id' => 6,
                    'x' => 75,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => true,
                    'color' => '#00fff2ff'
                ]
                ],
            ],
            [
                'title' => 'Nivo 4',
                'order' => 4,
                'description' => 'Auto je zarotiran pomoću rotate(). Pronađi način da ga parkiraš!',
                'base_color' => '#525252ff',
                'player_car' => [
                    'x' => 0, 'y' => 0, 'width' => 20, 'height' => 15, 'rotate' => 90, 'color' => '#FF0000', 'scale' => ['x' => 1.2, 'y' => 1.0]
                ],
                'parking_spots' => [
                [
                    'id' => 1,
                    'x' => 75,
                    'y' => 0,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#ff5100ff',
                    'scale' => ['x' => 1.2, 'y' => 1.0]
                ],
                [
                    'id' => 2,
                    'x' => 75,
                    'y' => 15,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#09ff00ff',
                    'scale' => ['x' => 1.2, 'y' => 1.0]
                ],
                [
                    'id' => 3,
                    'x' => 75,
                    'y' => 30,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#0011ffff',
                    'scale' => ['x' => 1.2, 'y' => 1.0]
                ],
                [
                    'id' => 4,
                    'x' => 75,
                    'y' => 45,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => true,
                    'color' => '#e100ffff',
                    'scale' => ['x' => 1.2, 'y' => 1.0]
                ],
                [
                    'id' => 5,
                    'x' => 75,
                    'y' => 60,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#fffb00ff',
                    'scale' => ['x' => 1.2, 'y' => 1.0]
                ],
                [
                    'id' => 6,
                    'x' => 75,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => 0,
                    'is_target' => false,
                    'color' => '#e100ffff',
                    'scale' => ['x' => 1.2, 'y' => 1.0]
                ]
                ],
            ],
            [
                'title' => 'Nivo 5',
                'order' => 5,
                'description' => 'Parking mesta su zakošena! Koristi skew() da parkiraš auto. Pronađi pravu vrednost da se pomeriš na prazno mesto.',
                'base_color' => '#525252ff',
                'player_car' => [
                    'x' => 0, 'y' => 0, 'width' => 20, 'height' => 15, 'rotate' => 90, 'color' => '#FF0000',
                ],
                'parking_spots' => [
                [
                    'id' => 1,
                    'x' => 12,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => false,
                    'color' => '#09ff00ff',
                    'skew' => ['x' => 0, 'y' => 45]
                ],
                [
                    'id' => 2,
                    'x' => 20,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => true,
                    'color' => '#09ff00ff',
                    'skew' => ['x' => 0, 'y' => 45]
                ],
                [
                    'id' => 3,
                    'x' => 28,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => false,
                    'color' => '#0011ffff',
                    'skew' => ['x' => 0, 'y' => 45]
                ],
                [
                    'id' => 4,
                    'x' => 36,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => false,
                    'color' => '#e100ffff',
                    'skew' => ['x' => 0, 'y' => 45]
                ],
                [
                    'id' => 5,
                    'x' => 44,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => false,
                    'color' => '#fffb00ff',
                    'skew' => ['x' => 0, 'y' => 45]
                ],
                [
                    'id' => 6,
                    'x' => 52,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => false,
                    'color' => '#00fff2ff',
                    'skew' => ['x' => 0, 'y' => 45]
                ],
                [
                    'id' => 7,
                    'x' => 60,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => false,
                    'color' => '#9900ffff',
                    'skew' => ['x' => 0, 'y' => 45]
                ],
                [
                    'id' => 8,
                    'x' => 68,
                    'y' => 75,
                    'width' => 20,
                    'height' => 15,
                    'rotate' => -90,
                    'is_target' => false,
                    'color' => '#ff5100ff',
                    'skew' => ['x' => 0, 'y' => 45]
                ]
                ],
            ]
            
        ];

        foreach ($levels as $level) {
            Level::updateOrCreate(['order' => $level['order']], $level);
        }
    }
}
