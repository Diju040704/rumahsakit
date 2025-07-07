import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Pasien, RawatInap } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    kamar: z.string().min(1, { message: 'Kamar pasien harus diisi.' }),
    tindakan: z.string().min(1, { message: 'Tindakan harus diisi.' }),
    obat: z.string().min(1, { message: 'Obat harus diisi.' }),
});


interface Props {
    rawatInap: RawatInap;
}


export default function EditRawatInap({rawatInap}:Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          kamar: rawatInap.kamar ? rawatInap.kamar : 'Data kamar belum diisi',
          tindakan: rawatInap.tindakan ? rawatInap.tindakan : 'Data tindakan belum diisi',
          obat: rawatInap.obat ? rawatInap.obat : 'Data obat belum diisi'
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        router.put(`/rawatInap/${rawatInap.id}`, data);
    };


    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Rawat Inap', href: '/rawatInap' },
                { title: 'Edit', href: '#' },
            ]}
        >
            <Head title="Edit Rawat Inap" />
            <div className="m-4 flex max-h-fit max-w-full flex-col gap-4 rounded-xl border p-4 md:p-6">
                <h1 className="text-xl font-semibold">Edit Rawat Inap</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="kamar"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kamar</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan Data Kamar" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



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
                            name="obat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Obat</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Masukkan obat" className="resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <div className="flex justify-end space-x-4 pt-4">
                            <Link href='/rawatInap'>
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
