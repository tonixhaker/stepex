<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('uid')->unique();
            $table->string('fname');
            $table->string('lname');
            $table->string('uname');
            $table->string('chat_id');
            $table->string('status')->default('menu');
            $table->integer('current')->nullable();
            $table->integer('count')->default(0);
            $table->integer('failed')->default(0);
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
        Schema::dropIfExists('users');
    }
}
