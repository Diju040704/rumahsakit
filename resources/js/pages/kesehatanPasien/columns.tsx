'use client';

import { Button } from '@/components/ui/button';
import { KesehatanPasien } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Download, Edit, Trash } from 'lucide-react';

export const KesehatanPasienColumns = (canDownload: boolean, canEdit: boolean, canDelete: boolean, onDelete: (id: number) => void): ColumnDef<KesehatanPasien>[] => [
    {
        accessorKey: 'pasien.nama_pasien',
        header: 'Nama Pasien',
    },
    {
        accessorKey: 'kode',
        header: 'Kode',
    },
    {
        accessorKey: 'jenis_perawatan',
        header: 'Jenis Perawatan',
        cell: ({ row }) => {
            const kesehatanPasien = row.original;

            if (kesehatanPasien.jenis_perawatan === 'rawat_jalan') {
                return <p>Rawat Jalan</p>;
            } else {
                return <p>Rawat Inap</p>;
            }
        },
    },
    {
        accessorKey: 'tanggal_mulai',
        header: 'Tanggal Mulai',
    },
    {
        accessorKey: 'tanggal_selesai',
        header: 'Tanggal Selesai',
    },
    {
        accessorKey: 'diagnosa',
        header: 'Diagnosa',
    },
    {
        accessorKey: 'dokter',
        header: 'Dokter',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const kesehatanPasien = row.original;

            return (
                <div className="flex space-x-2">
                    {canEdit && (
                        <Link href={`/kesehatanPasien/${kesehatanPasien.id}/edit`}>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                    {canDelete && (
                        <Button variant="outline" size="sm" onClick={() => onDelete(kesehatanPasien.id)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    )}
                    {canDownload && (
                        <Link href={`/laporan/kesehatan-pasien/${kesehatanPasien.id}/download`}>
                            <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                </div>
            );
        },
    },
];
