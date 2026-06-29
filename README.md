# 🦀 Costracker

<p align="center">
  <img src="https://img.shields.io/badge/Rust-Backend-orange?style=for-the-badge&logo=rust" />
  <img src="https://img.shields.io/badge/Next.js-Frontend-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/SQLite-Database-blue?style=for-the-badge&logo=sqlite" />
  <img src="https://img.shields.io/badge/TypeScript-Language-blue?style=for-the-badge&logo=typescript" />
</p>

<p align="center">
A modern full-stack personal expense tracker built with <b>Rust</b>, <b>Axum</b>, <b>SQLite</b>, and <b>Next.js</b>.
</p>

---

## ✨ Features

* ➕ Add new transactions
* 📋 View all transactions
* ✏️ Update existing transactions
* 🗑️ Delete transactions
* 💾 Persistent SQLite storage
* ⚡ High-performance REST API built with Rust
* 🌐 Modern responsive web interface
* 🔄 Full CRUD functionality

---

## 🏗️ Architecture

```text
┌─────────────────────┐
│    Next.js UI       │
│ (React + TypeScript)│
└─────────┬───────────┘
          │ HTTP/JSON
          ▼
┌─────────────────────┐
│    Axum REST API    │
│       (Rust)        │
└─────────┬───────────┘
          │ SQLx
          ▼
┌─────────────────────┐
│      SQLite DB      │
└─────────────────────┘
```

---

## 🚀 Tech Stack

### Backend

* Rust
* Axum
* SQLx
* Tokio
* SQLite
* Serde

### Frontend

* Next.js
* React
* TypeScript
* Axios
* Tailwind CSS

---

## 📂 Project Structure

```text
Costracker/
│
├── backend/
│   ├── src/
│   ├── Cargo.toml
│   └── database.db
│
├── frontend/
│   ├── app/
│   ├── lib/
│   ├── types/
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Costracker.git
cd Costracker
```

---

## 🦀 Running the Backend

```bash
cd backend
cargo run
```

Backend will start at:

```text
http://localhost:8000
```

---

## 🌐 Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will start at:

```text
http://localhost:3000
```

---

## 🔌 API Endpoints

| Method | Endpoint            | Description                    |
| ------ | ------------------- | ------------------------------ |
| GET    | `/transactions`     | Retrieve all transactions      |
| GET    | `/transactions/:id` | Retrieve a single transaction  |
| POST   | `/transactions`     | Create a new transaction       |
| PUT    | `/transactions/:id` | Update an existing transaction |
| DELETE | `/transactions/:id` | Delete a transaction           |

---

## 📸 Screenshots

> Add screenshots of your application here.

### Dashboard

```text
[screenshot here]
```

### Transactions Page

```text
[screenshot here]
```

---

## 🎯 Future Improvements

* 📊 Expense analytics dashboard
* 📈 Interactive charts
* 🔍 Search and filtering
* 🌙 Dark mode
* 📅 Monthly and yearly reports
* 👤 User authentication
* 📤 Export data to CSV/PDF
* ☁️ Cloud deployment

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the project and submit a pull request.

---

## 📜 License

This project is licensed under the MIT License.

---

<p align="center">
Built with ❤️ using Rust and Next.js
</p>
