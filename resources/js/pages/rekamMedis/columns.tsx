'use client';

import { Button } from '@/components/ui/button';
import { RekamMedis } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';

export const RekamMedisColumns = (canEdit: boolean, canDelete: boolean, onDelete: (id: number) => void): ColumnDef<RekamMedis>[] => [
    {
        accessorKey: 'pasien.nama_pasien',
        header: 'Nama Pasien',
    },
    {
        accessorKey: 'kesehatan_pasien.kode',
        header: 'Kode',
    },
    {
        accessorKey: 'file',
        header: 'File',
        cell: ({ row }) => {
            const rekamMedis = row.original;
            const fileUrl = rekamMedis.file;

            if (!fileUrl) return null;
            const fileExtension = fileUrl?.split('.').pop()?.toLowerCase() ?? '';

            const imageExtensions = ['jpg', 'jpeg', 'png'];
            const documentExtensions = ['pdf', 'doc', 'docx'];

            if (imageExtensions.includes(fileExtension)) {
                return <img src={fileUrl} alt="Preview" className="h-20 rounded-md border object-cover" />;
            }

            if (documentExtensions.includes(fileExtension)) {
                return (
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Lihat File
                    </a>
                );
            }

            return <span className="text-muted-foreground">Tipe file tidak dikenali</span>;
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'catatan',
        header: 'Catatan',
        cell: ({ row }) => {
            const rekamMedis = row.original;

            return rekamMedis.catatan ? rekamMedis.catatan : 'Tidak ada catatan';
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const rekamMedis = row.original;

            return (
                <div className="flex space-x-2">
                    {canEdit && (
                        <Link href={`/rekamMedis/${rekamMedis.id}/edit`}>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                    {canDelete && (
                        <Button variant="outline" size="sm" onClick={() => onDelete(rekamMedis.id)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            );
        },
    },
];
