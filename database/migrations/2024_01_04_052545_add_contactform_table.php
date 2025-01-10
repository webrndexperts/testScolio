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
        Schema::create('contact_form', function (Blueprint $table) {
            $table->id();
			$table->string('name');
			$table->string('email_address');
			$table->string('phone_number');
			$table->string('country');
			$table->string('contact_enquiry');
			$table->longText('description');
			$table->string('photo');
			$table->string('lang');
			$table->string('form_type');
			$table->string('slug');
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
        Schema::dropIfExists('contact_form');
    }
};
