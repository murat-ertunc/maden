<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mine;
use App\Models\MinePath;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class MinePathController extends Controller
{
    /**
     * Mine'a ait tüm yolları listele
     */
    public function index(Mine $mine): JsonResponse
    {
        $paths = $mine->paths()->orderBy('order')->orderBy('created_at')->get();
        
        return response()->json([
            'success' => true,
            'data' => $paths
        ]);
    }

    /**
     * Yeni yol oluştur
     */
    public function store(Request $request, Mine $mine): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'type' => 'required|in:tunnel,road,rail,conveyor',
            'path_points' => 'required|array|min:2',
            'path_points.*.x' => 'required|numeric',
            'path_points.*.y' => 'required|numeric',
            'path_points.*.z' => 'required|numeric',
            'width' => 'nullable|numeric|min:0.1|max:50',
            'height' => 'nullable|numeric|min:0.1|max:50',
            'color' => 'nullable|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'description' => 'nullable|string|max:1000',
            'material' => 'nullable|string|max:100',
            'status' => 'nullable|in:active,inactive,under_construction'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();
        $validated['mine_id'] = $mine->id;

        // Set defaults
        $validated['width'] = $validated['width'] ?? 3.0;
        $validated['height'] = $validated['height'] ?? 3.0;
        $validated['color'] = $validated['color'] ?? '#808080';
        $validated['status'] = $validated['status'] ?? 'active';
        $validated['material'] = $validated['material'] ?? 'concrete';

        $path = MinePath::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Path created successfully',
            'data' => $path
        ], 201);
    }

    /**
     * Belirli bir yolu göster
     */
    public function show(Mine $mine, MinePath $path): JsonResponse
    {
        // Yolun bu mine'a ait olduğunu kontrol et
        if ($path->mine_id !== $mine->id) {
            return response()->json([
                'success' => false,
                'message' => 'Path not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $path
        ]);
    }

    /**
     * Yolu güncelle
     */
    public function update(Request $request, Mine $mine, MinePath $path): JsonResponse
    {
        // Yolun bu mine'a ait olduğunu kontrol et
        if ($path->mine_id !== $mine->id) {
            return response()->json([
                'success' => false,
                'message' => 'Path not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'type' => 'sometimes|in:tunnel,road,rail,conveyor',
            'path_points' => 'sometimes|array|min:2',
            'path_points.*.x' => 'required_with:path_points|numeric',
            'path_points.*.y' => 'required_with:path_points|numeric',
            'path_points.*.z' => 'required_with:path_points|numeric',
            'width' => 'sometimes|numeric|min:0.1|max:50',
            'height' => 'sometimes|numeric|min:0.1|max:50',
            'color' => 'sometimes|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'description' => 'sometimes|nullable|string|max:1000',
            'material' => 'sometimes|string|max:100',
            'status' => 'sometimes|in:active,inactive,under_construction',
            'order' => 'sometimes|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $path->update($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Path updated successfully',
            'data' => $path
        ]);
    }

    /**
     * Yolu sil
     */
    public function destroy(Mine $mine, MinePath $path): JsonResponse
    {
        // Yolun bu mine'a ait olduğunu kontrol et
        if ($path->mine_id !== $mine->id) {
            return response()->json([
                'success' => false,
                'message' => 'Path not found'
            ], 404);
        }

        $path->delete();

        return response()->json([
            'success' => true,
            'message' => 'Path deleted successfully'
        ]);
    }

    /**
     * Mine'ın 3D sahne verilerini getir (yollar dahil)
     */
    public function getSceneData(Mine $mine): JsonResponse
    {
        $sceneData = [
            'mine' => $mine,
            'layers' => $mine->layers,
            'models' => $mine->models,
            'paths' => $mine->paths()->where('status', 'active')->orderBy('order')->get()
        ];

        return response()->json($sceneData);
    }
}
