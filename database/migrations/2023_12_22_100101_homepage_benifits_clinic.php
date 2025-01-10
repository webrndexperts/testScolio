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
          Schema::create('homepage_benifits_clinic', function (Blueprint $table) {
            $table->id();
            $table->string('homebenifit_parent_id');
            $table->string('title');
            $table->string('description');
            $table->string('photo');
            $table->string('slug');
			$table->string('lang');
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
        Schema::dropIfExists('homepage_benifits_clinic');
    }
};
