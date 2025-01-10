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
        Schema::table('testimonials_parents', function (Blueprint $table) {
            $table->string('client_name');
            $table->string('client_email');
            $table->string('company_name');
            $table->string('company_website');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('testimonials_parents', function (Blueprint $table) {
            $table->string('client_name');
            $table->string('client_email');
            $table->string('company_name');
            $table->string('company_website');
        });
    }
};
