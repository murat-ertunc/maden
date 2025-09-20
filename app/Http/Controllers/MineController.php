<?php

namespace App\Http\Controllers;

use App\Models\Mine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mines = Mine::with(['layers', 'models'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return view('mines.index', compact('mines'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('mines.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'status' => 'required|in:active,inactive,planning,completed'
        ]);

        $validated['user_id'] = Auth::id();
        $validated['configuration'] = [
            'camera' => ['position' => [0, 10, 20], 'target' => [0, 0, 0]],
            'scene' => ['background' => '#87CEEB'],
            'lighting' => ['ambient' => 0.4, 'directional' => 0.8]
        ];

        $mine = Mine::create($validated);

        return redirect()->route('mines.show', $mine)
            ->with('success', 'Maden başarıyla oluşturuldu.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Mine $mine)
    {
        $this->authorize('view', $mine);
        
        $mine->load(['layers' => function($query) {
            $query->orderBy('order')->orderBy('depth_from');
        }, 'models' => function($query) {
            $query->orderBy('order');
        }]);

        return view('mines.show', compact('mine'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mine $mine)
    {
        $this->authorize('update', $mine);
        return view('mines.edit', compact('mine'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mine $mine)
    {
        $this->authorize('update', $mine);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'status' => 'required|in:active,inactive,planning,completed'
        ]);

        $mine->update($validated);

        return redirect()->route('mines.show', $mine)
            ->with('success', 'Maden bilgileri güncellendi.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mine $mine)
    {
        $this->authorize('delete', $mine);
        
        $mine->delete();

        return redirect()->route('mines.index')
            ->with('success', 'Maden silindi.');
    }
}
