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
        Schema::table('homepage_benifits_clinic', function (Blueprint $table) {
            $table->json('extra_video_urls')->nullable()->after('video_url');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('homepage_benifits_clinic', function (Blueprint $table) {
            $table->dropColumn('extra_video_urls');
        });
    }
};
