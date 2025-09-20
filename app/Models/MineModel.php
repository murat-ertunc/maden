<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MineModel extends Model
{
    protected $fillable = [
        'mine_id',
        'name',
        'type',
        'geometry',
        'material',
        'position',
        'rotation',
        'scale',
        'properties',
        'visible',
        'order'
    ];

    protected $casts = [
        'geometry' => 'array',
        'material' => 'array',
        'position' => 'array',
        'rotation' => 'array',
        'scale' => 'array',
        'properties' => 'array',
        'visible' => 'boolean'
    ];

    public function mine(): BelongsTo
    {
        return $this->belongsTo(Mine::class);
    }
}
