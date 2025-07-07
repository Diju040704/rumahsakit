import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Pasien } from '@/types';

const formSchema = z.object({
    pasien_id: z.number({ required_error: 'Nama pasien harus dipilih.' }).min(1, { message: 'Nama pasien harus dipilih.' }),
    jenis_perawatan: z.string().min(1, { message: 'Jenis perawatan harus dipilih.' }),
    tanggal_mulai: z.date({ required_error: 'Tanggal mulai harus diisi.' }),
    tanggal_selesai: z.date({ required_error: 'Tanggal selesai harus diisi.' }),
    diagnosa: z.string().min(1, { message: 'Diagnosa harus diisi.' }),
    kode: z.string().min(1, { message: 'Diagnosa harus diisi.' }),
    dokter: z.string().min(1, { message: 'Nama dokter harus diisi.' }),
});

interface Props {
    pasiens: Pasien[];
}

export default function CreateKesehatanPasien({ pasiens }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            diagnosa: '',
            kode: '',
            dokter: '',
            jenis_perawatan: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const postData = {
            ...values,
            tanggal_mulai: format(values.tanggal_mulai, 'yyyy-MM-dd'),
            tanggal_selesai: format(values.tanggal_selesai, 'yyyy-MM-dd'),
        };
        router.post('/kesehatanPasien', postData);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Kesehatan Pasien', href: '/kesehatanPasien' },
                { title: 'Create', href: '#' },
            ]}
        >
            <Head title="Create Kesehatan Pasien" />
            <div className="m-4 flex max-h-fit max-w-full flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm md:p-6">
                <h1 className="text-xl font-semibold text-slate-800">Create Kesehatan Pasien</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="pasien_id"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Nama Pasien</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                                                >
                                                    {field.value
                                                        ? pasiens.find((pasien) => pasien.id === field.value)?.nama_pasien
                                                        : 'Pilih pasien...'}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari nama pasien..." />
                                                <CommandEmpty>Pasien tidak ditemukan.</CommandEmpty>
                                                <CommandGroup>
                                                    {pasiens.map((pasien) => (
                                                        <CommandItem
                                                            value={pasien.nama_pasien}
                                                            key={pasien.id}
                                                            onSelect={() => {
                                                                form.setValue('pasien_id', pasien.id);
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    'mr-2 h-4 w-4',
                                                                    pasien.id === field.value ? 'opacity-100' : 'opacity-0',
                                                                )}
                                                            />
                                                            {pasien.nama_pasien}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="kode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kode</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan kode" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Field: Jenis Perawatan (Select) */}
                        <FormField
                            control={form.control}
                            name="jenis_perawatan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jenis Perawatan</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih jenis perawatan" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="rawat_inap">Rawat Inap</SelectItem>
                                            <SelectItem value="rawat_jalan">Rawat Jalan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Field: Dokter (Input) */}
                        <FormField
                            control={form.control}
                            name="dokter"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Dokter</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan nama dokter" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Field: Tanggal Mulai (Date Picker) */}
                        <FormField
                            control={form.control}
                            name="tanggal_mulai"
                            render={({ field }: { field: any }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Tanggal Mulai Perawatan</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-slate-500')}
                                                >
                                                    {field.value ? format(field.value, 'dd/MM/yyyy') : <span>Pilih tanggal</span>}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Field: Tanggal Selesai (Date Picker) */}
                        <FormField
                            control={form.control}
                            name="tanggal_selesai"
                            render={({ field }: { field: any }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Tanggal Selesai Perawatan</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-slate-500')}
                                                >
                                                    {field.value ? format(field.value, 'dd/MM/yyyy') : <span>Pilih tanggal</span>}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Field: Diagnosa (Textarea) */}
                        <FormField
                            control={form.control}
                            name="diagnosa"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Diagnosa</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Masukkan hasil diagnosa" className="resize-y" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Tombol Aksi */}
                        <div className="flex justify-end space-x-4 pt-4">
                            <Link href="/kesehatanPasien">
                                <Button type="button" variant="outline">
                                    Kembali
                                </Button>
                            </Link>
                            <Button type="submit">Simpan</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </AppLayout>
    );
}
