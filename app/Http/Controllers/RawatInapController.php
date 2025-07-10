<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\RawatInap;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RawatInapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rawatInap = RawatInap::with('kesehatanPasien.pasien')->get();
        return Inertia::render('rawatInap/index',[
            'rawatInaps' => $rawatInap,
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
        //
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
    public function show(RawatInap $rawatInap)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $rawatInap = RawatInap::find($id);

        return Inertia::render('rawatInap/edit',[
            'rawatInap' => $rawatInap,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $rawatInap = RawatInap::find($id);

    $validated = $request->validate([
        'kamar' => 'required',
        'tindakan' => 'required',
        'obat' => 'required',
    ]);

    $rawatInap->update($validated);

    if ($rawatInap->obat !== null) {
        $lastAntrian = Antrian::where('no_antrian', 'like', 'PO-%')
            ->orderByDesc('id')
            ->first();

        if ($lastAntrian) {
            $lastNumber = (int)substr($lastAntrian->no_antrian, 3);
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        $formattedNumber = 'PO-' . str_pad($newNumber, 2, '0', STR_PAD_LEFT);

        Antrian::create([
            'kesehatan_id' => $rawatInap->kesehatan_pasien_id,
            'no_antrian' => $formattedNumber,
            'status' => 'menunggu',
        ]);
    }

    return redirect()->route('rawatInap.index')->with('success', 'Rawat Inap updated successfully.');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

    }
}
