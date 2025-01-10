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
            $table->string('seo_meta_title');
           $table->string('seo_meta_description');
           $table->string('seo_meta_tag');
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
            $table->string('seo_meta_title');
           $table->string('seo_meta_description');
           $table->string('seo_meta_tag');
        });
    }
};
