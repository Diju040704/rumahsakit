<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RekamMedisCk extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function rekamMedis(){
        return $this->belongsTo(RekamMedis::class, 'rekam_medis_id');
    }

    public function verifikator(){
        return $this->belongsTo(User::class, 'verifikator_id');
    }
}
