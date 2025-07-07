import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    nama_pasien: z.string().min(1, { message: 'Nama pasien harus diisi.' }),
    nik: z.string().length(16, { message: 'NIK harus terdiri dari 16 digit.' }),
    tanggal_lahir: z.string().min(1, { message: 'Tanggal lahir harus diisi.' }),
    jenis_kelamin: z.string().min(1, { message: 'Jenis kelamin harus dipilih.' }),
    alamat: z.string().min(1, { message: 'Alamat harus diisi.' }),
    nohp: z.string().min(10, { message: 'Nomor HP minimal 10 digit.' }).max(15, { message: 'Nomor HP maksimal 15 digit.' }),
});

export default function CreatePasien() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nama_pasien: '',
            nik: '',
            tanggal_lahir: '',
            jenis_kelamin: '',
            alamat: '',
            nohp: '',
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        router.post('/pasien', data);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Pasien', href: '/pasien' },
                { title: 'Create', href: '#' },
            ]}
        >
            <Head title="Create Pasien" />
            <div className="m-4 flex max-h-fit max-w-full flex-col gap-4 rounded-xl border p-4 md:p-6">
                <h1 className="text-xl font-semibold">Create Pasien</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="nama_pasien"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Pasien</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan nama pasien" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="nik"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>NIK</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Masukkan 16 digit NIK" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tanggal_lahir"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tanggal Lahir</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="jenis_kelamin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jenis Kelamin</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih jenis kelamin" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="alamat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alamat</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Masukkan alamat lengkap" className="resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="nohp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>No. HP</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="Contoh: 081234567890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-4 pt-4">
                            <Link href='/pasien'>
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
