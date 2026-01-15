# ================================
# MEDISLINK BACKEND - SETUP FORGOT PASSWORD
# ================================

## 📧 Setup Resend untuk Kirim Email OTP

### 1. Daftar dan Dapatkan API Key Resend
- Kunjungi: https://resend.com
- Daftar akun baru (gratis)
- Buat API Key di dashboard: https://resend.com/api-keys
- Copy API Key yang diberikan

### 2. Tambahkan RESEND_API_KEY ke file .env
Buka file `.env` di folder backend dan tambahkan:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
```

Ganti `re_xxxxxxxxxxxxxxxxx` dengan API Key yang kamu dapatkan dari Resend.

### 3. Verifikasi Domain (Opsional untuk Production)
Untuk production, verifikasi domain kamu di: https://resend.com/domains

Lalu ubah di file `backend/utils/email.go` baris 98:
```go
From: "MedisLink <noreply@yourdomain.com>",  // Ganti dengan domain terverifikasi
```

Untuk testing, gunakan default: `onboarding@resend.dev`

### 4. Test Kirim Email
Jalankan backend dan frontend, lalu:
1. Buka halaman Login
2. Klik "Lupa password?"
3. Masukkan email yang terdaftar
4. Cek email untuk melihat kode OTP

## 🔧 Environment Variables Lengkap

File `.env` harus memiliki minimal:
```env
MONGODB_URI=mongodb://localhost:27017/medislink
JWT_SECRET=your-secret-key-here
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
```

## 🚀 Cara Testing

### Backend:
```bash
cd backend
go run main.go
```

### Frontend:
```bash
cd frontend
npm run dev
```

## 📝 Flow Forgot Password

1. User klik "Lupa password?" di halaman Login
2. User input email → Backend generate OTP 6 digit
3. OTP dikirim via email (valid 10 menit)
4. User input OTP di halaman VerifyOTP
5. User input password baru di halaman ResetPassword
6. Password berhasil direset → Redirect ke Login

## 🔒 Security Features

- OTP expire setelah 10 menit
- OTP hanya bisa dipakai 1 kali
- OTP terhapus otomatis setelah digunakan
- Password minimal 6 karakter
- Email validation
- Rate limiting (gunakan middleware jika perlu)

## 📂 File yang Dibuat/Diubah

### Backend:
- `models/password_reset_model.go` - Model untuk OTP
- `utils/email.go` - Utility kirim email
- `controllers/auth_controller.go` - 3 fungsi baru (RequestPasswordReset, VerifyOTP, ResetPassword)
- `routes/auth_routes.go` - 3 routes baru

### Frontend:
- `pages/ForgotPasswordPage.jsx` - Form input email
- `pages/VerifyOTPPage.jsx` - Form input OTP
- `pages/ResetPasswordPage.jsx` - Form password baru
- `App.jsx` - Routes baru
- `services/userServices.js` - Service functions
- `pages/LoginPage.jsx` - Update link forgot password

## 💡 Tips

1. Untuk testing, gunakan email yang bisa diakses
2. Check spam folder jika email tidak masuk
3. Resend limit: 100 emails/hari untuk akun gratis
4. OTP countdown 60 detik sebelum bisa kirim ulang
5. Pastikan MongoDB running dan collection `password_resets` akan dibuat otomatis
