import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Pasien, RawatInap, RawatJalan } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    tindakan: z.string().min(1, { message: 'Tindakan harus diisi.' }),
    resep: z.string().min(1, { message: 'Resep harus diisi.' }),
});


interface Props {
    rawatJalan: RawatJalan;
}


export default function EditRawatJalan({rawatJalan}:Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          tindakan: rawatJalan.tindakan ? rawatJalan.tindakan : 'Data tindakan belum diisi',
          resep: rawatJalan.resep ? rawatJalan.resep : 'Data resep belum diisi'
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        router.put(`/rawatJalan/${rawatJalan.id}`, data);
    };


    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Rawat Jalan', href: '/rawatJalan' },
                { title: 'Edit', href: '#' },
            ]}
        >
            <Head title="Edit Rawat Jalan" />
            <div className="m-4 flex max-h-fit max-w-full flex-col gap-4 rounded-xl border p-4 md:p-6">
                <h1 className="text-xl font-semibold">Edit Rawat Jalan</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="tindakan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tindakan</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Masukkan tindakan" className="resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="resep"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Resep</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Masukkan resep" className="resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-4 pt-4">
                            <Link href='/rawatJalan'>
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
