<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BeaconReading extends Model
{
    use HasFactory;

    protected $fillable = [
        'mine_id',
        'beacon_id',
        'gateway_id',
        'rssi',
        'reading_timestamp',
        'ip_address',
        'raw_data'
    ];

    protected $casts = [
        'reading_timestamp' => 'datetime',
        'rssi' => 'integer',
        'raw_data' => 'array'
    ];

    /**
     * Beacon reading belongs to a mine
     */
    public function mine(): BelongsTo
    {
        return $this->belongsTo(Mine::class);
    }

    /**
     * Get latest readings for a specific beacon
     */
    public static function latestForBeacon(string $beaconId, int $limit = 10)
    {
        return static::where('beacon_id', $beaconId)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Get the reading with strongest signal (closest to 0) for a specific beacon
     * Gets all readings within 3 minutes from the latest reading timestamp
     * RSSI values are negative, so we order by DESC to get the closest to 0
     */
    public static function lastReadingForBeacon(string $beaconId)
    {
        // Get the latest reading timestamp for this beacon
        $latestReading = static::where('beacon_id', $beaconId)
            ->orderBy('created_at', 'desc')
            ->first();
        
        if (!$latestReading) {
            return collect();
        }
        
        // Get all readings within 3 minutes from the latest reading (use copy to avoid mutation)
        $threeMinutesBeforeLatest = $latestReading->created_at->copy()->subMinutes(3);
        
        return static::where('beacon_id', $beaconId)
            ->where('created_at', '>=', $threeMinutesBeforeLatest)
            ->orderBy('rssi', 'desc')
            ->limit(1)
            ->get();
    }

    /**
     * Get latest readings for a specific gateway
     */
    public static function latestForGateway(string $gatewayId, int $limit = 10)
    {
        return static::where('gateway_id', $gatewayId)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Get latest readings for a mine
     */
    public static function latestForMine(?int $mineId, int $minutes = 10)
    {
        $query = static::where('created_at', '>=', now()->subMinutes($minutes))
            ->orderBy('created_at', 'desc')->whereHas('readingsMiner');

        if ($mineId) {
            $query->where('mine_id', $mineId);
        }

        return $query->get();
    }

    /**
     * Get unique beacons in last X minutes
     */
    public static function activeBeacons(int $minutes = 10)
    {
        return static::where('created_at', '>=', now()->subMinutes($minutes))
            ->distinct()
            ->pluck('beacon_id');
    }

    /**
     * Get unique gateways in last X minutes
     */
    public static function activeGateways(int $minutes = 10)
    {
        return static::where('created_at', '>=', now()->subMinutes($minutes))
            ->distinct()
            ->pluck('gateway_id');
    }

    /**
     * Clean old readings (older than X days)
     */
    public static function cleanOldReadings(int $days = 7)
    {
        return static::where('created_at', '<', now()->subDays($days))->delete();
    }

    public function readingsMiner()
    {
        return $this->belongsTo(Miner::class, 'beacon_id', 'beacon_id');
    }
}
