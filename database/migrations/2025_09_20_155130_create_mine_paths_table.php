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
        Schema::create('mine_paths', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mine_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('type')->default('tunnel'); // tunnel, road, rail, conveyor
            $table->json('path_points'); // 3D koordinat noktaları
            $table->json('properties')->nullable(); // genişlik, yükseklik, malzeme vb.
            $table->string('status')->default('active'); // active, inactive, under_construction
            $table->decimal('width', 8, 2)->default(3.0); // metre cinsinden genişlik
            $table->decimal('height', 8, 2)->default(3.0); // metre cinsinden yükseklik
            $table->string('material')->default('concrete'); // concrete, steel, rock
            $table->string('color', 7)->default('#808080'); // hex renk kodu
            $table->integer('order')->default(0); // sıralama
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mine_paths');
    }
};
