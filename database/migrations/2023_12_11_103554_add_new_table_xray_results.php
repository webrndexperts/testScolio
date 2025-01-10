<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('xray_results', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('xray_parent_id');
            $table->string('title');
			$table->string('lang')->default('en');
            $table->longText('description')->nullable();
            $table->string('photo')->nullable();
            $table->string('video_url')->nullable();
            $table->enum('status',['active','inactive'])->default('active');
            $table->unsignedBigInteger('added_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('xray_results');
    }
};
