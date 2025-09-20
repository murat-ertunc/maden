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
        Schema::create('mine_layers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mine_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('mineral_type')->nullable(); // Maden türü
            $table->decimal('depth_from', 8, 2); // Katman başlangıç derinliği
            $table->decimal('depth_to', 8, 2); // Katman bitiş derinliği
            $table->string('color', 7)->default('#8B4513'); // Hex renk kodu
            $table->decimal('density', 8, 4)->nullable(); // Yoğunluk
            $table->decimal('grade', 8, 4)->nullable(); // Cevher tenörü
            $table->json('geological_properties')->nullable(); // Jeolojik özellikler
            $table->boolean('visible')->default(true);
            $table->integer('order')->default(0); // Katman sırası
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mine_layers');
    }
};
