'use client';

import { Button } from '@/components/ui/button';
import { Pasien } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';


export const PasienColumns = (canEdit: boolean, canDelete: boolean, onDelete: (id: number) => void): ColumnDef<Pasien>[] => [
    {
        accessorKey: 'nama_pasien',
        header: 'Nama Pasien',
    },
    {
        accessorKey: 'nik',
        header: 'Nik',
    },
    {
        accessorKey: 'tanggal_lahir',
        header: 'Tanggal Lahir',
    },
    {
        accessorKey: 'jenis_kelamin',
        header: 'Jenis Kelamin',
    },
    {
        accessorKey: 'alamat',
        header: 'Alamat',
    },
    {
        accessorKey: 'nohp',
        header: 'No Hp',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const pasien = row.original;

            return (
                <div className="flex space-x-2">
                    {canEdit && (
                        <Link href={`/pasien/${pasien.id}/edit`}>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                    {canDelete && (
                        <Button variant="outline" size="sm" onClick={() => onDelete(pasien.id)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            );
        },
    },
];
