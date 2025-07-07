import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { KesehatanPasien, Pasien, RekamMedis } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    pasien_id: z.number().min(1, { message: 'Nama pasien harus diisi.' }),
    kesehatan_pasien_id: z.number().min(1, { message: 'Kesehatan pasien harus diisi.' }),
    file: z.any().refine((file) => file instanceof File || (file && file.length > 0), {
        message: 'File harus diunggah.',
    }),
    catatan: z.string().min(1, { message: 'Catatan harus diisi.' }),
});

interface Props {
    pasiens: Pasien[];
    rekamMedis: RekamMedis;
}

export default function CreateRekamMedis({ pasiens, rekamMedis }: Props) {
    const [kesehatanPasienOptions, setKesehatanPasienOptions] = useState<KesehatanPasien[]>([]);
    const [selectedPasienId, setSelectedPasienId] = useState(rekamMedis.pasien_id);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pasien_id: rekamMedis.pasien_id,
            kesehatan_pasien_id: rekamMedis.kesehatan_pasien_id,
            file: undefined,
            catatan: rekamMedis.catatan ? rekamMedis.catatan : 'Belum ada catatan',
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append('pasien_id', data.pasien_id.toString());
        formData.append('kesehatan_pasien_id', data.kesehatan_pasien_id.toString());
        formData.append('catatan', data.catatan || '');
        formData.append('_method', 'PUT');

        if (data.file instanceof File) {
            formData.append('file', data.file);
        }

        router.post(`/rekamMedis/${rekamMedis.id}`, formData, {
            forceFormData: true,
        });
    };
    useEffect(() => {
        const selectedPasien = pasiens.find((p) => p.id === selectedPasienId);

        if (selectedPasien && selectedPasien.kesehatan_pasien) {
            setKesehatanPasienOptions(selectedPasien.kesehatan_pasien);
        } else {
            setKesehatanPasienOptions([]);
        }
    }, [selectedPasienId, pasiens]);

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Rekam Medis', href: '/rekamMedis' },
                { title: 'Edit', href: '#' },
            ]}
        >
            <Head title="Edit Rekam Medis" />
            <div className="m-4 flex max-h-fit max-w-full flex-col gap-4 rounded-xl border p-4 md:p-6">
                <h1 className="text-xl font-semibold">Edit Rekam Medis</h1>
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
                                                                setSelectedPasienId(pasien.id);
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
                            name="kesehatan_pasien_id"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Kesehatan Pasien</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value ? String(field.value) : ''}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih data kesehatan..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {kesehatanPasienOptions.map((item) => (
                                                <SelectItem key={item.id} value={String(item.id)}>
                                                    {item.kode}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>File</FormLabel>
                                    <FormControl>
                                        <Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e: any) => field.onChange(e.target.files?.[0])} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="catatan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Catatan</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Masukkan catatan" className="resize-y" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-4 pt-4">
                            <Link href="/rekamMedis">
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
