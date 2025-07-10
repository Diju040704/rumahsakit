
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { can } from '@/utils/permission';
import { Link, usePage } from '@inertiajs/react';
import { BedDouble, ClipboardCheck, FileQuestion, FileText, HeartPulse, Key, LayoutGrid, Shield, Stethoscope, User, Users } from 'lucide-react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const page = usePage().props as {
        auth?: {
            permissions: string[];
            roles?: string[];
        };
    };

    const auth = page.auth ?? { permissions: [] };

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        can('show-user', auth) && {
            title: 'Users',
            href: '/user',
            icon: Users,
        },
        // can('show-permission', auth) && {
        //     title: 'Permission',
        //     href: '/permission',
        //     icon: Key,
        // },
        can('show-role', auth) && {
            title: 'Role',
            href: '/role',
            icon: Shield,
        },
        can('show-pasien', auth) && {
            title: 'Pasien',
            href: '/pasien',
            icon: User,
        },
        can('show-kesehatanPasien', auth) && {
            title: 'Kesehatan Pasien',
            href: '/kesehatanPasien',
            icon: HeartPulse,
        },
        can('show-rawatInap', auth) && {
            title: 'Rawat Inap',
            href: '/rawatInap',
            icon: BedDouble,
        },
        can('show-rawatJalan', auth) && {
            title: 'Rawat Jalan',
            href: '/rawatJalan',
            icon: Stethoscope,
        },
        can('show-rekamMedis', auth) && {
            title: 'Rekam Medis',
            href: '/rekamMedis',
            icon: FileText,
        },
        can('show-rekamMedisCk', auth) && {
            title: 'Rekam Medis Checkpoint',
            href: '/rekamMedisCk',
            icon: ClipboardCheck,
        },
        can('show-antrian', auth) && {
            title: 'Antrian Obat',
            href: '/antrian',
            icon: FileQuestion,
        },
    ].filter(Boolean) as NavItem[];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
