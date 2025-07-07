import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Pasien, RawatInap, RawatJalan, type BreadcrumbItem } from '@/types';
import { can } from '@/utils/permission';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { RawatJalanColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rawat Inap',
        href: '/rawatInap',
    },
];

interface Props {
    rawatJalans: RawatJalan[];
    flash: {
        success: string | null;
        error: string | null;
    };
}

export default function PasienIndex({ rawatJalans, flash }: Props) {
    const [open, setOpen] = useState(false);
    const [pasienToDelete, setPasienToDelete] = useState<number | null>(null);

    const page = usePage().props as {
        auth?: {
            permissions: string[];
            roles?: string[];
        };
    };

    const auth = page.auth ?? { permissions: [] };
    const canEdit = can('edit-rawatJalan', auth);
    const canDelete = false;
    const canCreate = false;

    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        setPasienToDelete(id);
        setOpen(true);
    };

    const confirmDelete = () => {
        if (pasienToDelete) {
            destroy(`/pasien/${pasienToDelete}`, {
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
            <Head title="Rawat Inap" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable columns={RawatJalanColumns(canEdit, canDelete, handleDelete)} data={rawatJalans} page="rawatJalan" canCreate={canCreate} />
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger />
                    <DialogContent>
                        <DialogHeader>
                            <h3 className="text-lg font-semibold">Delete Pasien</h3>
                        </DialogHeader>
                        <div className="mt-4">
                            <p>Are you sure you want to delete this pasien?</p>
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
