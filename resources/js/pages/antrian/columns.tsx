'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Antrian } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Check } from 'lucide-react';

export const AntrianColumns = (canEdit: boolean, canDelete: boolean, onDelete: (id: number) => void): ColumnDef<Antrian>[] => [
    {
        accessorKey: 'kesehatan.pasien.nama_pasien',
        header: 'Nama Pasien',
    },
    {
        accessorKey: 'kesehatan.kode',
        header: 'Kode',
    },

    {
        accessorKey: 'no_antrian',
        header: 'No Antrian',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const rawatInap = row.original;
            return rawatInap.status ? <Badge>{rawatInap.status}</Badge> : 'tidak ada status';
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const antrian = row.original;

            return (
                <div className="flex space-x-2">
                    {canDelete && antrian.status === "menunggu" &&  (
                        <Button variant="outline" size="sm" onClick={() => onDelete(antrian.id)}>
                            <Check className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            );
        },
    },
];
