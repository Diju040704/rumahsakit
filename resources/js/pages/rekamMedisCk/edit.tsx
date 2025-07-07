import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { RekamMedisCk } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    deskripsi: z.string().min(1, { message: 'Deskripsi Rekam Medis harus diisi.' }),
    status: z.string().min(1, { message: 'Status pasien harus diisi.' }),
});

interface Props {
    rekamMedisCk: RekamMedisCk;
}

export default function CreateRekamMedis({ rekamMedisCk }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            deskripsi: rekamMedisCk.deskripsi,
            status: rekamMedisCk.status,
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        router.put(`/rekamMedisCk/${rekamMedisCk.id}`, data);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Rekam Medis Ck', href: '/rekamMedisCk' },
                { title: 'Edit', href: '#' },
            ]}
        >
            <Head title="Edit Rekam Medis Check Point" />
            <div className="m-4 flex max-h-fit max-w-full flex-col gap-4 rounded-xl border p-4 md:p-6">
                <h1 className="text-xl font-semibold">Edit Rekam Medis Check Point</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih status verifikasi" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="revisi">Revisi</SelectItem>
                                            {rekamMedisCk.level_ck === 'level_3' && <SelectItem value="final">Final</SelectItem>}
                                            {rekamMedisCk.level_ck !== 'level_3' && <SelectItem value="verifikasi">Verifikasi</SelectItem>}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="deskripsi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Masukkan Deskripsi" className="resize-y" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-4 pt-4">
                            <Link href="/rekamMedisCk">
                                <Button type="button" variant="outline">
                                    Back
                                </Button>
                            </Link>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </AppLayout>
    );
}
