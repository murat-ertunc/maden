<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MinePath extends Model
{
    protected $fillable = [
        'mine_id',
        'name',
        'description',
        'type',
        'path_points',
        'properties',
        'status',
        'width',
        'height',
        'material',
        'color',
        'order'
    ];

    protected $casts = [
        'path_points' => 'array',
        'properties' => 'array',
        'width' => 'decimal:2',
        'height' => 'decimal:2'
    ];

    public function mine(): BelongsTo
    {
        return $this->belongsTo(Mine::class);
    }

    /**
     * Yolun toplam uzunluğunu hesapla
     */
    public function getLength(): float
    {
        $points = $this->path_points;
        if (!$points || count($points) < 2) {
            return 0;
        }

        $totalLength = 0;
        for ($i = 1; $i < count($points); $i++) {
            $p1 = $points[$i - 1];
            $p2 = $points[$i];
            
            $dx = $p2['x'] - $p1['x'];
            $dy = $p2['y'] - $p1['y'];
            $dz = $p2['z'] - $p1['z'];
            
            $totalLength += sqrt($dx * $dx + $dy * $dy + $dz * $dz);
        }

        return $totalLength;
    }

    /**
     * Yol tipine göre varsayılan renk
     */
    public function getDefaultColor(): string
    {
        return match($this->type) {
            'tunnel' => '#808080',
            'road' => '#404040',
            'rail' => '#8B4513',
            'conveyor' => '#FFD700',
            default => '#808080'
        };
    }
}
