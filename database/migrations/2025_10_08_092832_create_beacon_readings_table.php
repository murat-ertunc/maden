<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('beacon_readings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mine_id')->nullable()->constrained('mines')->onDelete('cascade');
            $table->string('beacon_id', 50)->index();
            $table->string('gateway_id', 50)->index();
            $table->integer('rssi')->comment('Signal strength in dBm');
            $table->timestamp('reading_timestamp')->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('raw_data')->nullable()->comment('Original JSON data');
            $table->timestamps();
            
            // Index for efficient queries
            $table->index(['beacon_id', 'reading_timestamp']);
            $table->index(['gateway_id', 'reading_timestamp']);
            $table->index(['mine_id', 'reading_timestamp']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beacon_readings');
    }
};
