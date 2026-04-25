# Admin Panel

A modern, responsive admin dashboard built with **React 19**, **Vite 8**, **Tailwind CSS 4**, and **React Router 7** — designed as a course project for the **MERN Stack + DSA + AI** program at [WsCube Tech](https://www.wscubetech.com).

---

## About the Project

This admin panel demonstrates real-world frontend architecture — layout-based routing, reusable components, and a clean separation of concerns. It serves as a practical application of the concepts I'm learning in my MERN Stack journey.

### Features

- Layout-based routing using React Router 7
- A `CommonLayout` component with a grid-based structure (side panel + header + content area)
- A `SidePanel` with `NavLink`-based navigation, active route highlighting, lucide-react icons, and collapsible sub-menus (using `useState`)
- A `Header` with dynamic breadcrumb navigation based on the current URL — automatically filters out MongoDB ObjectIDs from the breadcrumb path for clean display
- A `Login` page at `/` with a split-layout design (email/password form + decorative image) — login button navigates to `/dashboard` via `NavLink`
- A `Dashboard` page at `/dashboard` with an overview section displaying color-coded stat cards (Users, Product, Category, Orders)
- View pages with data tables for Testimonial, Why Choose Us, Colour, Material, Category, Sub Category, Sub Sub Category, and Product — each with select, S.No., relevant columns, status (Active/Inactive), edit action (where applicable), and bulk action buttons (Filter, Delete All, Change Status); Category, Colour, Material, and Product view pages are fully API-integrated with server-side pagination, dynamic filtering, checkbox bulk selection, status toggle, and soft delete
- Add forms for Testimonial (image, name, message, rating, order), Why Choose Us (image, title, order), Colour (name, hex code, order — fully API-integrated with CRUD, edit mode via `colour/update/:id`, and validation), Material (name, order — fully API-integrated with CRUD, edit mode via `material/update/:id`, and validation), Category (image upload, name, order — fully API-integrated), Sub Category (parent category dropdown, image, name, order — fully API-integrated with CRUD, validation, controlled components, and proper state management), and Sub Sub Category (parent category + sub category dropdowns, image, name, order)
- **Product Management** (Fully Implemented): Complete CRUD functionality with API integration — Add/Edit Product form with 3-level cascading category dropdowns (parent → sub → sub-sub), multi-select for materials and colors, product type (Featured/On Sale/New Arrivals) and best selling selectors, single image upload with preview, multiple image upload (up to 12) with gallery preview, product code, dimension, estimated delivery, short/long descriptions, sale price, actual price, and order; uses `useParams()` for edit mode detection (`product/update/:id`), fetches product details with populated references for editing, client-side validation with real-time error clearing, FormData with multipart file uploads via Axios; View Product page with full API integration including product table (name, image, category, type, prices, order, status), server-side pagination, filter by product name and parent category dropdown, checkbox bulk selection with select-all, bulk delete with iziToast confirmation dialog, bulk status toggle, and edit action links
- Add/Edit Category form with full CRUD functionality: uses `useParams()` to detect edit mode (`category/update/:id` route), fetches existing category details for editing via `useEffect`, populates form with `defaultValue` and `key` prop for controlled re-rendering, uses `axios.post()` for create and `axios.put()` for update, image upload with live preview (`URL.createObjectURL`) that shows existing server image during edit or new upload preview, client-side validation with real-time error clearing (`noValidate` + custom validation logic using `FormData`), and toast notifications (iziToast) for success/warning/error feedback including server-side validation error display
- View Category page with full API integration: fetches categories from backend via Axios POST, displays data in a dynamic table with serial numbers, image rendering via `VITE_SERVER_URL` env variable and static file serving, status indicators (Active/Inactive), edit action links that navigate to `category/update/:id` for inline editing, functional filter form (filter by category name and order with clear/apply, sends filter data to backend and resets pagination on apply), server-side pagination (sends current page to backend, renders page controls via `react-responsive-pagination`), empty state handling, select-all checkbox in table header (toggles all row checkboxes) and individual row checkboxes for bulk action buttons (Filter, Delete All, Change Status) that are disabled until rows are selected — disabled state derived directly from `selectedRecord.length === 0`, styled with Tailwind 4 `disabled:opacity-50`, `disabled:cursor-not-allowed`, and `not-disabled:hover:` variants for proper disabled UX
- **Sub Category Management** (Fully Implemented): Complete CRUD functionality with hierarchical relationship to parent categories, featuring controlled components for form state management, parent category dropdown populated via API, image upload with preview, real-time validation, and proper state reset when navigating between add and edit modes; View Sub Category page includes advanced filtering by subcategory name and parent category dropdown, server-side pagination, bulk operations (status toggle, delete), and proper parent category display with population
- iziToast CSS globally imported in `main.jsx` for toast notification styling
- Environment variable configuration via `.env` file (`VITE_SERVER_URL`) for backend API and static asset URLs — all API calls use `import.meta.env.VITE_SERVER_URL` (no hardcoded URLs)
- Backend static file serving configured with `express.static` to serve uploaded images from the `/uploads` directory
- Collapsible sidebar sections for all page categories (Add/View) with nested routes
- All page routes use nested sub-pages: Dashboard, Testimonial, Why Choose Us, Colour, Material, Category, Sub Category, Sub Sub Category, and Product
- Tailwind CSS 4 integrated via the Vite plugin for utility-first styling
- Dark mode support via Tailwind's `dark:` variant across sidebar, header, forms, and page headers
- Consistent theme documented in `THEME.md` for design reference
- Code comments added throughout all component and page files for readability

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
│       └── SidePanel.jsx           # Sidebar with NavLink active styling + icons
└── pages/
    ├── Login.jsx                   # Login page with email/password form
    ├── Dashboard.jsx               # Dashboard with overview stat cards
    ├── testimonial/
    │   ├── AddTestimonial.jsx      # Add Testimonial page
    │   └── ViewTestimonial.jsx     # View Testimonials page
    ├── choice/
    │   ├── AddWhyChoose.jsx        # Add Why Choose Us page
    │   └── ViewWhyChoose.jsx       # View Why Choose Us page
    ├── colour/
    │   ├── AddColour.jsx           # Add/Edit Colour page (full CRUD — create + update via useParams)
    │   └── ViewColour.jsx          # View Colours page (API integrated + pagination + filter + edit links)
    ├── material/
    │   ├── AddMaterial.jsx         # Add/Edit Material page (full CRUD — create + update via useParams)
    │   └── ViewMaterial.jsx        # View Materials page (API integrated + pagination + filter + edit links)
    ├── category/
    │   ├── AddCategory.jsx         # Add/Edit Category page (full CRUD — create + update via useParams)
    │   └── ViewCategory.jsx        # View Categories page (API integrated + pagination + filter + edit links)
    ├── sub-category/
│   ├── AddSubCategory.jsx      # Add/Edit Sub Category page (full CRUD with controlled components)
│   └── ViewSubCategory.jsx     # View Sub Categories page (API integrated with advanced filtering)
    ├── sub-sub-category/
    │   ├── AddSubSubCategory.jsx   # Add/Edit Sub Sub Category page (full CRUD with hierarchical dropdowns)
    │   └── ViewSubSubCategory.jsx  # View Sub Sub Categories page (API integrated with cascading filters)
    └── product/
        ├── AddProduct.jsx          # Add/Edit Product page (full CRUD — create + update via useParams, cascading dropdowns, multi-file upload)
        └── ViewProduct.jsx         # View Products page (API integrated + pagination + filter + bulk actions + edit links)
```

### Tech Stack

| Technology                  | Version | Purpose                         |
| --------------------------- | ------- | ------------------------------- |
| React                       | 19      | UI library                      |
| Vite                        | 8       | Build tool & dev server         |
| Tailwind CSS                | 4       | Utility-first CSS framework     |
| React Router                | 7       | Client-side routing             |
| Axios                       | 1.15    | HTTP client for API requests    |
| iziToast                    | 1.4     | Toast notification library      |
| Lucide React                | 1.0     | Icon library for UI icons       |
| react-responsive-pagination | 2.13    | Responsive pagination component |
| ESLint                      | 9       | Code linting                    |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/siddharth-stn/admin-panel.git

# Navigate into the project
cd admin-panel

# Install dependencies
npm install

# Create a .env file with your backend URL
echo "VITE_SERVER_URL=http://localhost:8000/" > .env

# Start the development server
npm run dev
```

### Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server with HMR   |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

---

## Features

### Sub Sub Category Management

The sub sub category feature provides three-level hierarchical categorization with advanced filtering and cascading dropdowns.

#### Key Features

- **Hierarchical Structure**: Parent Category → Sub Category → Sub Sub Category
- **Cascading Dropdowns**: Sub categories populate based on selected parent category
- **Advanced Filtering**: Filter by name, parent category, and sub category (Apply-only filtering)
- **Smart Dropdowns**: Real-time sub category population with Apply-only filter execution
- **Image Upload**: Click-to-upload image interface (no dedicated button)
- **Controlled Components**: Form state management with validation and error handling
- **Pagination**: Server-side pagination for large datasets
- **Bulk Actions**: Multi-select for status toggle and delete operations

#### Components

**AddSubSubCategory.jsx**

- Full CRUD operations (create/update based on URL params)
- Hierarchical dropdowns with real-time population
- Image upload with preview functionality
- Form validation and error handling
- Controlled component state management

**ViewSubSubCategory.jsx**

- Advanced filtering with cascading dropdowns (Apply-only filtering)
- Server-side pagination with real-time dropdown population
- Bulk selection and actions (status toggle, delete)
- Image display with fallback handling and error management
- Responsive table design with consistent UI patterns

#### API Integration

```javascript
// Get parent categories for dropdown
await axios.post("/api/backend/sub-sub-categories/parent-category");

// Get sub categories for selected parent
await axios.post("/api/backend/sub-sub-categories/sub-category", {
  parent_category_id: selectedParentId,
});

// Create/Update sub sub category
const formData = new FormData();
formData.append("parent_category_id", parentId);
formData.append("sub_category_id", subCategoryId);
formData.append("name", name);
formData.append("order", order);
formData.append("image", imageFile); // Optional

await axios.post("/api/backend/sub-sub-categories/create", formData);
```

#### User Experience

- **Intuitive Navigation**: Clear hierarchy with breadcrumb-like structure
- **Real-time Feedback**: Immediate dropdown population and form validation
- **Clean Interface**: Minimal design with focus on functionality
- **Consistent Patterns**: Same UI/UX patterns as other category modules

#### Technical Implementation

- **React Hooks**: useState, useEffect for state management
- **Axios**: HTTP client for API communication
- **React Router**: Navigation and URL parameter handling
- **Tailwind CSS**: Utility-first styling
- **iziToast**: User notifications
- **Lucide React**: Consistent iconography

### Product Management

The product feature is the most comprehensive module in the admin panel, featuring multi-level cascading dropdowns, multi-select fields, and dual image upload (single + gallery).

#### Key Features

- **3-Level Cascading Dropdowns**: Parent Category → Sub Category → Sub Sub Category, each level populating based on the previous selection
- **Multi-Select Fields**: Materials and Colors support multiple selections (hold Ctrl/Cmd)
- **Product Type & Best Selling**: Dropdown selectors for product classification (Featured/On Sale/New Arrivals) and best selling status (Yes/No)
- **Dual Image Upload**: Single main image + up to 12 gallery images with preview
- **Rich Product Details**: Product code, dimension, estimated delivery, short description, long description
- **Pricing**: Sale price and actual price fields
- **Full CRUD**: Create and update modes via URL params (`product/update/:id`)
- **Server-Side Pagination**: Page-based API calls with total page count
- **Filtering**: Filter by product name (text search) and parent category (dropdown)
- **Bulk Actions**: Multi-select checkboxes with select-all, bulk delete with confirmation dialog, bulk status toggle

#### Components

**AddProduct.jsx**

- 3-level cascading category dropdowns populated via API
- Multi-select for materials and colors (fetched from API on mount)
- Single image upload with preview + multiple image upload with gallery preview
- Client-side validation for all required fields with real-time error clearing
- FormData submission with multipart file uploads
- Edit mode: fetches product details with populated references, pre-fills all form fields including multi-selects

**ViewProduct.jsx**

- Product table with columns: Select, S.No., Name, Image, Category, Type, Sale Price, Actual Price, Order, Status, Action
- Server-side pagination via `react-responsive-pagination`
- Filter form with product name text input and parent category dropdown
- Checkbox bulk selection with select-all in table header
- Bulk delete with iziToast confirmation dialog (Yes/No)
- Bulk status toggle (Active/Inactive)
- Edit links navigating to `/product/update/:id`

#### API Integration

```javascript
// Fetch dropdown data on mount
await Promise.all([
  axios.post("/api/backend/products/parent-category"),
  axios.post("/api/backend/products/material"),
  axios.post("/api/backend/products/color"),
]);

// Cascading: fetch sub-categories when parent changes
await axios.post("/api/backend/products/sub-category", {
  parent_category_id: selectedParentId,
});

// Cascading: fetch sub-sub-categories when sub-category changes
await axios.post("/api/backend/products/sub-sub-category", {
  sub_category_id: selectedSubId,
});

// Create product with FormData (multipart)
const fd = new FormData();
fd.append("name", name);
fd.append("image", imageFile);           // single image
imageFiles.forEach(f => fd.append("images", f));  // multiple images
fd.append("color_ids", colorId);          // repeated for each selected
fd.append("material_ids", materialId);    // repeated for each selected
// ... all other fields
await axios.post("/api/backend/products/create", fd);

// View with pagination and filters
await axios.post("/api/backend/products/view", {
  page: 1,
  name: "search term",
  parent_category_id: "filter_id",
});
```

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
- Currently learning **Next.js** (2025-2026)

### Technical Skills

| Category        | Skills                                                                              |
| --------------- | ----------------------------------------------------------------------------------- |
| **Frontend**    | HTML, CSS, JavaScript, React.js, Next.js, Tailwind CSS, Svelte                      |
| **Backend**     | Node.js, Express.js, MongoDB, REST APIs, JWT Authentication                         |
| **Templating**  | Pug (Jade)                                                                          |
| **Tools**       | Git, GitHub, Vite, Webpack, ESLint                                                  |
| **Soft Skills** | Operational Strategy, Stakeholder Management, Crisis Resolution, Project Management |

### Coding Journey

| Period | Phase                | Focus                                               |
| ------ | -------------------- | --------------------------------------------------- |
| 2020   | Foundations          | HTML/CSS basics, The Odin Project                   |
| 2021   | Frontend Growth      | JavaScript, React, site replicas, games             |
| 2022   | Intermediate         | Form validation, testing, portfolio                 |
| 2023   | Backend & Full-Stack | Express APIs, authentication, Svelte, Namaste React |
| 2026   | Advanced             | Next.js, full-stack clones, MERN Stack, DSA, AI     |

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
