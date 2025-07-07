    import { DataTable } from '@/components/DataTable';
    import { Button } from '@/components/ui/button';
    import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
    import AppLayout from '@/layouts/app-layout';
    import { RekamMedisCk, type BreadcrumbItem } from '@/types';
    import { can } from '@/utils/permission';
    import { Head, useForm, usePage } from '@inertiajs/react';
    import { useEffect, useState } from 'react';
    import { toast } from 'sonner';
    import { RekamMedisCkColumns } from './columns';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Rekam Medis Checkpoint',
            href: '/rekamMedisCk',
        },
    ];

    interface Props {
        rekamMedisCks: RekamMedisCk[];
        flash: {
            success: string | null;
            error: string | null;
        };
    }

    export default function RekamMedisIndex({ rekamMedisCks, flash }: Props) {
        const [open, setOpen] = useState(false);
        const [rekamMedisToDelete, setRekamMedisToDelete] = useState<number | null>(null);
        const page = usePage().props as {
            auth?: {
                permissions: string[];
                roles?: string[];
                user?: {
                    name: string;
                    email: string;
                    role: string;
                };
            };
        };

        const auth = page.auth ?? { permissions: [] };
        const currentUser = auth.user?.roles[0].name;


        const canEdit = can('edit-rekamMedisCk', auth);
        const canDelete = false;
        const canCreate = false;

        const { delete: destroy } = useForm();

        const handleDelete = (id: number) => {
            setRekamMedisToDelete(id);
            setOpen(true);
        };

        const confirmDelete = () => {
            if (rekamMedisToDelete) {
                destroy(`/rekamMedisCk/${rekamMedisToDelete}`, {
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
                <Head title="Rekam Medis Checkpoint" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <DataTable
                        columns={RekamMedisCkColumns(canEdit, canDelete, currentUser ,handleDelete )}
                        data={rekamMedisCks}
                        page="rekamMedisCk"
                        canCreate={canCreate}
                    />
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
