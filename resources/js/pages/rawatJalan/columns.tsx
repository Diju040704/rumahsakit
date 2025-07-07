'use client';

import { Button } from '@/components/ui/button';
import { Pasien, RawatInap, RawatJalan } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit } from 'lucide-react';


export const RawatJalanColumns = (canEdit: boolean, canDelete: boolean, onDelete: (id: number) => void): ColumnDef<RawatJalan>[] => [
    {
        accessorKey: 'kesehatan_pasien.pasien.nama_pasien',
        header: 'Nama Pasien',
    },
    {
        accessorKey: 'kesehatan_pasien.kode',
        header: 'Kode',
    },
    {
        accessorKey: 'tindakan',
        header: 'Tindakan',
         cell:({row}) => {
            const rawatInap = row.original;
            return rawatInap.tindakan ? rawatInap.tindakan : 'Data tindakan belum diisi'
        }
    },
    {
        accessorKey: 'resep',
        header: 'Resep',
         cell:({row}) => {
            const rawatInap = row.original;
            return rawatInap.resep ? rawatInap.resep : 'Data resep belum diisi'
        }
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const rawatJalan = row.original;

            return (
                <div className="flex space-x-2">
                    {canEdit && (
                        <Link href={`/rawatJalan/${rawatJalan.id}/edit`}>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                    {/* {canDelete && (
                        <Button variant="outline" size="sm" onClick={() => onDelete(pasien.id)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    )} */}
                </div>
            );
        },
    },
];
