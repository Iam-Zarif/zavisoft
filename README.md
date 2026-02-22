```md
# Zavisoft Frontend Task

## 🚀 Overview

This project is a frontend implementation of the provided Figma design.

It includes:

- Product Listing Page
- Product Detail Page
- Category Integration
- Cart Page (Bonus Feature)
- API integration for dynamic product data
- Fully responsive UI matching the design

The project focuses on clean architecture, proper data flow, and modular component structure.

---

## 🛠 Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Context API (State Management)
- Axios (Data Fetching)
- Tailwind CSS (Styling)
- GSAP / Embla Carousel (Animations & Carousel)
- React Icons

---

## 📂 Project Structure

The codebase follows a modular and scalable structure:

### App Router

```

📂 app
 - 📄 page.tsx
 - 📁 cart
 - 📁 product
    - 📁 [id]


📂 src
 - 📁 components
   - 📁 hero
   -  📁 home
   - 📁 product
   - 📁 reUsable
   -  📁 context
 - 📁 hooks
 - 📁 lib
 - 📁 providers
 - 📁 shared
 - 📁 types


## One Click Run

````

git clone https://github.com/Iam-Zarif/zavisoft.git
cd zavisoft
npm install
npm run dev

````


## ✅ Code Quality

* Clean and modular folder structure
* Proper separation of concerns
* Context-based state management
* API logic separated from UI components
* Meaningful commit history
* Loading and error states handled
* Checks
 - npm run lint
 - npm run type-check
 - npm run build
 - npm audit --omit=dev --audit-level=high

---

## 🌐 Live URL

[https://zavisoft-smoky.vercel.app](https://zavisoft-smoky.vercel.app)

---

## ⚡ Notes

* Product images from the API sometimes do not have transparent backgrounds, which may affect visual alignment with certain sections of the design.
* Layout and spacing are implemented according to the Figma design, but image rendering depends on API-provided assets.
* The project prioritizes clean structure and maintainable code over pixel-perfect image control due to API image limitations.

