<?php

namespace App\Http\Controllers;

use App\Models\RekamMedis;
use App\Models\RekamMedisCk;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RekamMedisCkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rekamMedisCks = RekamMedisCk::with('rekamMedis.pasien.KesehatanPasien','verifikator')->get();

        return Inertia::render('rekamMedisCk/index',[
            'rekamMedisCks' => $rekamMedisCks,
            'flash' => [
                    'success' => session('success'),
                    'error' => session('error'),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(RekamMedisCk $rekamMedisCk)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $rekamMedisCk = RekamMedisCk::find($id);

        return Inertia::render('rekamMedisCk/edit',[
            'rekamMedisCk' => $rekamMedisCk,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $rekamMedisCk = RekamMedisCk::findOrFail($id);

        $validated = $request->validate([
            'deskripsi' => 'required',
            'status' => 'required',
        ]);

        $rekamMedisCk->deskripsi = $validated['deskripsi'];
        $rekamMedisCk->status = $validated['status'];

        if (in_array($validated['status'], ['verifikasi', 'revisi', 'final'])) {
            $rekamMedisCk->verifikator_id = Auth::id();
            $rekamMedisCk->tanggal = Carbon::now()->toDateString();
        }

        $currentLevel = $rekamMedisCk->level_ck;

        if ($rekamMedisCk->level_ck === 'level_1' && $validated['status'] === 'verifikasi') {
            $rekamMedisCk->level_ck = 'level_2';
        } elseif ($rekamMedisCk->level_ck === 'level_2' && $validated['status'] === 'verifikasi') {
            $rekamMedisCk->level_ck = 'level_3';
        } elseif ($rekamMedisCk->level_ck === 'level_3' && $validated['status'] === 'final') {
            $rekamMedisCk->level_ck = 'final';
        }

        $rekamMedisCk->save();

        if ($currentLevel !== $rekamMedisCk->level_ck) {
            $rekamMedis = RekamMedis::find($rekamMedisCk->rekam_medis_id);
            if ($rekamMedis) {
                $rekamMedis->status = $rekamMedisCk->level_ck;
                $rekamMedis->save();
            }
        }

        return redirect()->route('rekamMedisCk.index')->with('success', 'Rekam Medis Checkpoint updated successfully.');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RekamMedisCk $rekamMedisCk)
    {
        //
    }
}
