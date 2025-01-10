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
            Schema::create('mailchimp', function (Blueprint $table) {
            $table->id();
            $table->string('mailchimp_api_key');
            $table->string('mp_listname');
			$table->string('mp_id');
            $table->string('mp_total_subscribers');
            $table->string('mp_username');
            $table->string('mp_useremail');
            $table->enum('status',['active','inactive'])->default('inactive');
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
        Schema::dropIfExists('mailchimp');
    }
};
