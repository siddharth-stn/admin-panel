import { SquarePen, Funnel } from "lucide-react";

// View Category page — displays categories in a table with image, order, status, and edit action
export default function ViewCategory() {
  return (
    <>
      <div className="form-wrapper mt-10 mx-5 rounded-xl overflow-auto shadow-2xl">
        {/* Header with title and action buttons */}
        <div className="form-header border border-gray-200 dark:border-gray-700 py-5 px-6 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-500">
          <div className="flex">
            <h3 className="text-2xl font-bold dark:text-white">
              View Category
            </h3>
            <div className="buttons ml-auto flex items-center gap-3">
              <button className="flex items-center gap-1 ring rounded py-2 px-3 cursor-pointer hover:bg-amber-500 hover:ring-amber-400">
                <Funnel size={16} />
                Filter
              </button>
              <button className="ring ring-gray-800 rounded bg-gray-500 py-2 px-3 cursor-pointer hover:bg-amber-50 hover:text-black">
                Delete All
              </button>
              <button className="ring ring-gray-800 rounded bg-gray-500 py-2 px-3 cursor-pointer hover:bg-amber-50 hover:text-black">
                Change Status
              </button>
            </div>
          </div>
        </div>
        {/* Category table — short content columns are center-aligned, text columns are left-aligned */}
        <div className="text-[18px]">
          <table className="w-full mt-2">
            <thead className="border-b">
              <tr>
                <th className="py-3 px-4 text-center text-nowrap">Select</th>
                <th className="py-3 px-4 text-center text-nowrap">S.No.</th>
                <th className="py-3 px-4 text-left text-nowrap">Name</th>
                <th className="py-3 px-4 text-center text-nowrap">Image</th>
                <th className="py-3 px-4 text-center text-nowrap">Order</th>
                <th className="py-3 px-4 text-center text-nowrap">Status</th>
                <th className="py-3 px-4 text-center text-nowrap">Action</th>
              </tr>
            </thead>
            {/* align-middle keeps all cells vertically centered when image makes row taller */}
            <tbody>
              <tr className="align-middle border-b">
                <td className="py-3 px-4 text-center">
                  <input type="checkbox" />
                </td>
                <td className="py-3 px-4 text-center">1</td>
                <td className="py-3 px-4 text-nowrap">Red</td>
                <td className="py-3 px-4 text-center">
                  <img
                    src="https://picsum.photos/id/237/200/300"
                    alt="lorem-picsum"
                    className="w-16 h-16 object-cover rounded inline-block"
                  />
                </td>
                <td className="py-3 px-4 text-center">1</td>
                <td className="py-3 px-4 text-center text-nowrap text-green-600 font-bold">
                  Active
                </td>
                <td className="pt-8 px-4 flex items-center justify-center text-yellow-400">
                  <SquarePen />
                </td>
              </tr>
              <tr className="align-middle border-b">
                <td className="py-3 px-4 text-center">
                  <input type="checkbox" />
                </td>
                <td className="py-3 px-4 text-center">1</td>
                <td className="py-3 px-4 text-nowrap">Red</td>
                <td className="py-3 px-4 text-center">
                  <img
                    src="https://picsum.photos/id/237/200/300"
                    alt="lorem-picsum"
                    className="w-16 h-16 object-cover rounded inline-block"
                  />
                </td>
                <td className="py-3 px-4 text-center">1</td>
                <td className="py-3 px-4 text-center text-nowrap text-red-600 font-bold">
                  Inactive
                </td>
                <td className="pt-8 px-4 flex items-center justify-center text-yellow-400">
                  <SquarePen />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
