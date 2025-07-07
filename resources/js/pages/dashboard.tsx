import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Hospital, BedDouble, Stethoscope, Users, CalendarDays, ArrowRight } from 'lucide-react';
import React from 'react';

// --- TIPE DATA & DATA DUMMY ---
// Dalam aplikasi nyata, data ini akan datang dari controller Anda.
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '#', // Menggunakan '#' karena link Inertia tidak berfungsi di pratinjau
    },
];

interface DashboardProps {
    totalPasien: number;
    rawatInap: number;
    rawatJalan: number;
}

// Data Dummy untuk komponen baru
const dummyChartData = [
    { day: 'Sen', value: 12 },
    { day: 'Sel', value: 19 },
    { day: 'Rab', value: 15 },
    { day: 'Kam', value: 22 },
    { day: 'Jum', value: 18 },
    { day: 'Sab', value: 25 },
    { day: 'Min', value: 21 },
];

const dummyRecentPatients = [
    { name: 'Budi Santoso', nik: '3201...001', time: '5 menit lalu' },
    { name: 'Citra Lestari', nik: '3201...002', time: '1 jam lalu' },
    { name: 'Dewi Anggraini', nik: '3201...003', time: '3 jam lalu' },
    { name: 'Ahmad Maulana', nik: '3201...004', time: '5 jam lalu' },
];

// --- KOMPONEN-KOMPONEN BARU ---

// Komponen: Banner Sambutan
const WelcomeBanner = () => {
    const [currentDate, setCurrentDate] = React.useState('');
    React.useEffect(() => {
        // Mengatur tanggal agar sesuai dengan format lokal Indonesia
        setCurrentDate(new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }));
    }, []);

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Selamat Datang Kembali!</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Berikut adalah ringkasan aktivitas rumah sakit Anda hari ini.</p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0 text-sm font-medium bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg px-4 py-2">
                <CalendarDays className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>{currentDate}</span>
            </div>
        </div>
    );
};

// Komponen: Kartu Statistik yang didesain ulang
const StatCard = ({ title, value, icon, iconBgColor }: { title: string, value: number, icon: React.ReactNode, iconBgColor: string }) => (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex items-center gap-6 transition-all hover:shadow-lg hover:-translate-y-1">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${iconBgColor}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            <p className="text-3xl font-bold text-slate-800 dark:text-white">{value.toLocaleString('id-ID')}</p>
        </div>
    </div>
);




export default function Dashboard({ totalPasien=2742, rawatInap=156, rawatJalan=389 }: DashboardProps) {
    const cards = [
        {
            title: 'Total Pasien Terdaftar',
            value: totalPasien,
            icon: <Users className="w-8 h-8 text-blue-600" />,
            iconBgColor: 'bg-blue-100 dark:bg-blue-900/50',
        },
        {
            title: 'Pasien Rawat Inap Aktif',
            value: rawatInap,
            icon: <BedDouble className="w-8 h-8 text-purple-600" />,
            iconBgColor: 'bg-purple-100 dark:bg-purple-900/50',
        },
        {
            title: 'Kunjungan Rawat Jalan (Hari ini)',
            value: rawatJalan,
            icon: <Stethoscope className="w-8 h-8 text-green-600" />,
            iconBgColor: 'bg-green-100 dark:bg-green-900/50',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
                <WelcomeBanner />

                {/* Grid untuk Kartu Statistik */}
                <div className="grid gap-6 mb-8 md:grid-cols-3">
                    {cards.map((card, idx) => (
                        <StatCard key={idx} {...card} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
