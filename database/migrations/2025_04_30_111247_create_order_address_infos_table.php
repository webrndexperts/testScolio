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
        Schema::create('order_address_infos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            
            // Billing address fields
            $table->string('billing_first_name');
            $table->string('billing_last_name');
            $table->string('billing_email');
            $table->string('billing_address_1');
            $table->string('billing_address_2')->nullable();
            $table->string('billing_city');
            $table->string('billing_state');
            $table->string('billing_country'); // ISO country code (2 chars)
            $table->string('billing_postcode');
            $table->string('billing_phone');
            $table->string('company')->nullable();
            
            // Shipping address fields
            $table->string('shipping_first_name');
            $table->string('shipping_last_name');
            $table->string('shipping_address_1');
            $table->string('shipping_address_2')->nullable();
            $table->string('shipping_city');
            $table->string('shipping_state');
            $table->string('shipping_country'); // ISO country code (2 chars)
            $table->string('shipping_postcode');
            $table->string('shipping_phone');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
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
        Schema::dropIfExists('order_address_infos');
    }
};
