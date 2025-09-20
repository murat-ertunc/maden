<?php

namespace Database\Seeders;

use App\Models\Mine;
use App\Models\MineLayer;
use App\Models\MineModel;
use App\Models\User;
use Illuminate\Database\Seeder;

class MineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Test user oluştur
        $user = User::firstOrCreate([
            'email' => 'admin@maden.com'
        ], [
            'name' => 'Admin User',
            'password' => bcrypt('password')
        ]);

        // Test madeni oluştur
        $mine = Mine::create([
            'name' => 'Örnek Açık Ocak Madeni',
            'description' => 'Bu bir test madenidir. Çeşitli katmanlar ve modeller içermektedir.',
            'location' => 'Ankara, Türkiye',
            'latitude' => 39.9334,
            'longitude' => 32.8597,
            'status' => 'active',
            'user_id' => $user->id,
            'configuration' => [
                'camera' => ['position' => [0, 15, 30], 'target' => [0, -5, 0]],
                'scene' => ['background' => '#87CEEB'],
                'lighting' => ['ambient' => 0.4, 'directional' => 0.8]
            ]
        ]);

        // Jeolojik katmanlar ekle
        $layers = [
            [
                'name' => 'Üst Toprak',
                'description' => 'Yüzey toprak katmanı',
                'mineral_type' => 'toprak',
                'depth_from' => 0,
                'depth_to' => 2,
                'color' => '#8B4513',
                'density' => 1.5,
                'grade' => 0,
                'order' => 1
            ],
            [
                'name' => 'Kömür Damarı',
                'description' => 'Ana kömür üretim katmanı',
                'mineral_type' => 'coal',
                'depth_from' => 2,
                'depth_to' => 8,
                'color' => '#2F2F2F',
                'density' => 1.3,
                'grade' => 75,
                'order' => 2
            ],
            [
                'name' => 'Kil Katmanı',
                'description' => 'Ara katman',
                'mineral_type' => 'clay',
                'depth_from' => 8,
                'depth_to' => 12,
                'color' => '#CD853F',
                'density' => 2.0,
                'grade' => 0,
                'order' => 3
            ],
            [
                'name' => 'Demir Cevheri',
                'description' => 'Zengin demir cevheri katmanı',
                'mineral_type' => 'iron',
                'depth_from' => 12,
                'depth_to' => 20,
                'color' => '#B22222',
                'density' => 5.2,
                'grade' => 65,
                'order' => 4
            ]
        ];

        foreach ($layers as $layerData) {
            $layerData['mine_id'] = $mine->id;
            MineLayer::create($layerData);
        }

        // 3D Modeller ekle
        $models = [
            [
                'name' => 'Ana Açık Ocak',
                'type' => 'excavation',
                'geometry' => [
                    'width' => 30,
                    'height' => 15,
                    'depth' => 25,
                    'steps' => 5
                ],
                'material' => [
                    'color' => 0x8B4513,
                    'roughness' => 0.8,
                    'metalness' => 0.1
                ],
                'position' => [0, -7.5, 0],
                'rotation' => [0, 0, 0],
                'scale' => [1, 1, 1],
                'order' => 1
            ],
            [
                'name' => 'Ana Tünel',
                'type' => 'tunnel',
                'geometry' => [
                    'length' => 40,
                    'radius' => 3,
                    'segments' => 16
                ],
                'material' => [
                    'color' => 0x696969,
                    'roughness' => 0.9,
                    'metalness' => 0.0
                ],
                'position' => [20, -10, 0],
                'rotation' => [0, 0, 0],
                'scale' => [1, 1, 1],
                'order' => 2
            ],
            [
                'name' => 'Havalandırma Kuyusu',
                'type' => 'shaft',
                'geometry' => [
                    'depth' => 25,
                    'radius' => 2,
                    'segments' => 12
                ],
                'material' => [
                    'color' => 0x2F4F4F,
                    'roughness' => 0.7,
                    'metalness' => 0.2
                ],
                'position' => [-15, 0, -15],
                'rotation' => [0, 0, 0],
                'scale' => [1, 1, 1],
                'order' => 3
            ],
            [
                'name' => 'Kontrol Binası',
                'type' => 'building',
                'geometry' => [
                    'width' => 12,
                    'height' => 8,
                    'depth' => 15,
                    'roofHeight' => 3
                ],
                'material' => [
                    'color' => 0xCD853F,
                    'roughness' => 0.6,
                    'metalness' => 0.0
                ],
                'position' => [25, 4, 20],
                'rotation' => [0, 0.5, 0],
                'scale' => [1, 1, 1],
                'order' => 4
            ],
            [
                'name' => 'Ekskavatör #1',
                'type' => 'equipment',
                'geometry' => [
                    'type' => 'excavator',
                    'scale' => 1.5
                ],
                'material' => [
                    'color' => 0xFFD700,
                    'roughness' => 0.3,
                    'metalness' => 0.8
                ],
                'position' => [-10, -5, 5],
                'rotation' => [0, 1.2, 0],
                'scale' => [1, 1, 1],
                'order' => 5
            ],
            [
                'name' => 'Damperli Kamyon',
                'type' => 'equipment',
                'geometry' => [
                    'type' => 'truck',
                    'scale' => 1.2
                ],
                'material' => [
                    'color' => 0xFF6347,
                    'roughness' => 0.4,
                    'metalness' => 0.6
                ],
                'position' => [10, -3, -10],
                'rotation' => [0, -0.8, 0],
                'scale' => [1, 1, 1],
                'order' => 6
            ]
        ];

        foreach ($models as $modelData) {
            $modelData['mine_id'] = $mine->id;
            MineModel::create($modelData);
        }

        $this->command->info('Örnek maden verisi başarıyla oluşturuldu!');
        $this->command->info('Email: admin@maden.com');
        $this->command->info('Şifre: password');
    }
}
