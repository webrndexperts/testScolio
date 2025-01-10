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
        Schema::table('orders', function (Blueprint $table) {
            $table->string('gst_tax')->null('');
            $table->string('discount_couponcode')->null('');
			$table->string('stripe_total_price')->null('');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
           $table->string('gst_tax')->null('');
           $table->string('discount_couponcode')->null('');
		   $table->string('stripe_total_price')->null('');
        });
    }
};
