<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function KesehatanPasien(){
       return $this->hasMany(KesehatanPasien::class, 'pasien_id');
    }

    public function rekamMedis(){
        return $this->hasMany(RekamMedis::class,'pasien_id');
    }
}
