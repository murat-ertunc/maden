<?php

return [
    /*
    |--------------------------------------------------------------------------
    | RSSI to Distance Mapping
    |--------------------------------------------------------------------------
    | Values are in metres. Keys correspond to RSSI integer values (dBm).
    | These are loaded from environment variables (e.g. RSSI_60 => -60 dBm).
    */
    'rssi_map' => (function () {
        $map = [];
        for ($step = 0; $step <= 150; $step += 5) {
            $envKey = 'RSSI_' . $step;
            $value = env($envKey);
            if (is_null($value)) {
                continue;
            }

            $rssi = $step === 0 ? 0 : -$step;
            $map[$rssi] = (float) $value;
        }

        ksort($map, SORT_NUMERIC);

        return $map;
    })(),

    /*
    |--------------------------------------------------------------------------
    | Gateway Reference Coordinates (metres)
    |--------------------------------------------------------------------------
    | Simple static configuration for now. Replace with DB-backed model later
    | if gateways are stored dynamically.
    */
    'gateways' => [
        'GW01' => ['x' => 12.0, 'y' => 4.0],
        'GW02' => ['x' => 28.5, 'y' => 7.5],
        'GW03' => ['x' => 45.0, 'y' => 3.0],
        'GW04' => ['x' => 63.5, 'y' => 9.5],
    ],

    /*
    |--------------------------------------------------------------------------
    | Poll interval for beacon updates (milliseconds)
    |--------------------------------------------------------------------------
    */
    'poll_interval_ms' => env('BEACON_POLL_INTERVAL_MS', 10000),
];
