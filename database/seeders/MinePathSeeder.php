<?php

namespace Database\Seeders;

use App\Models\Mine;
use App\Models\MinePath;
use Illuminate\Database\Seeder;

class MinePathSeeder extends Seeder
{
    public function run(): void
    {
        // İlk mine'ı bulalım
        $mine = Mine::first();
        
        if (!$mine) {
            // Test mine oluşturalım
            $mine = Mine::create([
                'name' => 'Test Madeni',
                'description' => '3D yol testi için örnek maden',
                'location' => 'Test Lokasyonu',
                'status' => 'active',
                'user_id' => 1,
                'latitude' => 39.9334,
                'longitude' => 32.8597
            ]);
        }

        // Örnek yollar oluşturalım (zemin altında)
        $paths = [
            [
                'name' => 'Ana Tünel',
                'type' => 'tunnel',
                'path_points' => [
                    ['x' => 0, 'y' => -2, 'z' => 0],
                    ['x' => 10, 'y' => -2, 'z' => 0],
                    ['x' => 20, 'y' => -4, 'z' => 0],
                    ['x' => 30, 'y' => -7, 'z' => 0],
                ],
                'width' => 4.0,
                'height' => 3.5,
                'color' => '#808080',
                'material' => 'concrete',
                'status' => 'active',
                'order' => 1
            ],
            [
                'name' => 'Yan Galeri',
                'type' => 'tunnel',
                'path_points' => [
                    ['x' => 20, 'y' => -4, 'z' => 0],
                    ['x' => 20, 'y' => -4, 'z' => 10],
                    ['x' => 25, 'y' => -5, 'z' => 15],
                ],
                'width' => 3.0,
                'height' => 2.8,
                'color' => '#606060',
                'material' => 'steel',
                'status' => 'active',
                'order' => 2
            ],
            [
                'name' => 'Konveyör Yolu',
                'type' => 'conveyor',
                'path_points' => [
                    ['x' => 30, 'y' => -7, 'z' => 0],
                    ['x' => 35, 'y' => -5, 'z' => 5],
                    ['x' => 40, 'y' => -2, 'z' => 10],
                ],
                'width' => 2.0,
                'height' => 1.5,
                'color' => '#FFD700',
                'material' => 'steel',
                'status' => 'active',
                'order' => 3
            ]
        ];

        foreach ($paths as $pathData) {
            $pathData['mine_id'] = $mine->id;
            MinePath::create($pathData);
        }

        $this->command->info('Mine paths seeded successfully!');
    }
}
