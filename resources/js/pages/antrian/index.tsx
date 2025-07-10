import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Antrian, Pasien, RawatInap, type BreadcrumbItem } from '@/types';
import { can } from '@/utils/permission';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {  AntrianColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Antrian Obat',
        href: '/antrian',
    },
];

interface Props {
    antrians: Antrian[];
    flash: {
        success: string | null;
        error: string | null;
    };
}

export default function PasienIndex({ antrians, flash }: Props) {
    const [open, setOpen] = useState(false);
    const [antrianValidation, setAntrianToValidation] = useState<number | null>(null);

    const page = usePage().props as {
        auth?: {
            permissions: string[];
            roles?: string[];
        };
    };

    const auth = page.auth ?? { permissions: [] };
    const canEdit = can('edit-rawatInap', auth);
    const canDelete = can('validation-antrian', auth);
    const canCreate = false;

    const { post: post } = useForm();

    const handleDelete = (id: number) => {
        setAntrianToValidation(id);
        setOpen(true);
    };

    const confirmPost = () => {
        if (antrianValidation) {
            post(`/antrian/${antrianValidation}`, {
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
                <DataTable columns={AntrianColumns(canEdit, canDelete, handleDelete)} data={antrians} page="antrian" canCreate={canCreate} />
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger />
                    <DialogContent>
                        <DialogHeader>
                            <h3 className="text-lg font-semibold">Validation Antrian</h3>
                        </DialogHeader>
                        <div className="mt-4">
                            <p>Are you sure you want to validation this antrian?</p>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button color="destructive" onClick={confirmPost}>
                                Confirm
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
