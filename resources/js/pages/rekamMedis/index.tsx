import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Pasien, RawatInap, RawatJalan, RekamMedis, type BreadcrumbItem } from '@/types';
import { can } from '@/utils/permission';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { RekamMedisColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rekam Medis',
        href: '/rekamMedis',
    },
];

interface Props {
    rekamMedises: RekamMedis[];
    flash: {
        success: string | null;
        error: string | null;
    };
}

export default function RekamMedisIndex({ rekamMedises, flash }: Props) {
    const [open, setOpen] = useState(false);
    const [rekamMedisToDelete, setRekamMedisToDelete] = useState<number | null>(null);

    const page = usePage().props as {
        auth?: {
            permissions: string[];
            roles?: string[];
        };
    };

    const auth = page.auth ?? { permissions: [] };
    const canEdit = can('edit-rekamMedis', auth);
    const canDelete = can('delete-rekamMedis', auth);
    const canCreate = can('create-rekamMedis', auth);

    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        setRekamMedisToDelete(id);
        setOpen(true);
    };

    const confirmDelete = () => {
        if (rekamMedisToDelete) {
            destroy(`/rekamMedis/${rekamMedisToDelete}`, {
                onSuccess: () => {
                    setOpen(false);
                },
            });
        }
    };

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rekam Medis" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable columns={RekamMedisColumns(canEdit, canDelete, handleDelete)} data={rekamMedises} page="rekamMedis" canCreate={canCreate} />
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger />
                    <DialogContent>
                        <DialogHeader>
                            <h3 className="text-lg font-semibold">Delete Rekam Medis</h3>
                        </DialogHeader>
                        <div className="mt-4">
                            <p>Are you sure you want to delete this rekam Medis?</p>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button color="destructive" onClick={confirmDelete}>
                                Confirm
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
