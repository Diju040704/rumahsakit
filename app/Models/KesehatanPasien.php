<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KesehatanPasien extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function pasien(){
        return $this->belongsTo(Pasien::class, 'pasien_id');
    }

    public function rawat_inap(){
        return $this->hasOne(RawatInap::class, 'kesehatan_pasien_id');
    }

    public function rawat_jalan(){
        return $this->hasOne(RawatJalan::class, 'kesehatan_pasien_id');
    }

    public function rekamMedis(){
        return $this->hasMany(RekamMedis::class,'kesehatan_pasien_id');
    }
}
