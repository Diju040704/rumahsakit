<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use App\Models\RekamMedis;
use App\Models\RekamMedisCk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RekamMedisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('rekamMedis/index',[
            'rekamMedises' => RekamMedis::with('pasien','kesehatanPasien')->get(),
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
        $pasien = Pasien::with('KesehatanPasien')->get();

        return Inertia::render('rekamMedis/create',[
            'pasiens' => $pasien,
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'pasien_id' => 'required',
            'kesehatan_pasien_id' => 'required',
            'file' => 'required',
            'catatan' => 'nullable',
        ]);

        $validated['status'] = 'level_1';

         if ($request->hasFile('file')) {
            $path = $request->file('file')->store('rekam_medis', 'public');
            $validated['file'] = Storage::url($path);
        }

        $rekamMedis = RekamMedis::create($validated);

        if($rekamMedis){
            RekamMedisCk::create([
                'rekam_medis_id' => $rekamMedis->id,
                'level_ck' => $rekamMedis->status,
                'status' => 'belum',
                'verifikator_id' => null,
                'deskripsi' => null,
                'tanggal' => null,
            ]);
        }

        return redirect()->route('rekamMedis.index')->with('success', 'Rekam Medis created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(RekamMedis $rekamMedis)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $pasiens = Pasien::with('KesehatanPasien')->get();
        $rekamMedis = RekamMedis::with('kesehatanPasien' , 'pasien')->find($id);

        return Inertia::render('rekamMedis/edit',[
            'pasiens' => $pasiens,
            'rekamMedis' => $rekamMedis
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $rekamMedis = RekamMedis::with('kesehatanPasien', 'pasien')->findOrFail($id);

        $validated = $request->validate([
            'pasien_id' => 'required|exists:pasiens,id',
            'kesehatan_pasien_id' => 'required|exists:kesehatan_pasiens,id',
            'file' => 'nullable|file|mimes:pdf,jpg,jpeg,png',
            'catatan' => 'nullable|string',
        ]);

        if ($request->hasFile('file')) {
            if ($rekamMedis->file) {
                $oldPath = str_replace('/storage/', '', $rekamMedis->file);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('file')->store('rekam_medis', 'public');
            $validated['file'] = Storage::url($path);
        } else {
            $validated['file'] = $rekamMedis->file;
        }

        $rekamMedis->update($validated);

        return redirect()->route('rekamMedis.index')->with('success', 'Rekam Medis updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $rekamMedis = RekamMedis::find($id);
        $rekamMedis->delete();

        return redirect()->route('rekamMedis.index')->with('success', 'Rekam Medis Delete successfully.');
    }
}
