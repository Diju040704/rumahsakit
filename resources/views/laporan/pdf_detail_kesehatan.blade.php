<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Detail Kesehatan Pasien - {{ $laporan->pasien->nama_pasien }}</title>
    <style>
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            font-size: 12px;
            color: #333;
        }
        .container { padding: 5px; }
        .header {
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 25px;
            width: 100%;
        }
        .header .logo {
            float: left;
            width: 80px;
            height: 80px;
        }
        .header .hospital-info {
            float: left;
            margin-left: 20px;
        }
        .header .report-title {
            float: right;
            text-align: right;
        }
        .header h1, .header h2 { margin: 0; }
        .header p { margin: 0; font-size: 12px; }
        .section { margin-bottom: 20px; }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
            margin-bottom: 10px;
        }
        .data-table, .history-table {
            width: 100%;
            border-collapse: collapse;
        }
        .data-table td {
            padding: 6px 5px;
            vertical-align: top;
        }
        .data-table td:first-child { font-weight: bold; width: 25%; }
        .data-table td:nth-child(2) { width: 1%; }
        .history-table th, .history-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
            font-size: 11px;
        }
        .history-table thead { background-color: #f2f2f2; }
        .status-revisi { background-color: #fff8e1; }
        .footer {
            position: fixed;
            bottom: 0px;
            left: 0px;
            right: 0px;
            height: 50px;
            text-align: right;
            font-size: 10px;
            color: #777;
            border-top: 1px solid #ccc;
            padding-top: 5px;
        }
        .clearfix::after {
            content: "";
            clear: both;
            display: table;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header clearfix">
        <div class="logo"></div>
        <div class="hospital-info">
            <h1>RS Harapan Sehat</h1>
            <p>Jl. Kemerdekaan No. 123, Palembang, Indonesia</p>
            <p>Telepon: (0711) 123-456</p>
        </div>
        <div class="report-title">
            <h2>DETAIL REKAM MEDIS</h2>
        </div>
    </div>

    <div class="section">
        <div class="section-title">I. DATA PASIEN</div>
        <table class="data-table">
            <tr><td>Nama Pasien</td><td>:</td><td>{{ $laporan->pasien->nama_pasien }}</td></tr>
            <tr><td>No. Rekam Medis</td><td>:</td><td>KP-{{ str_pad($laporan->id, 6, '0', STR_PAD_LEFT) }}</td></tr>
            <tr><td>NIK</td><td>:</td><td>{{ $laporan->pasien->nik }}</td></tr>
            <tr>
                <td>Tanggal Lahir / Usia</td><td>:</td>
                <td>{{ \Carbon\Carbon::parse($laporan->pasien->tanggal_lahir)->isoFormat('D MMMM YYYY') }} ({{ \Carbon\Carbon::parse($laporan->pasien->tanggal_lahir)->age }} tahun)</td>
            </tr>
            <tr><td>Jenis Kelamin</td><td>:</td><td>{{ $laporan->pasien->jenis_kelamin == 'L' ? 'Laki-laki' : 'Perempuan' }}</td></tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">II. DETAIL EPISODE PERAWATAN</div>
        <table class="data-table">
            <tr><td>Tanggal Masuk</td><td>:</td><td>{{ \Carbon\Carbon::parse($laporan->tanggal_mulai)->isoFormat('D MMMM YYYY') }}</td></tr>
            <tr><td>Tanggal Keluar</td><td>:</td><td>{{ $laporan->tanggal_selesai ? \Carbon\Carbon::parse($laporan->tanggal_selesai)->isoFormat('D MMMM YYYY') : '-' }}</td></tr>
            <tr><td>Jenis Perawatan</td><td>:</td><td>{{ $laporan->jenis_perawatan == 'rawat_inap' ? 'Rawat Inap' : 'Rawat Jalan' }}</td></tr>
            <tr><td>Dokter Penanggung Jawab</td><td>:</td><td>{{ $laporan->dokter }}</td></tr>
            <tr><td>Diagnosa Utama</td><td>:</td><td>{{ $laporan->diagnosa }}</td></tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">III. RINCIAN PERAWATAN</div>
        @if($laporan->jenis_perawatan === 'rawat_inap' && $laporan->rawat_inap)
            <table class="data-table">
                <tr><td>Kamar Perawatan</td><td>:</td><td>{{ $laporan->rawat_inap->kamar }}</td></tr>
                <tr><td>Tindakan Medis</td><td>:</td><td>{{ $laporan->rawat_inap->tindakan }}</td></tr>
                <tr><td>Obat yang Diberikan</td><td>:</td><td>{{ $laporan->rawat_inap->obat }}</td></tr>
            </table>
        @elseif($laporan->jenis_perawatan === 'rawat_jalan' && $laporan->rawat_jalan)
            <table class="data-table">
                <tr><td>Tindakan</td><td>:</td><td>{{ $laporan->rawat_jalan->tindakan }}</td></tr>
                <tr><td>Resep Obat</td><td>:</td><td>{{ $laporan->rawat_jalan->resep }}</td></tr>
            </table>
        @else
            <p>Tidak ada rincian perawatan yang tercatat.</p>
        @endif
    </div>

    <div class="section">
        <div class="section-title">IV. RIWAYAT VERIFIKASI DOKUMEN (CK)</div>
        @forelse($laporan->rekamMedis as $rekam)
            <div style="margin-bottom: 15px;">
                <p>(Status: <strong>{{ ucfirst($rekam->status) }}</strong>)</p>
                <table class="history-table">
                    <thead>
                        <tr>
                            <th>Level</th>
                            <th>Tanggal</th>
                            <th>Verifikator</th>
                            <th>Status</th>
                            <th>Catatan</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($rekam->rekamMedisCk as $ck)
                            <tr class="{{ $ck->status === 'revisi' ? 'status-revisi' : '' }}">
                                <td>{{ $ck->level_ck }}</td>
                                <td>{{ \Carbon\Carbon::parse($ck->tanggal)->isoFormat('DD/MM/YYYY') }}</td>
                                <td>{{ $ck->verifikator?->name ?? 'N/A' }}</td>
                                <td>{{ ucfirst($ck->status) }}</td>
                                <td>{{ $ck->deskripsi }}</td>
                            </tr>
                        @empty
                            <tr><td colspan="5" style="text-align: center;">Belum ada riwayat verifikasi.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        @empty
            <p>Tidak ada proses verifikasi dokumen yang terkait dengan episode perawatan ini.</p>
        @endforelse
    </div>
</div>
<div class="footer">
    <p>Dicetak oleh Sistem pada {{ \Carbon\Carbon::now('Asia/Jakarta')->isoFormat('D MMMM YYYY, HH:mm') }} WIB</p>
</div>
</body>
</html>
