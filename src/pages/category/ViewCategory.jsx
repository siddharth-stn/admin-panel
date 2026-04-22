import axios from "axios";
import iziToast from "izitoast";
import { SquarePen, Funnel } from "lucide-react";
import { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";

// View Category page — displays categories in a table with image, order, status, and edit action
export default function ViewCategory() {
  const [openFilterForm, setOpenFilterForm] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [selectedRecord, setSelectedRecord] = useState([]);
  const [categories, setCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.post(
          "http://localhost:8000/api/backend/categories/view",
          { page: currentPage },
        );

        if (result.data._status === true) {
          setCategories(result.data._data);
          setTotalPages(result.data._paginate.total_pages);
        } else {
          setCategories([]);
          setTotalPages(0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [currentPage]);

  return (
    <>
      <div className="form-wrapper mt-10 mx-5 rounded-xl overflow-auto shadow-2xl">
        {/* Header with title and action buttons */}
        {openFilterForm && (
          <div className="filterForm mb-4 w-full p-2 border-2 border-black relative">
            <div
              className="cursor-pointer closeFormBtn absolute right-7.5 font-extrabold border rounded-[50%] w-10 h-10 p-1 flex justify-center items-center"
              onClick={(e) => {
                e.target.closest(".filterForm").querySelector("form").reset();
                setOpenFilterForm((prev) => !prev);
              }}
            >
              x
            </div>
            <h5 className="text-xl font-bold dark:text-white">Filter</h5>
            <form className="flex flex-col gap-2">
              <label htmlFor="categoryName">Category Name</label>
              <input
                className="border border-gray-700 w-55 p-2"
                type="text"
                placeholder="Enter Category Name"
                id="categoryName"
              />
              <div className="flex gap-5">
                <button
                  className="border border-amber-500 py-2 px-3 rounded bg-amber-400 text-white font-bold hover:text-black hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.target.closest("form").reset();
                  }}
                >
                  Clear
                </button>
                <button
                  className="border border-pink-900 py-2 px-3 rounded bg-pink-300 text-white font-bold hover:text-black hover:bg-white"
                  onClick={(e) => e.preventDefault()}
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="form-header border border-gray-200 dark:border-gray-700 py-5 px-6 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-500">
          <div className="flex">
            <h3 className="text-2xl font-bold dark:text-white">
              View Category
            </h3>
            <div className="buttons ml-auto flex items-center gap-3">
              <button
                className="flex items-center gap-1 ring rounded py-2 px-3 cursor-pointer hover:bg-amber-500 hover:ring-amber-400"
                onClick={() => setOpenFilterForm((prev) => !prev)}
              >
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
              {categories.length > 0 ? (
                categories.map((element, index) => {
                  return (
                    <tr className="align-middle border-b" key={index}>
                      <td className="py-3 px-4 text-center">
                        <input type="checkbox" />
                      </td>
                      <td className="py-3 px-4 text-center">{index + 1}</td>
                      <td className="py-3 px-4 text-nowrap">{element.name}</td>
                      <td className="py-3 px-4 text-center">
                        <img
                          src={
                            import.meta.env.VITE_SERVER_URL +
                            "uploads/category/" +
                            element.image
                          }
                          alt="lorem-picsum"
                          className="w-16 h-16 object-cover rounded inline-block"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">{element.order}</td>
                      <td className="py-3 px-4 text-center text-nowrap text-green-600 font-bold">
                        {element.status ? (
                          "Active"
                        ) : (
                          <span className="text-red-600">Inactive</span>
                        )}
                      </td>
                      <td className="pt-8 px-4 flex items-center justify-center text-yellow-400">
                        <SquarePen />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="border-b">
                  <td className="py-3 px-4 text-center" colSpan={7}>
                    खल्लास मामला है!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-8 mb-30">
            <ResponsivePagination
              current={currentPage}
              total={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
