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
}
