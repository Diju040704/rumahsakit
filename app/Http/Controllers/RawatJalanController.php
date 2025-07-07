<?php

namespace App\Http\Controllers;

use App\Models\RawatJalan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RawatJalanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rawatJalan = RawatJalan::with('kesehatanPasien.pasien')->get();
        return Inertia::render('rawatJalan/index',[
            'rawatJalans' => $rawatJalan,
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
    public function show(RawatJalan $rawatJalan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $rawatJalan = RawatJalan::find($id);

        return Inertia::render('rawatJalan/edit',[
            'rawatJalan' => $rawatJalan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $rawatJalan = RawatJalan::find($id);

        $validated = $request->validate([
            'tindakan' => 'required',
            'resep' => 'required',
        ]);

        $rawatJalan->update($validated);

        return redirect()->route('rawatJalan.index')->with('success', 'Rawat Jalan updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RawatJalan $rawatJalan)
    {
        //
    }
}
