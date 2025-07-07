<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'create-user',
            'edit-user',
            'delete-user',
            'show-user',
            'create-role',
            'edit-role',
            'delete-role',
            'show-role',
            'create-permission',
            'edit-permission',
            'delete-permission',
            'show-permission',
            'create-pasien',
            'edit-pasien',
            'delete-pasien',
            'show-pasien',
            'create-kesehatanPasien',
            'delete-kesehatanPasien',
            'edit-kesehatanPasien',
            'show-kesehatanPasien',
            'download-kesehatanPasien',
            'create-rekamMedis',
            'delete-rekamMedis',
            'edit-rekamMedis',
            'show-rekamMedis',
            'edit-rawatInap',
            'show-rawatInap',
            'edit-rawatJalan',
            'show-rawatJalan',
            'edit-rekamMedisCk',
            'show-rekamMedisCk',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }
    }
}
