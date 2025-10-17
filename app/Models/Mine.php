<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Mine extends Model
{
    protected $fillable = [
        'name',
        'description',
        'location',
        'latitude',
        'longitude',
        'status',
        'user_id',
        'configuration'
    ];

    protected $casts = [
        'configuration' => 'array',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function models(): HasMany
    {
        return $this->hasMany(MineModel::class);
    }

    public function layers(): HasMany
    {
        return $this->hasMany(MineLayer::class);
    }

    public function paths(): HasMany
    {
        return $this->hasMany(MinePath::class);
    }

    public function beaconReadings(): HasMany
    {
        return $this->hasMany(BeaconReading::class);
    }

    /**
     * Get latest beacon readings for this mine
     */
    public function latestBeaconReadings(int $minutes = 10)
    {
        return $this->beaconReadings()
            ->where('reading_timestamp', '>=', now()->subMinutes($minutes))
            ->orderBy('reading_timestamp', 'desc')
            ->get();
    }
}
