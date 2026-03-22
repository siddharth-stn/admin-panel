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
      className="flex px-5 py-4 text-gray-800 bg-white border-b"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center text-xl font-medium">
        {/* Always show Home as the starting point */}
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link>
        </li>

        {/* Map through the URL segments to create the rest of the breadcrumbs */}
        {pathSegments.map((segment, index) => {
          // Build the route for the link (e.g., "/dashboard/settings")
          const routeTo = `/${pathSegments.slice(0, index + 1).join("/")}`;

          // Check if this is the last item so we don't make it a clickable link
          const isLast = index === pathSegments.length - 1;

          // Capitalize the first letter for a cleaner look
          const formattedSegment =
            segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li key={routeTo}>
              <div className="flex items-center">
                {/* The slash separator */}
                <span className="mx-2 text-gray-400">/</span>

                {isLast ? (
                  // If it's the current page, just show text
                  <span className="text-gray-900 font-semibold">
                    {formattedSegment}
                  </span>
                ) : (
                  // If it's a parent page, make it a link
                  <Link
                    to={routeTo}
                    className="hover:text-blue-600 transition-colors"
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
