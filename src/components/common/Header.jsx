import { useLocation, Link } from "react-router";

export default function Header() {
  // 1. Get the current URL location
  const location = useLocation();

  // 2. Split the pathname into an array of segments, removing any empty strings
  // Example: "/dashboard/settings" becomes ["dashboard", "settings"]
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  return (
    <nav
      className="flex px-5 py-4 text-gray-800 bg-white dark:bg-gray-800 dark:text-white shadow-2xl z-99"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center text-xl font-medium">
        {/* Always show Home as the starting point */}
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Dashboard
          </Link>
        </li>

        {/* Map through the URL segments to create the rest of the breadcrumbs */}
        {pathSegments.map((segment, index) => {
          // Build the route for the link (e.g., "/dashboard/settings")
          const routeTo = `/${pathSegments.slice(0, index + 1).join("/")}`;

          // Non-clickable if it's the last segment OR a parent category (testimonial/choice)
          let isLast = index === pathSegments.length - 1;
          if (
            segment === "testimonial" ||
            segment === "choice" ||
            segment === "colour" ||
            segment === "material" ||
            segment === "category" ||
            segment === "sub-category" ||
            segment === "sub-sub-category" ||
            segment === "product"
          ) {
            isLast = true;
          }

          // Capitalize the first letter for a cleaner look
          const formattedSegment =
            segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li key={routeTo}>
              <div className="flex items-center">
                {/* Breadcrumb separator */}
                <span className="mx-2 text-gray-400 dark:text-gray-500">&gt;</span>

                {isLast ? (
                  // If it's the current page, just show text
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {formattedSegment}
                  </span>
                ) : (
                  // If it's a parent page, make it a link
                  <Link
                    to={routeTo}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {formattedSegment}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
