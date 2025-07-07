<?php

namespace App\Http\Controllers;

use App\Models\KesehatanPasien;
use App\Models\Pasien;
use App\Models\RawatInap;
use App\Models\RawatJalan;
use Barryvdh\DomPDF\Facade\Pdf;
use Dompdf\Adapter\PDFLib;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class KesehatanPasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('kesehatanPasien/index',[
            'kesehatanPasiens' => KesehatanPasien::with('pasien')->get(),
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
        return Inertia::render('kesehatanPasien/create',[
            'pasiens' => Pasien::get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'pasien_id' => 'required|exists:pasiens,id',
            'kode' => 'required',
            'jenis_perawatan' => 'required|in:rawat_inap,rawat_jalan',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_mulai',
            'diagnosa' => 'required|string',
            'dokter' => 'required',
        ]);


        $kesehatanPasien = KesehatanPasien::create($validated);

        if ($validated['jenis_perawatan'] === 'rawat_inap') {
            RawatInap::create([
                'kesehatan_pasien_id' => $kesehatanPasien->id,
                'kamar' => null,
                'tindakan' => null,
                'obat' => null,
            ]);
        } elseif ($validated['jenis_perawatan'] === 'rawat_jalan') {
            RawatJalan::create([
                'kesehatan_pasien_id' => $kesehatanPasien->id,
                'tindakan' => null,
                'resep' => null,
            ]);
        }

        return redirect()->route('kesehatanPasien.index')->with('success', 'Kesehatan Pasien created successfully.');
    }
    /**
     * Display the specified resource.
     */
    public function show(KesehatanPasien $kesehatanPasien)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {


        return Inertia::render('kesehatanPasien/edit',[
            'kesehatanPasien' => KesehatanPasien::find($id),
            'pasiens' => Pasien::get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $kesehatanPasien = KesehatanPasien::find($id);

        $validated = $request->validate([
            'pasien_id' => 'required',
            'kode' => 'required',
            'jenis_perawatan' => 'required',
            'tanggal_mulai' => 'required',
            'tanggal_selesai' => 'required',
            'diagnosa' => 'required',
            'dokter' => 'required',
        ]);

        $kesehatanPasien->update($validated);

        return redirect()->route('kesehatanPasien.index')->with('success', 'Kesehatan Pasien updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $kesehatanPasien = KesehatanPasien::find($id);

        $kesehatanPasien->delete();
        return redirect()->route('kesehatanPasien.index')->with('success', 'Kesehatan Pasien Deleted successfully.');
    }

    public function downloadDetailKesehatanPasienPDF($id)
    {
        $laporanDetail = $this->getDetailKesehatanData($id);

        $fileName = 'laporan-rm-' . str_replace(' ', '-', strtolower($laporanDetail->pasien->nama)) . '-' . $laporanDetail->id . '.pdf';
        $filepath = 'laporan/' . $fileName;

        $pdf = Pdf::loadView('laporan.pdf_detail_kesehatan', ['laporan' => $laporanDetail]);

        Storage::disk('public')->put($filepath, $pdf->output());

        return view('laporan.auto_download', ['url' => asset('storage/' . $filepath)]);
    }

    /**
     * ===================================================================
     * [HELPER] Mengambil data detail kesehatan untuk digunakan bersama.
     * ===================================================================
     */
    private function getDetailKesehatanData($id)
    {
        return KesehatanPasien::with([
            'pasien',
            'rawat_inap',
            'rawat_jalan',
            'rekamMedis',
            'rekamMedis.rekamMedisCk',
            'rekamMedis.rekamMedisCk.verifikator'
        ])->findOrFail($id);
    }
}
