import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { KesehatanPasien, Pasien, type BreadcrumbItem } from '@/types';
import { can } from '@/utils/permission';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { KesehatanPasienColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kesehatan Pasien',
        href: '/kesehatanPasien',
    },
];

interface Props {
    kesehatanPasiens: KesehatanPasien[];
    flash: {
        success: string | null;
        error: string | null;
    };
}

export default function KesehatanPasienIndex({ kesehatanPasiens, flash }: Props) {
    const [open, setOpen] = useState(false);
    const [pasienToDelete, setPasienToDelete] = useState<number | null>(null);

    const page = usePage().props as {
        auth?: {
            permissions: string[];
            roles?: string[];
        };
    };

    const auth = page.auth ?? { permissions: [] };
    const canEdit = can('edit-kesehatanPasien', auth);
    const canDelete = can('delete-kesehatanPasien', auth);
    const canCreate = can('create-kesehatanPasien', auth);
    const canDownload = can('download-kesehatanPasien', auth);


    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        setPasienToDelete(id);
        setOpen(true);
    };

    const confirmDelete = () => {
        if (pasienToDelete) {
            destroy(`/kesehatanPasien/${pasienToDelete}`, {
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
            <Head title="Pasiens" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable columns={KesehatanPasienColumns(canDownload, canEdit, canDelete, handleDelete)} data={kesehatanPasiens} page="kesehatanPasien" canCreate={canCreate} />
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger />
                    <DialogContent>
                        <DialogHeader>
                            <h3 className="text-lg font-semibold">Delete Kesehatan Pasien</h3>
                        </DialogHeader>
                        <div className="mt-4">
                            <p>Are you sure you want to delete this kesehatan pasien?</p>
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
