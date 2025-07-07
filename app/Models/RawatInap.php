<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RawatInap extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function kesehatanPasien(){
        return $this->belongsTo(KesehatanPasien::class, 'kesehatan_pasien_id');
    }
}
