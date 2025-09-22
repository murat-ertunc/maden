<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mine;
use App\Models\MineModel;
use App\Models\MineLayer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MineApiController extends Controller
{
    /**
     * 3D sahne verisini döndür
     */
    public function getSceneData(Mine $mine)
    {
        $this->authorize('view', $mine);

        $sceneData = [
            'mine' => $mine,
            'layers' => $mine->layers()->orderBy('order')->orderBy('depth_from')->get(),
            'models' => $mine->models()->where('visible', true)->orderBy('order')->get(),
            'configuration' => $mine->configuration ?? [
                'camera' => ['position' => [0, 10, 20], 'target' => [0, 0, 0]],
                'scene' => ['background' => '#87CEEB'],
                'lighting' => ['ambient' => 0.4, 'directional' => 0.8]
            ]
        ];

        return response()->json($sceneData);
    }

    /**
     * Model ekle
     */
    public function addModel(Request $request, Mine $mine)
    {
        $this->authorize('update', $mine);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:excavation,tunnel,shaft,building,equipment',
            'geometry' => 'required|array',
            'material' => 'required|array',
            'position' => 'required|array|size:3',
            'rotation' => 'array|size:3',
            'scale' => 'array|size:3',
            'properties' => 'nullable|array'
        ]);

        $validated['mine_id'] = $mine->id;
        $validated['rotation'] = $validated['rotation'] ?? [0, 0, 0];
        $validated['scale'] = $validated['scale'] ?? [1, 1, 1];
        $validated['order'] = MineModel::where('mine_id', $mine->id)->max('order') + 1;

        $model = MineModel::create($validated);

        return response()->json($model, 201);
    }

    /**
     * Model güncelle
     */
    public function updateModel(Request $request, Mine $mine, MineModel $model)
    {
        $this->authorize('update', $mine);

        $validated = $request->validate([
            'name' => 'string|max:255',
            'position' => 'array|size:3',
            'rotation' => 'array|size:3',
            'scale' => 'array|size:3',
            'material' => 'array',
            'geometry' => 'array', // yeni: geometri güncelleme
            'properties' => 'nullable|array',
            'visible' => 'boolean'
        ]);

        // Geometry içinde tünel parametre güncellemesi varsa validate detaylı
        if (isset($validated['geometry'])) {
            $g = $validated['geometry'];
            // Temel zorunlu alanlar
            if (!isset($g['type'])) {
                return response()->json(['message' => 'geometry.type gerekli'], 422);
            }
            if ($g['type'] === 'tunnel') {
                $errors = [];
                $w = $g['width'] ?? null; $h = $g['height'] ?? null; $l = $g['length'] ?? null;
                if (!is_numeric($w) || $w <= 0) $errors['geometry.width'] = 'Geçersiz width';
                if (!is_numeric($h) || $h <= 0) $errors['geometry.height'] = 'Geçersiz height';
                if (!is_numeric($l) || $l <= 0) $errors['geometry.length'] = 'Geçersiz length';
                if ($errors) return response()->json(['errors' => $errors], 422);
                // orientation mapping normalize
                if (isset($g['orientation'])) {
                    $o = $g['orientation'];
                    if (in_array($o, ['yatay','horizontal'])) $g['orientation'] = 'horizontal';
                    elseif (in_array($o, ['dikey','vertical'])) $g['orientation'] = 'vertical';
                }
                $validated['geometry'] = array_merge($model->geometry ?? [], $g);
            } else {
                // Diğer tipler için şimdilik merge et
                $validated['geometry'] = array_merge($model->geometry ?? [], $g);
            }
        }

        if (isset($validated['material'])) {
            $m = $validated['material'];
            // Renk numerik veya hex olabilir, doğrudan merge edeceğiz
            if (isset($m['opacity'])) {
                $op = $m['opacity'];
                if (!is_numeric($op) || $op < 0 || $op > 1) {
                    return response()->json(['errors' => ['material.opacity' => '0-1 arası olmalı']], 422);
                }
            }
            $validated['material'] = array_merge($model->material ?? [], $m);
        }

        $model->update($validated);

        return response()->json($model->fresh());
    }

    /**
     * Model sil
     */
    public function deleteModel(Mine $mine, MineModel $model)
    {
        $this->authorize('update', $mine);
        
        $model->delete();

        return response()->json(['message' => 'Model silindi']);
    }

    /**
     * Katman ekle
     */
    public function addLayer(Request $request, Mine $mine)
    {
        $this->authorize('update', $mine);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'mineral_type' => 'nullable|string|max:255',
            'depth_from' => 'required|numeric|min:0',
            'depth_to' => 'required|numeric|gt:depth_from',
            'color' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'density' => 'nullable|numeric|min:0',
            'grade' => 'nullable|numeric|min:0',
            'geological_properties' => 'nullable|array'
        ]);

        $validated['mine_id'] = $mine->id;
        $validated['order'] = MineLayer::where('mine_id', $mine->id)->max('order') + 1;

        $layer = MineLayer::create($validated);

        return response()->json($layer, 201);
    }

    /**
     * Katman güncelle
     */
    public function updateLayer(Request $request, Mine $mine, MineLayer $layer)
    {
        $this->authorize('update', $mine);

        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'mineral_type' => 'nullable|string|max:255',
            'depth_from' => 'numeric|min:0',
            'depth_to' => 'numeric|gt:depth_from',
            'color' => 'string|regex:/^#[0-9A-Fa-f]{6}$/',
            'density' => 'nullable|numeric|min:0',
            'grade' => 'nullable|numeric|min:0',
            'geological_properties' => 'nullable|array',
            'visible' => 'boolean'
        ]);

        $layer->update($validated);

        return response()->json($layer);
    }

    /**
     * Katman sil
     */
    public function deleteLayer(Mine $mine, MineLayer $layer)
    {
        $this->authorize('update', $mine);
        
        $layer->delete();

        return response()->json(['message' => 'Katman silindi']);
    }

    /**
     * Sahne konfigürasyonunu güncelle
     */
    public function updateConfiguration(Request $request, Mine $mine)
    {
        $this->authorize('update', $mine);

        $validated = $request->validate([
            'camera' => 'array',
            'camera.position' => 'array|size:3',
            'camera.target' => 'array|size:3',
            'scene' => 'array',
            'lighting' => 'array'
        ]);

        $configuration = array_merge($mine->configuration ?? [], $validated);
        $mine->update(['configuration' => $configuration]);

        return response()->json($configuration);
    }
}
