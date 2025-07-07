'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RekamMedisCk } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit } from 'lucide-react';

export const RekamMedisCkColumns = (
    canEdit: boolean,
    canDelete: boolean,
    currentUser: any,
    onDelete: (id: number) => void,
): ColumnDef<RekamMedisCk>[] => [
    {
        accessorKey: 'rekam_medis.pasien.nama_pasien',
        header: 'Rekam Medis',
    },
    {
        accessorKey: 'level_ck',
        header: 'Level Ck',
    },
    {
        accessorKey: 'verifikator.name',
        header: 'Verifikator',
        cell: ({ row }) => {
            const rekamMedisCk = row.original;

            return rekamMedisCk.verifikator?.name ?? 'Rekam medis belum diverifikasi';
        },
    },
    {
        accessorKey: 'deskripsi',
        header: 'Deskripsi',
        cell: ({ row }) => {
            const rekamMedisCk = row.original;

            return rekamMedisCk.deskripsi ?? 'Deskripsi belum ada';
        },
    },
    {
        accessorKey: 'tanggal',
        header: 'Tanggal Verifikasi',
        cell: ({ row }) => {
            const rekamMedisCk = row.original;

            return rekamMedisCk.tanggal ? rekamMedisCk.tanggal : 'Rekam medis belum diverifikasi';
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const rekamMedisCk = row.original;

            return rekamMedisCk.status ? <Badge>{rekamMedisCk.status}</Badge> : 'Belum ada status';
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const rekamMedisCk = row.original;

            const level = rekamMedisCk.level_ck;
            const status = rekamMedisCk.status;
            const role = currentUser;

            const canShowEditButton =
                status !== 'final' &&
                (role === 'admin' ||
                    (level === 'level_1' && role === 'dokter') ||
                    (level === 'level_2' && role === 'rekam_medis') ||
                    (level === 'level_3' && role === 'kepala_departemen'));

            return (
                <div className="flex space-x-2">
                    {canEdit && canShowEditButton && (
                        <Link href={`/rekamMedisCk/${rekamMedisCk.id}/edit`}>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                </div>
            );
        },
    },
];
