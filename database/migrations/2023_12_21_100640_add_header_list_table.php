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
             Schema::create('header_list', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
			$table->string('lang');
            $table->string('photo')->nullable();
            $table->unsignedBigInteger('header_main_title')->nullable();
            $table->unsignedBigInteger('header_submenu_title')->nullable();
            $table->enum('status',['active','inactive'])->default('active');
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
        Schema::dropIfExists('header_list');
    }
};
