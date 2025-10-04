<?php

namespace App\Services\Positioning;

class Trilateration
{
    /**
     * Resolve a 2D position from gateway distance observations.
     *
     * @param  array<int,array{gateway_id:string,x:float,y:float,distance:float}>  $observations
     * @param  null|callable(float,float):float  $costResolver  Optional callback returning a cost for a candidate (lower is better).
     * @return array<string,float>|null Returns ['x' => float, 'y' => float] or null when insufficient data.
     */
    public function solve(array $observations, ?callable $costResolver = null): ?array
    {
        $valid = array_values(array_filter($observations, static function ($obs) {
            return isset($obs['x'], $obs['y'], $obs['distance']) && $obs['distance'] >= 0;
        }));

        $count = count($valid);

        if ($count === 0) {
            return null;
        }

        if ($count === 1) {
            return ['x' => (float) $valid[0]['x'], 'y' => (float) $valid[0]['y']];
        }

        if ($count === 2) {
            return $this->solveTwo($valid[0], $valid[1], $costResolver);
        }

        return $this->solveWeightedAverage($valid);
    }

    private function solveWeightedAverage(array $observations): ?array
    {
        $sumWeights = 0.0;
        $sumX = 0.0;
        $sumY = 0.0;

        foreach ($observations as $obs) {
            $distance = max((float) $obs['distance'], 0.01);
            $weight = 1.0 / $distance;

            $sumWeights += $weight;
            $sumX += $weight * (float) $obs['x'];
            $sumY += $weight * (float) $obs['y'];
        }

        if ($sumWeights === 0.0) {
            return null;
        }

        return [
            'x' => $sumX / $sumWeights,
            'y' => $sumY / $sumWeights,
        ];
    }

    /**
     * Solve for the intersection using two circles. Falls back to mid-point if no
     * intersection exists. If a cost resolver is provided, the intersection with
     * the lowest cost is returned.
     */
    private function solveTwo(array $a, array $b, ?callable $costResolver = null): ?array
    {
        $x0 = (float) $a['x'];
        $y0 = (float) $a['y'];
        $r0 = max((float) $a['distance'], 0.01);

        $x1 = (float) $b['x'];
        $y1 = (float) $b['y'];
        $r1 = max((float) $b['distance'], 0.01);

        $dx = $x1 - $x0;
        $dy = $y1 - $y0;
        $d = hypot($dx, $dy);

        if ($d === 0.0) {
            return ['x' => $x0, 'y' => $y0];
        }

        // No intersection cases: one circle completely outside or inside another.
        if ($d > $r0 + $r1 || $d < abs($r0 - $r1)) {
            return [
                'x' => $x0 + $dx * ($r0 / ($r0 + $r1)),
                'y' => $y0 + $dy * ($r0 / ($r0 + $r1)),
            ];
        }

        // Point 2 is the midpoint between the intersections.
        $aDist = (($r0 ** 2) - ($r1 ** 2) + ($d ** 2)) / (2 * $d);
        $h = sqrt(max(($r0 ** 2) - ($aDist ** 2), 0));

        $px = $x0 + $aDist * $dx / $d;
        $py = $y0 + $aDist * $dy / $d;

        $rx = -$dy * ($h / $d);
        $ry = $dx * ($h / $d);

        $intersection1 = ['x' => $px + $rx, 'y' => $py + $ry];
        $intersection2 = ['x' => $px - $rx, 'y' => $py - $ry];

        if ($costResolver) {
            $cost1 = $costResolver($intersection1['x'], $intersection1['y']);
            $cost2 = $costResolver($intersection2['x'], $intersection2['y']);
            return $cost1 <= $cost2 ? $intersection1 : $intersection2;
        }

        // Default: return the average of both intersections.
        return [
            'x' => ($intersection1['x'] + $intersection2['x']) / 2,
            'y' => ($intersection1['y'] + $intersection2['y']) / 2,
        ];
    }
}
