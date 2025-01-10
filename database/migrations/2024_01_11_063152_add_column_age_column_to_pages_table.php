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
        Schema::table('xray_results', function (Blueprint $table) {
			
          $table->string('case_number');
          $table->unsignedBigInteger('age');
		  $table->unsignedBigInteger('curve_degree');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('xray_results', function (Blueprint $table) {
		  $table->string('case_number');
          $table->unsignedBigInteger('age');
		  $table->unsignedBigInteger('curve_degree');
        });
    }
};
