# Modul294 Projektarbeit – Gym-Produkte Frontend

This Angular project is part of the Modul 294 Kompetenznachweis. It provides a modern web frontend for managing and browsing gym-related products, including admin-only features for product management and image handling.

---

## ✅ Project Info

- 🔧 **Framework**: Angular 17+ (Standalone Components + SCSS)
- 🔐 **Authentication**: Keycloak (OAuth2, Bearer Token)
- 🌐 **Backend API**: Spring Boot (from Modul 295 project)
- 💾 **Database**: PostgreSQL (handled in backend)

---

## 🔑 Keycloak Configuration

| Setting     | Value                     |
|-------------|---------------------------|
| Realm Name  | `ILV`                     |
| Client ID   | `gymprodukteapp`          |
| Roles       | `ROLE_admin`, `ROLE_user` |
| Public Access | `/api/public/products`  |
| Admin Access | `/api/admin/products`   |

You must create these roles in the Keycloak realm and assign them to test users accordingly. Admin-only functionality is guarded both in routes and the UI.

---

## ⚙️ Configuration (for running)

| Component         | Port |
|------------------|------|
| Angular frontend | `4200` |
| Spring Boot backend | `8081` |
| Keycloak server  | `8080` |

Make sure CORS and Keycloak client redirect URIs are configured accordingly.

---

## 🧪 Test Accounts

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin` |
| User  | `user`  | `halil`  |

*These users must be created in your Keycloak instance under the correct realm.*

---

## 🖼️ Image Handling

- Admins can upload images (base64 previewed)
- Images are saved in the database (`imageUrl` field)
- Public users can view these images without authentication via public API

---

## 🚀 Development

Start local dev server:

```bash
npm install
ng serve
