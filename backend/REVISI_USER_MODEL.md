# Revisi User Model - Penambahan Field Baru

## Perubahan yang Dilakukan

### 1. Model User (`models/user_model.go`)
Menambahkan 3 field baru:
- `NIK`: string untuk nomor induk kependudukan
- `FotoKTP`: string untuk menyimpan path/URL foto KTP
- `FotoProfile`: string untuk menyimpan path/URL foto profile

### 2. Controller User (`controllers/user_controllers.go`)
- Menambahkan fungsi `UpdateUser` untuk mengupdate data user
- Fungsi ini mendukung update partial (hanya field yang dikirim yang akan diupdate)
- Termasuk field-field baru: NIK, FotoKTP, FotoProfile

### 3. Routes User (`routes/user_routes.go`)
- Menambahkan route `PUT /api/users/:id` untuk mengupdate user
- Route ini dilindungi dengan JWT middleware

## API Endpoints Terkait

### Update User
```
PUT /api/users/:id
Authorization: Bearer <token>

Body (JSON):
{
    "name": "Nama Lengkap",
    "email": "email@example.com", 
    "phone": "08123456789",
    "address": "Alamat lengkap",
    "nik": "1234567890123456",
    "foto_ktp": "/uploads/ktp/user_ktp.jpg",
    "foto_profile": "/uploads/profile/user_profile.jpg"
}
```

### Register User
Sekarang mendukung field baru (opsional):
```
POST /api/auth/register

Body (JSON):
{
    "name": "Nama Lengkap",
    "email": "email@example.com",
    "password": "password123",
    "phone": "08123456789",
    "address": "Alamat lengkap",
    "nik": "1234567890123456",
    "foto_ktp": "/uploads/ktp/user_ktp.jpg",
    "foto_profile": "/uploads/profile/user_profile.jpg"
}
```

## Catatan
- Field foto_ktp dan foto_profile menyimpan path file, bukan binary data
- Implementasi upload file perlu ditambahkan secara terpisah
- Semua field baru bersifat opsional (tidak required)