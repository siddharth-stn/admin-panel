# Theme Colors

Color reference for consistent styling across the Admin Panel.

---

## Sidebar (SidePanel)

### Light Mode

| Usage | Tailwind Class | Color |
|-------|---------------|-------|
| **Background** | `bg-white` | White |
| **Border** | `border-gray-200` | Light gray |
| **Text (default)** | `text-gray-900` | Near-black |
| **Text (active link)** | `text-blue-600` | Blue |
| **Background (active link)** | `bg-gray-100` | Very light gray |
| **Background (hover)** | `hover:bg-gray-100` | Very light gray |
| **Hamburger text** | `text-gray-500` | Medium gray |

### Dark Mode

| Usage | Tailwind Class | Color |
|-------|---------------|-------|
| **Background** | `dark:bg-gray-800` | Dark charcoal |
| **Border** | `dark:border-gray-700` | Medium-dark gray |
| **Text (default)** | `dark:text-white` | White |
| **Text (active link)** | `dark:text-blue-400` | Light blue |
| **Background (active link)** | `dark:bg-gray-700` | Medium-dark gray |
| **Background (hover)** | `dark:hover:bg-gray-700` | Medium-dark gray |

---

## Header (Breadcrumb)

| Usage | Tailwind Class | Color |
|-------|---------------|-------|
| **Background** | `bg-white` / `dark:bg-gray-800` | White / Dark charcoal |
| **Text** | `text-gray-800` / `dark:text-white` | Dark gray / White |
| **Link hover** | `hover:text-blue-600` / `dark:hover:text-blue-400` | Blue / Light blue |
| **Current page text** | `text-gray-900` / `dark:text-white` | Near-black / White |
| **Separator** | `text-gray-400` / `dark:text-gray-500` | Medium gray / Darker gray |

---

## Dashboard Stat Cards

| Card | Background (hex) | Text Color |
|------|------------------|------------|
| **Users** | `#5956D3` | White |
| **Product** | `#2998FE` | White |
| **Category** | `#FCB01D` | White |
| **Orders** | `#E95353` | White |

---

## Page Headers (Form/Table Headers)

| Usage | Tailwind Class | Color |
|-------|---------------|-------|
| **Background** | `bg-blue-600` / `dark:bg-blue-400` | Blue / Light blue |
| **Text** | `text-white` / `dark:text-white` | White |
| **Hover** | `hover:bg-blue-700` / `dark:hover:bg-blue-500` | Darker blue |
| **Border** | `border-gray-200` / `dark:border-gray-700` | Light gray / Medium-dark gray |

---

## Table (View Pages)

| Usage | Tailwind Class | Color |
|-------|---------------|-------|
| **Header border** | `border-b` | Bottom border |
| **Row border** | `border-b` | Bottom border |
| **Status (Active)** | `text-green-600 font-bold` | Green |
| **Status (Inactive)** | `text-red-600 font-bold` | Red |
| **Edit icon** | `text-yellow-400` | Yellow |

---

## Action Buttons (View Page Headers)

| Button | Tailwind Classes | Color |
|--------|-----------------|-------|
| **Filter** | `ring` + `hover:bg-amber-500 hover:ring-amber-400` | Amber on hover |
| **Delete All** | `ring-gray-800 bg-gray-500` + `hover:bg-amber-50 hover:text-black` | Gray → Light amber on hover |
| **Change Status** | `ring-gray-800 bg-gray-500` + `hover:bg-amber-50 hover:text-black` | Gray → Light amber on hover |

---

## Forms (Add Pages)

| Usage | Tailwind Class | Color |
|-------|---------------|-------|
| **Input border** | `border-gray-300` | Light gray |
| **Input focus ring** | `focus:ring-gray-500` | Medium gray |
| **Image placeholder bg** | `bg-gray-300` | Light gray |
| **Image placeholder icon** | `text-gray-500` | Medium gray |
| **Submit button** | `bg-blue-600 text-white` / `dark:bg-blue-400` | Blue / Light blue |
| **Submit hover** | `hover:bg-blue-700` / `dark:hover:bg-blue-500` | Darker blue |

---

## Quick Copy-Paste Patterns

**Default text:**
```
text-gray-900 dark:text-white
```

**Active state:**
```
bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400
```

**Hover state:**
```
hover:bg-gray-100 dark:hover:bg-gray-700
```

**Border/divider:**
```
border-gray-200 dark:border-gray-700
```

**Container background:**
```
bg-white dark:bg-gray-800
```

**Button (primary):**
```
bg-blue-600 text-white dark:bg-blue-400 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-500
```

**Link hover:**
```
hover:text-blue-600 dark:hover:text-blue-400
```

**Separator/muted text:**
```
text-gray-400 dark:text-gray-500
```

**Status Active:**
```
text-green-600 font-bold
```

**Status Inactive:**
```
text-red-600 font-bold
```

**Edit icon:**
```
text-yellow-400
```
