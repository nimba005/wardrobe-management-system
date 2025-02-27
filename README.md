# Wardrobe Management System

## 📌 Overview
The **Wardrobe Management System** is a web application designed to help users organize and manage their clothing items. Users can add, edit, delete, and categorize clothes, providing an efficient way to keep track of their wardrobe.

## 🚀 Features
- ✅ User authentication (Login/Logout)
- ✅ Add new clothing items with images
- ✅ Edit and update clothing details
- ✅ Delete clothing items
- ✅ Filter clothes by category
- ✅ Search functionality for quick access

## 🛠 Tech Stack
- **Frontend:** Vue 3, Tailwind CSS
- **Backend:** Laravel 11
- **State Management:** Pinia
- **Database:** MySQL
- **Deployment:** TBD

## 📂 Project Structure
```
wardrobe-management/
│── src/
│   ├── components/      # Reusable UI components
│   ├── views/           # Page views (Home, Login, etc.)
│   ├── stores/          # Pinia state management
│   ├── assets/          # Images and styles
│── backend/             # Laravel backend API
│── public/              # Static assets
│── README.md            # Project documentation
│── package.json         # Frontend dependencies
│── vite.config.js       # Vite configuration
```

## 🔧 Installation & Setup
### Prerequisites
Make sure you have the following installed:
- Node.js (>=16.x)
- Vue CLI
- PHP (>=8.x)
- Composer
- MySQL

### 📌 Frontend Setup
```bash
git clone https://github.com/your-username/wardrobe-management.git
cd wardrobe-management/frontend
npm install
npm run dev
```
The frontend will be running at `http://localhost:5173/`

### 📌 Backend Setup (Laravel)
```bash
cd wardrobe-management/backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```
The backend API will be running at `http://127.0.0.1:8000/`

## 📸 Screenshots
![Home Page](https://via.placeholder.com/800x400)
![Add Clothing](https://via.placeholder.com/800x400)

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

## 📩 Contact
For any issues or feature requests, reach out at **info@dungamaternity.com** or create an issue in the [GitHub repository](https://github.com/nimba005/wardrobe-management).

