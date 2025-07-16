# 🌐 WebScraper Frontend – React + Tailwind + Google Auth

This is the frontend of a full stack web scraping application, built using **React**, styled with **Tailwind CSS**, and authenticated with **Google OAuth**. It allows users to log in and enter any URL to fetch clean, structured content from that page via the backend FastAPI service.

Deployed live on **Vercel**.

---

## ✨ Features

- 🔐 **Google Login** using `@react-oauth/google`
- 📬 Input any URL to scrape and receive structured data
- 🧱 Data displayed in clean, collapsible cards (heading + content)
- 📱 **Fully responsive UI** using **Tailwind CSS**
- ⚡ Fetches data from a deployed **FastAPI** backend on Render
- 🌐 Uses `react-router-dom` for navigation between login and dashboard

---

## 🔧 Tech Stack

- **React** (Vite)
- **React Router DOM**
- **Tailwind CSS**
- **Axios**
- **Google OAuth 2.0**
- **Vercel** (deployment)

---

## 🖥️ Screens

### 🔐 Login Page
- Google Sign-In
- On success: navigates to dashboard

### 📊 Dashboard
- Enter a URL to scrape
- View content organized into sections:
  - Headings (`h1`, `h2`, `h3`)
  - Associated text (`p`, `li`)
- Responsive design with cards

---




