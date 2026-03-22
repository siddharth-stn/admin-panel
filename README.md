# Admin Panel

A modern, responsive admin dashboard built with **React 19**, **Vite 8**, **Tailwind CSS 4**, and **React Router 7** — designed as a course project for the **MERN Stack + DSA + AI** program at [WsCube Tech](https://www.wscubetech.com).

> This project is actively under development. Features and documentation will grow as the build progresses.

---

## About the Project

This admin panel is being built from the ground up to demonstrate real-world frontend architecture — layout-based routing, reusable components, and a clean separation of concerns. It serves as a practical application of the concepts I'm learning in my MERN Stack journey and will eventually evolve into a full-featured dashboard.

### Current Status

The project is in its **early stage** with the foundational structure and routing in place:

- Layout-based routing using React Router 7
- A `CommonLayout` component with a grid-based structure (side panel + header + content area)
- A `SidePanel` with `Link`-based navigation to all pages
- A `Header` with dynamic breadcrumb navigation based on the current URL
- Multiple page routes: Dashboard, Testimonial, Why Choose Us, Colour, Material, Category, Sub Category, Sub Sub Category, and Product
- Tailwind CSS 4 integrated via the Vite plugin for utility-first styling
- Code comments added throughout layout, routing, and navigation files for readability

### Project Structure

```
src/
├── main.jsx                        # Entry point with routing setup
├── Styles/
│   └── styles.css                  # Tailwind CSS import
├── components/
│   ├── CommonLayout.jsx            # Grid layout (sidebar + header + outlet)
│   └── common/
│       ├── Header.jsx              # Dynamic breadcrumb navigation
│       └── SidePanel.jsx           # Sidebar with Link-based navigation
└── pages/
    ├── Dashboard.jsx               # Dashboard (home page)
    ├── Testimonial.jsx             # Testimonial page
    ├── Choice.jsx                  # Why Choose Us page
    ├── Colour.jsx                  # Colour page
    ├── Material.jsx                # Material page
    ├── Category.jsx                # Category page
    ├── SubCategory.jsx             # Sub Category page
    ├── SubSubCategory.jsx          # Sub Sub Category page
    └── Product.jsx                 # Product page
```

### Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI library |
| Vite | 8 | Build tool & dev server |
| Tailwind CSS | 4 | Utility-first CSS framework |
| React Router | 7 | Client-side routing |
| ESLint | 9 | Code linting |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/siddharth-stn/admin-panel.git

# Navigate into the project
cd admin-panel

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## About Me

**Siddharth Pande** — Administrator, Problem Solver, Aspiring Developer

I'm an aspiring Full Stack Web Developer, educator, entrepreneur, and active Samajsevi (social worker) based in Satna, Madhya Pradesh. With over **15 years of experience in organizational leadership** — progressing from Teacher to Principal to Director & General Secretary of the **Nav Prabhat Society for Human Development** — I bring the discipline, strategic thinking, and project management skills of a senior leader, combined with the technical hunger of a developer.

### Why Software Development?

Throughout my tenure in administration, I constantly encountered inefficiencies that could only be solved by technology. I realized that to truly modernize education and management, I needed to build the tools myself. I'm now pivoting to Full Stack Development with the MERN Stack — not as a typical fresher, but as someone who understands real-world operations and wants to write the code that solves real-world problems.

### Education & Training

- **WsCube Tech** (Current) — MERN Stack + DSA + AI under live mentorship at India's leading vernacular EdTech platform (ISO 9001:2015 Certified, 4M+ YouTube subscribers, 2.5 lakh+ students trained)
- **The Odin Project** — Completed the full stack JavaScript path (2020-2022)
- **Namaste React** by Akshay Saini (2023)
- Currently learning **Next.js** (2026)

### Technical Skills

| Category | Skills |
|----------|--------|
| **Frontend** | HTML, CSS, JavaScript, React.js, Next.js, Tailwind CSS, Svelte |
| **Backend** | Node.js, Express.js, MongoDB, REST APIs, JWT Authentication |
| **Templating** | Pug (Jade) |
| **Tools** | Git, GitHub, Vite, Webpack, ESLint |
| **Soft Skills** | Operational Strategy, Stakeholder Management, Crisis Resolution, Project Management |

### Coding Journey

| Period | Phase | Focus |
|--------|-------|-------|
| 2020 | Foundations | HTML/CSS basics, The Odin Project |
| 2021 | Frontend Growth | JavaScript, React, site replicas, games |
| 2022 | Intermediate | Form validation, testing, portfolio |
| 2023 | Backend & Full-Stack | Express APIs, authentication, Svelte, Namaste React |
| 2026 | Advanced | Next.js, full-stack clones, MERN Stack, DSA, AI |

**GitHub Stats:** 72 public repositories | Active since June 2020 | Pull Shark badge earned

### Professional Experience

- **Director & General Secretary** — Nav Prabhat Society for Human Development (Apr 2019 – Present)
  - Oversees strategic and administrative operations of the society and Little Flowers Public Higher Secondary School (est. 2000, rated 4.7/5 on JustDial)
  - Manages budgets, staff, compliance, and project execution
- **Principal** — Little Flowers Public Hr. Sec. School, Satna (Jun 2014 – Apr 2019)
  - Led academic and administrative operations, managed faculty and curriculum development

### Community & Social Work

I'm an active Samajsevi holding leadership positions in multiple organizations:

- **Tehsil Prabhari (Raghurajnagar)** — Parashuram Kalyan Board, a community welfare organization in Madhya Pradesh
- **Shahar Adhyaksh / City President (Satna)** — Akhil Bhartiya Brahman Mahasabha, a historic national organization founded in 1939 by Pt. Madan Mohan Malaviya
- **Member** — Vindhya Vikas Forum, dedicated to socio-economic development in the Vindhya region of M.P.
- **Member** — Vishwa Hindu Mahasangh (World Hindu Federation), an international organization founded in 1981, operating across 44 countries and listed in the UIA Yearbook

---

## Connect With Me

- **GitHub:** [github.com/siddharth-stn](https://github.com/siddharth-stn)
- **LinkedIn:** [linkedin.com/in/siddharth-pande-b55307203](https://www.linkedin.com/in/siddharth-pande-b55307203/)
- **Facebook:** [facebook.com/sidharrthpande](https://www.facebook.com/sidharrthpande)

---

## License

This project is part of my coursework at WsCube Tech and is intended for educational purposes.
