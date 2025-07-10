<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Antrian extends Model
{
    use HasFactory;

    protected $fillable = [
        'kesehatan_id',
        'no_antrian',
        'status',
    ];

    public function kesehatan()
    {
        return $this->belongsTo(KesehatanPasien::class, 'kesehatan_id');
    }
}
