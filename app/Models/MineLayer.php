<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MineLayer extends Model
{
    protected $fillable = [
        'mine_id',
        'name',
        'description',
        'mineral_type',
        'depth_from',
        'depth_to',
        'color',
        'density',
        'grade',
        'geological_properties',
        'visible',
        'order'
    ];

    protected $casts = [
        'geological_properties' => 'array',
        'visible' => 'boolean',
        'depth_from' => 'decimal:2',
        'depth_to' => 'decimal:2',
        'density' => 'decimal:4',
        'grade' => 'decimal:4'
    ];

    public function mine(): BelongsTo
    {
        return $this->belongsTo(Mine::class);
    }
}
