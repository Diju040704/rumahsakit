<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RekamMedis extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function pasien(){
        return $this->belongsTo(Pasien::class, 'pasien_id');
    }

     public function kesehatanPasien(){
        return $this->belongsTo(KesehatanPasien::class, 'kesehatan_pasien_id');
    }

    public function rekamMedisCk(){
        return $this->hasMany(RekamMedisCk::class, 'rekam_medis_id');
    }
}
