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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('tagline')->nullable();
            $table->string('category');
            $table->string('category_key');
            $table->unsignedBigInteger('price_npr');
            $table->string('engine')->nullable();
            $table->string('power')->nullable();
            $table->string('torque')->nullable();
            $table->string('top_speed')->nullable();
            $table->string('fuel_system')->nullable();
            $table->string('braking')->nullable();
            $table->string('warranty')->nullable();
            $table->string('mileage')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('badge')->nullable();
            $table->timestamps();
        });

        Schema::create('product_colors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->string('color_name');
            $table->string('hex_code');
            $table->string('accent_hex')->nullable();
            $table->string('image_url')->nullable();
            $table->timestamps();
        });

        Schema::create('product_specifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->string('spec_group'); // e.g., 'Engine Type', 'Trim And Rear Chassis', 'Dimensions', 'Others'
            $table->string('spec_key');
            $table->string('spec_value');
            $table->timestamps();
        });

        Schema::create('product_features', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_features');
        Schema::dropIfExists('product_specifications');
        Schema::dropIfExists('product_colors');
        Schema::dropIfExists('products');
    }
};
