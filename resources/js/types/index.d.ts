import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
    roles: string[];
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    roles?: string[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}


export interface Pasien {
    id: number;
    nama_pasien: string;
    kesehatan_pasien: KesehatanPasien[]
    nik: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    alamat: string;
    nohp: string;
}

export interface Antrian {
    id: number;
    kesehatan_pasien: KesehatanPasien[]
    status: string;
    no_antrian: string;
}

export interface KesehatanPasien {
    id: number;
    pasien_id: number;
    jenis_perawatan: string;
    kode: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    diagnosa: string;
    dokter: string;
}

export interface RawatInap {
    id: number;
    kesehatan_pasien_id: number;
    kamar: string;
    tindakan: string;
    obat: string;
}

export interface RawatJalan {
    id: number;
    kesehatan_pasien_id: number;
    resep: string;
    tindakan: string;
}

export interface RekamMedis {
    id: number;
    pasien_id: number;
    kesehatan_pasien_id: number;
    file: string;
    status: string;
    catatan: string;
}

export interface RekamMedisCk {
    id: number;
    rekam_medis_id: number;
    verifikator_id: number;
    verifikator: User;
    status: string;
    level_ck: string;
    tanggal: string;
    deskripsi: string;
}


