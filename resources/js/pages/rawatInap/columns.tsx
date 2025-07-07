'use client';

import { Button } from '@/components/ui/button';
import { Pasien, RawatInap } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit } from 'lucide-react';


export const RawatInapColumns = (canEdit: boolean, canDelete: boolean, onDelete: (id: number) => void): ColumnDef<RawatInap>[] => [
    {
        accessorKey: 'kesehatan_pasien.pasien.nama_pasien',
        header: 'Nama Pasien',
    },
    {
        accessorKey: 'kesehatan_pasien.kode',
        header: 'Kode',
    },
    {
        accessorKey: 'kamar',
        header: 'Kamar',
        cell:({row}) => {
            const rawatInap = row.original;
            return rawatInap.kamar ? rawatInap.kamar : 'Data kamar belum diisi'
        }
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
        accessorKey: 'obat',
        header: 'Obat',
         cell:({row}) => {
            const rawatInap = row.original;
            return rawatInap.obat ? rawatInap.obat : 'Data obat belum diisi'
        }
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const rawatInap = row.original;

            return (
                <div className="flex space-x-2">
                    {canEdit && (
                        <Link href={`/rawatInap/${rawatInap.id}/edit`}>
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
