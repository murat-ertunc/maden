<?php

namespace App\DataTransferObjects;

use Illuminate\Contracts\Support\Arrayable;

class BeaconReading implements Arrayable
{
    public function __construct(
        public readonly string $beaconId,
        public readonly string $gatewayId,
        public readonly float $rssi,
        public readonly string $timestamp,
    ) {
    }

    /**
     * Create from array.
     */
    public static function fromArray(array $data): self
    {
        return new self(
            beaconId: (string) ($data['beacon_id'] ?? ''),
            gatewayId: (string) ($data['gateway_id'] ?? ''),
            rssi: (float) ($data['rssi'] ?? 0),
            timestamp: (string) ($data['timestamp'] ?? ''),
        );
    }

    public function toArray(): array
    {
        return [
            'beacon_id' => $this->beaconId,
            'gateway_id' => $this->gatewayId,
            'rssi' => $this->rssi,
            'timestamp' => $this->timestamp,
        ];
    }
}
