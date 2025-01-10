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
        Schema::table('shippings', function (Blueprint $table) {
            $table->string('stripe_secret_key');
            $table->string('stripe_publish_key');
            $table->string('easyship_access_token');
            $table->string('easyship_class_slug');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('shippings', function (Blueprint $table) {
            $table->string('stripe_secret_key');
            $table->string('stripe_publish_key');
            $table->string('easyship_access_token');
            $table->string('easyship_class_slug');
        });
    }
};
