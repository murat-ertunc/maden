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
        Schema::create('mine_models', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mine_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('type'); // 'excavation', 'tunnel', 'shaft', 'building', 'equipment'
            $table->json('geometry'); // Three.js geometri verileri
            $table->json('material'); // Materyal özellikleri (renk, texture vb.)
            $table->json('position'); // x, y, z koordinatları
            $table->json('rotation'); // x, y, z rotasyonları
            $table->json('scale'); // x, y, z ölçekleri
            $table->json('properties')->nullable(); // Özel özellikler
            $table->boolean('visible')->default(true);
            $table->integer('order')->default(0); // Render sırası
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mine_models');
    }
};
