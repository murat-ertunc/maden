<?php

namespace App\Services\Positioning;

use Illuminate\Support\Arr;

class DistanceMapper
{
    /**
     * @var array<int,float>
     */
    private array $map;

    public function __construct(?array $map = null)
    {
        $map ??= config('mining.rssi_map', []);

        if (!is_array($map)) {
            $map = [];
        }

        ksort($map, SORT_NUMERIC);

        $this->map = array_map(static fn ($value) => (float) $value, $map);
    }

    /**
     * Returns the underlying RSSI map (sorted ascending by RSSI).
     *
     * @return array<int,float>
     */
    public function all(): array
    {
        return $this->map;
    }

    /**
     * Resolve a distance for the provided RSSI value using linear interpolation
     * between the nearest configured calibration points.
     */
    public function distanceFor(float $rssi): ?float
    {
        if (empty($this->map)) {
            return null;
        }

        $keys = array_keys($this->map);

    // Exact match (rounded to nearest integer)
        $rounded = $this->nearestStep($rssi);
        if (array_key_exists($rounded, $this->map)) {
            return $this->map[$rounded];
        }

        $minKey = Arr::first($keys);
        $maxKey = Arr::last($keys);

        if ($rssi <= $minKey) {
            return $this->map[$minKey];
        }

        if ($rssi >= $maxKey) {
            return $this->map[$maxKey];
        }

        $lowerKey = $minKey;
        $upperKey = $maxKey;

        foreach ($keys as $key) {
            if ($key == $rssi) {
                return $this->map[$key];
            }

            if ($key < $rssi) {
                $lowerKey = $key;
                continue;
            }

            $upperKey = $key;
            break;
        }

        if ($upperKey === $lowerKey) {
            return $this->map[$upperKey];
        }

        $lowerValue = $this->map[$lowerKey];
        $upperValue = $this->map[$upperKey];

        $ratio = ($rssi - $lowerKey) / ($upperKey - $lowerKey);

        return $lowerValue + $ratio * ($upperValue - $lowerValue);
    }

    private function nearestStep(float $rssi): int
    {
        return (int) round($rssi);
    }
}
