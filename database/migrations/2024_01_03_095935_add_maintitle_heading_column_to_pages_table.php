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
        Schema::table('header_submenu_heading', function (Blueprint $table) {
            $table->unsignedBigInteger('header_main_heading_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('header_submenu_heading', function (Blueprint $table) {
            $table->unsignedBigInteger('header_main_heading_id');
        });
    }
};
