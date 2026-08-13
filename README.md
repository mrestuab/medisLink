# MedisLink - Medical Equipment Management System

![MedisLink](https://img.shields.io/badge/MedisLink-v1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)

Sistem manajemen peralatan medis dan donasi yang komprehensif untuk rumah sakit dan klinik. Platform ini memungkinkan pengelolaan inventaris alat medis, permintaan pinjam, riwayat donasi, dan notifikasi real-time.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Penggunaan](#penggunaan)
- [Struktur Proyek](#struktur-proyek)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## ✨ Fitur Utama

### Manajemen Inventaris
- ✅ Daftar lengkap peralatan medis
- ✅ Tracking status ketersediaan alat
- ✅ Kategori produk yang terorganisir
- ✅ Riwayat perubahan inventaris

### Sistem Peminjaman (Loan)
- ✅ Permintaan peminjaman dengan approval workflow
- ✅ Tracking durasi peminjaman
- ✅ Notifikasi pengingat pengembalian
- ✅ Riwayat peminjaman lengkap

### Manajemen Donasi
- ✅ Pencatatan donasi masuk
- ✅ History donasi dan donor
- ✅ Laporan donasi berkala

### Sistem Review & Rating
- ✅ Review peralatan medis
- ✅ Rating dari pengguna
- ✅ Feedback quality assurance

### Berita & Notifikasi
- ✅ Feed berita terkini
- ✅ Sistem notifikasi real-time
- ✅ Pengingat peminjaman otomatis

### Autentikasi & Keamanan
- ✅ Login dengan JWT Token
- ✅ Forgot Password dengan Reset Link
- ✅ OTP Verification
- ✅ Role-based Access Control (User & Admin)

### Admin Dashboard
- ✅ Manajemen tools dan donasi
- ✅ Monitoring peminjaman
- ✅ User management
- ✅ Laporan dan statistik

## 🛠️ Tech Stack

### Backend
- **Language**: Go 1.x
- **Framework**: Gin Gonic (Web Framework)
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token)
- **File Storage**: Cloudinary
- **Email**: SMTP Integration
- **Task Scheduler**: Go Scheduler

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context / Hooks
- **HTTP Client**: Axios
- **Component Library**: Headless UI
- **Router**: React Router

## 📦 Instalasi

### Prerequisites
- Go 1.x atau lebih tinggi
- Node.js 16+ dan npm/yarn
- PostgreSQL 12+
- Git

### Clone Repository
```bash
git clone https://github.com/yourusername/medisLink.git
cd medisLink
```

### Setup Backend

1. **Navigate ke folder backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   go mod download
   go mod tidy
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Konfigurasi file `.env` dengan detail database dan service API:
   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_NAME=medislink_db
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRY=24h
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Email SMTP
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_password
   
   # Server
   PORT=8080
   ENV=development
   ```

4. **Jalankan server**
   ```bash
   go run main.go
   ```
   Server akan berjalan di `http://localhost:8080`

### Setup Frontend

1. **Navigate ke folder frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Konfigurasi file `.env`:
   ```env
   VITE_API_URL=http://localhost:8080/api
   ```

4. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```
   Frontend akan berjalan di `http://localhost:5173`

## ⚙️ Konfigurasi Database

### Buat Database
```sql
CREATE DATABASE medislink_db;
```

### Run Migrations
Database schema akan otomatis dibuat saat aplikasi pertama kali dijalankan (jika menggunakan auto migration).

Atau jalankan SQL migrations secara manual dari folder `database/migrations/`.

## 🚀 Penggunaan

### Development
```bash
# Backend - Terminal 1
cd backend
go run main.go

# Frontend - Terminal 2
cd frontend
npm run dev
```

### Production Build
```bash
# Frontend
npm run build

# Backend
go build -o medislink
```

### Testing
```bash
# Backend
cd backend
go test ./...

# Frontend
cd frontend
npm run test
```

## 📁 Struktur Proyek

```
medisLink/
├── backend/
│   ├── main.go                 # Entry point
│   ├── go.mod                  # Go dependencies
│   ├── config/
│   │   └── database.go         # Database configuration
│   ├── controllers/            # Business logic & handlers
│   │   ├── auth_controller.go
│   │   ├── tool_controller.go
│   │   ├── loan_controller.go
│   │   ├── donation_controller.go
│   │   ├── user_controllers.go
│   │   └── ...
│   ├── models/                 # Data models
│   │   ├── user_model.go
│   │   ├── tool_model.go
│   │   ├── loan_model.go
│   │   └── ...
│   ├── routes/                 # API routes
│   │   ├── auth_routes.go
│   │   ├── tool_routes.go
│   │   └── ...
│   ├── middlewares/            # Custom middlewares
│   │   └── jwt_middleware.go
│   ├── jobs/                   # Background jobs & schedulers
│   │   └── scheduler.go
│   └── utils/                  # Utility functions
│       ├── cloudinary.go
│       └── email.go
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx            # Entry point
│   │   ├── App.jsx             # Root component
│   │   ├── index.css           # Global styles
│   │   ├── components/         # Reusable components
│   │   │   ├── DonationHistory.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── admin/          # Admin components
│   │   │   └── ...
│   │   ├── layouts/            # Page layouts
│   │   ├── pages/              # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── admin/          # Admin pages
│   │   │   └── ...
│   │   └── services/           # API services
│   │       ├── api.js          # Axios configuration
│   │       ├── userServices.js
│   │       └── adminServices.js
│   ├── vite.config.js
│   ├── tailwind.config.cjs
│   └── package.json
│
└── README.md
```

## 🔌 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register          - Register user baru
POST   /api/auth/login             - Login user
POST   /api/auth/forgot-password   - Request password reset
POST   /api/auth/reset-password    - Reset password dengan token
POST   /api/auth/verify-otp        - Verify OTP
```

### Tools Endpoints
```
GET    /api/tools                  - Daftar semua tools
GET    /api/tools/:id              - Detail tool
POST   /api/tools                  - Tambah tool (Admin)
PUT    /api/tools/:id              - Update tool (Admin)
DELETE /api/tools/:id              - Hapus tool (Admin)
```

### Loan Endpoints
```
GET    /api/loans                  - Daftar peminjaman
POST   /api/loans                  - Buat permintaan pinjam
PUT    /api/loans/:id/approve      - Approve peminjaman (Admin)
PUT    /api/loans/:id/return       - Kembalikan alat
GET    /api/loans/:id              - Detail peminjaman
```

### Donation Endpoints
```
GET    /api/donations              - Daftar donasi
POST   /api/donations              - Catat donasi baru
GET    /api/donations/:id          - Detail donasi
```

### User Endpoints
```
GET    /api/users/profile          - Profile user
PUT    /api/users/profile          - Update profile
GET    /api/users                  - Daftar user (Admin)
PUT    /api/users/:id/role         - Update role user (Admin)
```

### Notifikasi Endpoints
```
GET    /api/notifications          - Daftar notifikasi user
PUT    /api/notifications/:id/read - Tandai notifikasi dibaca
DELETE /api/notifications/:id      - Hapus notifikasi
```

Dokumentasi API lengkap tersedia di `/api/docs` atau cek folder `backend/routes/`

## 📊 Database Schema

### Users Table
- id (Primary Key)
- email (Unique)
- password (Hashed)
- full_name
- phone_number
- role (user/admin)
- avatar_url
- is_verified
- created_at, updated_at

### Tools Table
- id (Primary Key)
- name
- description
- category_id (Foreign Key)
- quantity
- available_quantity
- status
- image_url
- created_at, updated_at

### Loans Table
- id (Primary Key)
- user_id (Foreign Key)
- tool_id (Foreign Key)
- quantity_borrowed
- loan_date
- due_date
- return_date
- status (pending/approved/returned)
- notes
- created_at, updated_at

### Donations Table
- id (Primary Key)
- donor_name
- donor_email
- tool_id (Foreign Key)
- quantity
- donation_date
- status
- created_at, updated_at

### Notifications Table
- id (Primary Key)
- user_id (Foreign Key)
- title
- message
- type
- is_read
- created_at

## 🤝 Contributing

Kami menyambut kontribusi dari komunitas! Berikut langkah-langkahnya:

1. **Fork repository**
   ```bash
   git clone https://github.com/yourusername/medisLink.git
   ```

2. **Buat branch fitur**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push ke branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Buat Pull Request**

### Guidelines
- Follow coding standards yang ada
- Pastikan kode Anda sudah di-test
- Update dokumentasi jika diperlukan
- Commit messages harus deskriptif

## 📝 Lisensi

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 👥 Tim Pengembang

- **Lead Developer**: [Your Name]
- **Contributors**: [List of contributors]

## 📧 Kontak & Support

Untuk pertanyaan atau support:
- Email: support@medislink.com
- Issues: [GitHub Issues](https://github.com/yourusername/medisLink/issues)
- Discussions: [GitHub Discussions](https://github.com/yourusername/medisLink/discussions)

## 🎯 Roadmap

- [ ] Mobile App (React Native)
- [ ] Advanced Analytics Dashboard
- [ ] Integration dengan Hospital Management System (HMS)
- [ ] Multi-location support
- [ ] AI-powered inventory prediction
- [ ] SMS Notification Integration

---

**Made with ❤️ for better medical equipment management**
