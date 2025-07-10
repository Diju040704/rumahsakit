<?php

use App\Http\Controllers\AntrianController;
use App\Http\Controllers\KesehatanPasienController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RawatInapController;
use App\Http\Controllers\RawatJalanController;
use App\Http\Controllers\RekamMedisCkController;
use App\Http\Controllers\RekamMedisController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Models\KesehatanPasien;
use App\Models\Pasien;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $totalPasien = Pasien::count();

        $rawatInapCount = KesehatanPasien::where('jenis_perawatan', 'rawat_inap')->count();
        $rawatJalanCount = KesehatanPasien::where('jenis_perawatan', 'rawat_jalan')->count();

        return Inertia::render('dashboard', [
            'totalPasien' => $totalPasien,
            'rawatInap' => $rawatInapCount,
            'rawatJalan' => $rawatJalanCount,
        ]);
    })->name('dashboard');

    route::resource('permission', PermissionController::class);
    route::resource('role', RoleController::class);
    route::resource('user', UserController::class);
    route::resource('pasien', PasienController::class);
    route::resource('kesehatanPasien', KesehatanPasienController::class);
    route::resource('rawatInap', RawatInapController::class);
    route::resource('rawatJalan', RawatJalanController::class);
    route::resource('rekamMedis', RekamMedisController::class);
    route::resource('rekamMedisCk', RekamMedisCkController::class);
    route::resource('antrian', AntrianController::class);
    Route::get('/laporan/kesehatan-pasien/{id}/download', [KesehatanPasienController::class, 'downloadDetailKesehatanPasienPDF'])->name('laporan.detail-kesehatan.download');
    Route::post('/antrian/{antrian}/', [AntrianController::class, 'validation'])->name('validation.antrian');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
