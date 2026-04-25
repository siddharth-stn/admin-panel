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

#### State Management

The `AddProduct.jsx` component uses the following state hooks:

- **Form State** (`formData`): Manages all product fields including category dropdowns, materials, colors, pricing, descriptions, and metadata
- **Validation Errors** (`validationErrors`): Tracks real-time validation errors that clear immediately when the user corrects a field
- **Dropdown Data** (`categories`, `subCategories`, `subSubCategories`, `materials`, `colors`): API-fetched lists populated via `useEffect`
- **Image State** (`imageUrl`, `multiImageUrls`, `imagePath`): Manages single image preview (blob URL), gallery preview URLs, and server image path prefix

#### Form Validation Strategy

**Client-Side Validation** (Real-Time):

- All required fields validated before form submission
- Error messages cleared immediately when user corrects a field (`handleErrors()` function)
- Validation errors displayed inline below each form field
- Custom validation logic (not HTML5 validation) for fine-grained control

**Validation Rules**:

```javascript
// Required field checks
- parent_category_id must not be "default"
- sub_category_id must not be "default"
- sub_sub_category_id must not be "default"
- name (non-empty)
- product_type must not be "default"
- best_selling must not be "default"
- material_ids (at least one must be selected)
- color_ids (at least one must be selected)
- short_description (non-empty)
- long_description (non-empty)
- code (non-empty)
- dimension (non-empty)
- estimated_delivery (non-empty)
- sale_price (required)
- actual_price (required)
```

**Server-Side Error Integration**:

- After form submission, any server validation errors are captured and displayed
- Server errors merged with client-side validation for comprehensive feedback

#### Image Handling

**Single Image Upload**:

- Uses `URL.createObjectURL()` to generate a blob URL for real-time preview
- Preview displays before submission, improving UX
- In edit mode, displays existing server image using `imagePath` + `imageName`
- User can replace image by uploading a new one

**Multiple Image Upload** (Gallery):

- Allows up to 12 images for product gallery
- Each file generates its own blob URL for preview
- Gallery preview shows all selected images in a grid
- In edit mode, fetches and displays existing gallery images
- User can add more images to existing gallery during edit

**Image Rendering Helper**:

```javascript
const getImageSrc = (img) => {
  if (!img) return "";
  if (img.startsWith("blob:")) return img; // Preview
  const path = imagePath ? `http://${imagePath}` : `${BASE}uploads/product/`;
  return path + img; // Server image
};
```

#### Cascading Dropdown Logic

**Three-Level Cascade**:

1. **Parent Category** (Independent)
   - Fetched on component mount via `useEffect`
   - No dependencies (initial load only)
   - Marked with `// eslint-disable-next-line react-hooks/exhaustive-deps` due to external BASE URL

2. **Sub Category** (Depends on Parent)
   - Re-fetches when `parent_category_id` changes
   - Shows only subcategories of selected parent
   - Resets when parent changes: `sub_category_id: "default"`
   - Marked with `// eslint-disable-next-line react-hooks/exhaustive-deps`

3. **Sub Sub Category** (Depends on Sub)
   - Re-fetches when `sub_category_id` changes
   - Shows only sub-subcategories of selected sub-category
   - Resets when sub-category changes: `sub_sub_category_id: "default"`
   - Marked with `// eslint-disable-next-line react-hooks/exhaustive-deps`

**State Reset on Selection Change**:

```javascript
// Resetting cascading dropdowns to prevent invalid combinations
if (name === "parent_category_id") {
  setFormData((prev) => ({
    ...prev,
    parent_category_id: value,
    sub_category_id: "default", // Reset sub-category
    sub_sub_category_id: "default", // Reset sub-sub-category
  }));
} else if (name === "sub_category_id") {
  setFormData((prev) => ({
    ...prev,
    sub_category_id: value,
    sub_sub_category_id: "default", // Reset sub-sub-category only
  }));
}
```

#### Form Submission & FormData

**FormData Construction** (Multipart Form):

```javascript
const fd = new FormData();
fd.append("name", formData.name);
fd.append("product_type", formData.product_type);
fd.append("best_selling", formData.best_selling);
fd.append("parent_category_id", formData.parent_category_id);
fd.append("sub_category_id", formData.sub_category_id);
fd.append("sub_sub_category_id", formData.sub_sub_category_id);
fd.append("short_description", formData.short_description);
fd.append("long_description", formData.long_description);
fd.append("code", formData.code);
fd.append("dimension", formData.dimension);
fd.append("estimated_delivery", formData.estimated_delivery);
fd.append("sale_price", formData.sale_price);
fd.append("actual_price", formData.actual_price);

// Append multiple values for arrays
formData.color_ids.forEach((id) => fd.append("color_ids", id));
formData.material_ids.forEach((id) => fd.append("material_ids", id));

// Append files
const imageInput = form.querySelector('input[name="image"]');
if (imageInput?.files[0]) {
  fd.append("image", imageInput.files[0]);
}

const imagesInput = form.querySelector('input[name="images"]');
if (imagesInput?.files.length > 0) {
  Array.from(imagesInput.files).forEach((file) => {
    fd.append("images", file);
  });
}
```

**Create vs Update**:

```javascript
if (productId) {
  // Update mode: PUT with product ID from URL params
  response = await axios.put(
    `${BASE}api/backend/products/update/${productId}`,
    fd,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
} else {
  // Create mode: POST to create endpoint
  response = await axios.post(`${BASE}api/backend/products/create`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
```

#### Edit Mode Detection & Pre-Population

**URL-Based Edit Mode**:

- Uses `useParams().id` to detect if editing (`/product/update/:id`) or creating (`/product/add`)
- If `productId` exists, fetches product details via `axios.post()`
- Populates all form fields including multi-select arrays

**Reference Population Handling**:

```javascript
// Handle nested references from API (populated relations)
parent_category_id: d.parent_category_id?._id || d.parent_category_id || "default",
// For array references, extract IDs
material_ids: d.material_ids ? d.material_ids.map((m) => m._id || m) : [],
color_ids: d.color_ids ? d.color_ids.map((c) => c._id || c) : [],
```

#### API Integration

```javascript
// Fetch dropdown data on mount (Initial Load)
// eslint-disable-next-line react-hooks/exhaustive-deps
await Promise.all([
  axios.post(`${BASE}api/backend/products/parent-category`),
  axios.post(`${BASE}api/backend/products/material`),
  axios.post(`${BASE}api/backend/products/color`),
]);

// Cascading: fetch sub-categories when parent changes
// eslint-disable-next-line react-hooks/exhaustive-deps
await axios.post(`${BASE}api/backend/products/sub-category`, {
  parent_category_id: formData.parent_category_id,
});

// Cascading: fetch sub-sub-categories when sub-category changes
// eslint-disable-next-line react-hooks/exhaustive-deps
await axios.post(`${BASE}api/backend/products/sub-sub-category`, {
  sub_category_id: formData.sub_category_id,
});

// Get product details for editing
await axios.post(`${BASE}api/backend/products/details/${productId}`);

// Create product with FormData (multipart)
await axios.post(`${BASE}api/backend/products/create`, fd, {
  headers: { "Content-Type": "multipart/form-data" },
});

// Update product with FormData
await axios.put(`${BASE}api/backend/products/update/${productId}`, fd, {
  headers: { "Content-Type": "multipart/form-data" },
});
```

#### Error Handling & Notifications

**Client-Side Validation**:

- Comprehensive pre-submission checks with user-friendly error messages
- Real-time error clearing as user corrects fields
- Prevents form submission until all validations pass

**Server Validation Integration**:

- Captures server response status and error messages
- Displays server validation errors alongside client-side errors
- Shows success/error toast notifications using iziToast

**Toast Notifications**:

```javascript
// Success notification
iziToast.success({
  message: "Product added successfully",
  position: "topCenter",
});

// Error notification
iziToast.error({ message: "Failed to add product", position: "topCenter" });
```

#### Recent Code Quality Improvements

**ESLint Compliance**:

- Fixed React Hook dependency array warnings by adding appropriate `eslint-disable-next-line` comments
- `BASE` URL is an external dependency (environment variable) that doesn't need to be included in dependency arrays
- Tailwind CSS class names optimized (`min-h-[100px]` → `min-h-25`)

**Best Practices Applied**:

- Controlled components throughout the form
- Proper state management with `useState` and `useEffect`
- Efficient API calls using `Promise.all()` for parallel requests
- Clean code comments for maintainability
- Responsive design with Tailwind CSS utilities

---

## Implementation Patterns & Best Practices

### Form Management Pattern

All form components in this admin panel follow a consistent pattern for form management, validation, and submission:

1. **State Management**: Use `useState` to manage form data and validation errors separately
2. **Controlled Components**: All inputs are controlled components with `value` and `onChange` handlers
3. **Validation**: Real-time, client-side validation with server-side error integration
4. **Error Display**: Inline error messages below form fields with red text styling
5. **Reset Logic**: Form reset after successful submission (for add mode only)

**Key Implementation Details**:

- Validation errors are tracked in a separate state object
- Errors clear in real-time as user corrects fields (via `handleErrors()`)
- Server validation errors are merged with client-side errors
- Images use blob URLs (`URL.createObjectURL`) for instant preview before upload

### Edit Mode Detection Pattern

Components that support both Add and Edit modes use the following pattern:

1. **Route Setup**: `add` route for creation, `update/:id` route for editing
2. **Detection**: Use `useParams().id` to determine mode
3. **Data Fetching**: Use `useEffect` with `productId` dependency to fetch existing data
4. **Population**: Pre-fill all form fields when in edit mode, including nested references
5. **Server Requests**: Use `axios.post()` for create, `axios.put()` for update

### Multi-Level Cascading Dropdown Pattern

Components with hierarchical data (Product Categories, Sub Categories) use cascading dropdowns:

1. **Parent Level**: Fetch on component mount (independent)
2. **Child Level**: Fetch when parent changes, reset on change
3. **Grandchild Level**: Fetch when child changes, reset on change
4. **Data Management**: Store each level in separate state arrays
5. **Disabled State**: Child/grandchild dropdowns disabled until parent/child is selected

### Image Upload Pattern

Two image upload patterns are used depending on requirements:

**Single Image Upload** (Categories, etc.):

- File input with single `accept="image/*"` attribute
- Preview using `URL.createObjectURL()` for instant display
- Display server image during edit using `imagePath` prefix
- Clear distinction between new blob URLs and server paths in `getImageSrc()`

**Multiple Image Upload** (Products):

- File input with `multiple` attribute
- Array of blob URLs for gallery preview
- Handle both adding new images and keeping existing ones during edit
- Append all selected files to FormData with same field name

### Bulk Operations Pattern

View pages that support bulk operations follow this pattern:

1. **Selection State**: Maintain array of selected record IDs
2. **Checkbox UI**: Checkboxes in table rows + select-all in header
3. **Button State**: Disable bulk action buttons when no rows selected
4. **Confirmation**: Show iziToast confirmation dialog for destructive actions (delete)
5. **Batch API Calls**: Send array of IDs to backend endpoint

### Component Architecture

**Layout Structure**:

```
CommonLayout (Grid: sidebar | header + content)
├── SidePanel (Navigation)
├── Header (Breadcrumbs)
└── Outlet (Page content)
    ├── Dashboard
    ├── Add/View Module Pages
    │   ├── AddCategory/ViewCategory
    │   ├── AddProduct/ViewProduct
    │   └── ... (others follow same pattern)
    └── Nested routes for each module
```

**Naming Conventions**:

- Components: PascalCase (`AddProduct.jsx`, `ViewCategory.jsx`)
- Pages: Organized by module in `src/pages/` directory
- State variables: camelCase (`formData`, `validationErrors`, `categories`)
- Event handlers: `handle*` prefix (`handleInputChange`, `handleSubmit`)

---

## Configuration & Environment Setup

### Environment Variables

Create a `.env` file in the project root:

```bash
VITE_SERVER_URL=http://localhost:8000/
```

This variable is used throughout the app for API endpoints:

```javascript
const BASE = import.meta.env.VITE_SERVER_URL;
// Usage: axios.post(`${BASE}api/backend/products/create`)
```

### Image Upload Configuration

The backend must serve static files from the `/uploads` directory:

```javascript
// Backend (Express example)
app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));
```

Images are then accessible via: `http://localhost:8000/uploads/product/image-name.jpg`

---

## Common Issues & Solutions

### Cascading Dropdown Not Populating

**Issue**: Sub-category dropdown not showing options after parent selection

**Solution**:

- Verify parent category ID is being sent correctly to API
- Check API endpoint is returning data with `_status: true`
- Ensure `useEffect` dependency array includes the correct parent field
- Verify no errors in network tab of DevTools

### Image Preview Not Showing

**Issue**: Image doesn't display after upload

**Solution**:

- Check if using blob URL (for preview) or server URL (for existing images)
- Verify `imagePath` is set correctly from server response
- Ensure backend serves static files with correct CORS headers
- Check browser console for 404 errors on image requests

### Form Validation Errors Not Clearing

**Issue**: Error messages persist even after user corrects field

**Solution**:

- Verify `handleErrors()` is called in `handleInputChange`
- Check error state is being cleared: `delete newErrors[name]`
- Ensure input `onChange` handler is properly connected

### Multi-Select Not Working on Edit

**Issue**: Pre-selected materials/colors not showing in multi-select

**Solution**:

- Verify mapping logic extracts IDs correctly: `d.material_ids.map((m) => m._id || m)`
- Check state is being set with array of IDs, not objects
- Ensure `<option>` values match the IDs in the form state

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
