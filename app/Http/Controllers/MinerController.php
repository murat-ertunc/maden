<?php

namespace App\Http\Controllers;

use App\Models\Miner;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MinerController extends Controller
{
    /**
     * Display a listing of the miners.
     */
    public function index()
    {
        $miners = Miner::query()
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $miners,
        ]);
    }

    /**
     * Store a newly created miner in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate($this->rules());

        $miner = Miner::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Madenci başarıyla oluşturuldu.',
            'data' => $miner,
        ], 201);
    }

    /**
     * Update the specified miner in storage.
     */
    public function update(Request $request, Miner $miner)
    {
        $validated = $request->validate($this->rules($miner->id));

        $miner->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Madenci bilgileri güncellendi.',
            'data' => $miner->fresh(),
        ]);
    }

    /**
     * Remove the specified miner from storage.
     */
    public function destroy(Miner $miner)
    {
        $miner->delete();

        return response()->json([
            'success' => true,
            'message' => 'Madenci kaydı silindi.',
        ]);
    }

    /**
     * Validation rules.
     */
    protected function rules(?int $ignoreId = null): array
    {
        return [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:255'],
            'blood_type' => ['nullable', 'string', 'max:8'],
            'age' => ['nullable', 'integer', 'min:16', 'max:80'],
            'beacon_id' => [
                'nullable',
                'string',
                'max:100',
                Rule::unique('miners', 'beacon_id')->ignore($ignoreId),
            ],
        ];
    }
}
