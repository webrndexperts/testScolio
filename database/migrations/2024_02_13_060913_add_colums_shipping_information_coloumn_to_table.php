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
            $table->string('city')->null('');
            $table->string('company')->null('');
            $table->string('shipping_first_name')->null('');
            $table->string('shipping_last_name')->null('');
            $table->string('shipping_company')->null('');
            $table->string('shipping_country')->null('');
            $table->string('shipping_address_1')->null('');
            $table->string('shipping_address_2')->null('');
            $table->string('shipping_city')->null('');
            $table->string('shipping_state')->null('');
            $table->string('shipping_postcode')->null('');
            $table->string('shipping_method_name')->null('');
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
            $table->string('city')->null('');
            $table->string('company')->null('');
            $table->string('shipping_first_name')->null('');
            $table->string('shipping_last_name')->null('');
            $table->string('shipping_company')->null('');
            $table->string('shipping_country')->null('');
            $table->string('shipping_address_1')->null('');
            $table->string('shipping_address_2')->null('');
            $table->string('shipping_city')->null('');
            $table->string('shipping_state')->null('');
            $table->string('shipping_postcode')->null('');
            $table->string('shipping_method_name')->null('');
        });
    }
};
