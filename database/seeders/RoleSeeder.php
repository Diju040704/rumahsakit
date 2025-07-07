<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::firstOrCreate(['name' => 'admin'], ['guard_name' => 'web']);
        $dokter = Role::firstOrCreate(['name' => 'dokter'], ['guard_name' => 'web']);
        $rekam_medis = Role::firstOrCreate(['name' => 'rekam_medis'], ['guard_name' => 'web']);
        $perawat = Role::firstOrCreate(['name' => 'perawat'], ['guard_name' => 'web']);
        $kepala_departemen = Role::firstOrCreate(['name' => 'kepala_departemen'], ['guard_name' => 'web']);

        $permissions = Permission::all();
        $admin->syncPermissions($permissions);
    }
}
