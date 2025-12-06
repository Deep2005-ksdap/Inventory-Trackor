# Inventory Trackor

A full-stack inventory management app built with React, Node.js, Express, and MongoDB.

---

## 🚀 Features

- User registration and login (JWT/cookie-based)
- Add, edit, and delete inventory items
- Dashboard with grouped items by category
- Low stock alerts and total inventory value
- Responsive, modern UI (Tailwind CSS)
- Protected routes and 404 handling

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Context API, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Auth:** JWT (stored in HTTP-only cookies)

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/inventory-trackor.git
cd inventory-trackor
```

### 2. Install dependencies

```bash
cd BACKEND
npm install
cd ../FRONTEND
npm install
```

### 3. Set up environment variables

- **Backend:**  
  Create a `.env` file in `/BACKEND`:
  ```
  MONGO_URI=your_mongodb_uri
  PORT=3002
  JWT_Secret=your_jwt_secret
  ```

- **Frontend:**  
  Create a `.env` file in `/FRONTEND`:
  ```
  VITE_API_URL=http://localhost:3002
  ```

### 4. Run the app

- **Backend:**  
  ```bash
  npm start
  ```
- **Frontend:**  
  ```bash
  npm run dev
  ```

---

## 🌐 API Endpoints

### Auth

- `POST /user/register` — Register a new user
- `POST /user/login` — Login
- `GET /user/logout` — Logout

### Inventory

- `GET /home/dashboard` — Get all items (with low stock info)
- `POST /home/add-item` — Add new item
- `PATCH /home/edit-item/:stockId` — Edit item
- `DELETE /home/delete-item/:stockId` — Delete item

---

## 📋 Usage

- Register or login to your account.
- Add new inventory items (category, name, price, units, etc).
- Edit or delete items from your dashboard.
- See low stock alerts and total inventory value.
- Logout securely.

---

## 📱 Screenshots

![alt text](image.png)

---

## 🙏 Credits

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)