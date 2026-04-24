import axios from "axios";
import { SquarePen, Funnel } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Pagination from "react-responsive-pagination";

// View Sub Sub Category page — displays sub sub categories in a table with parent category, sub category, image, order, status, and edit action
export default function ViewSubSubCategory() {
  const [openFilterForm, setOpenFilterForm] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [selectedRecord, setSelectedRecord] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Fetch categories for the filter dropdown
  useEffect(() => {
    async function fetchCategories() {
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}api/backend/sub-sub-categories/parent-category`,
        );
        if (result.data._status === true) {
          setCategories(result.data._data || []);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    }
    fetchCategories();
  }, []);

  // Fetch sub categories when parent category filter changes
  useEffect(() => {
    async function fetchSubCategories() {
      console.log(
        "Filter: Fetching sub categories for parent:",
        filterData.parent_category_id,
      );
      if (
        filterData.parent_category_id &&
        filterData.parent_category_id !== ""
      ) {
        try {
          const result = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}api/backend/sub-sub-categories/sub-category`,
            { parent_category_id: filterData.parent_category_id },
          );
          console.log("Filter: Sub categories API response:", result.data);
          if (result.data._status === true) {
            setSubCategories(result.data._data || []);
            console.log("Filter: Sub categories set:", result.data._data);
          }
        } catch (error) {
          console.error("Filter: Failed to fetch sub categories", error);
        }
      } else {
        setSubCategories([]);
        console.log("Filter: Sub categories cleared");
      }
    }
    fetchSubCategories();
  }, [filterData.parent_category_id]);

  const changeStatus = async () => {
    if (selectedRecord.length > 0) {
      try {
        const result = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}api/backend/sub-sub-categories/toggle-status`,
          {
            id: selectedRecord,
          },
        );

        if (result.data._status === true) {
          setStatus(!status);
          setSelectedRecord([]);
        }
      } catch (error) {
        console.error("Failed to change status", error);
      }
    }
  };

  const deleteRecord = async () => {
    if (selectedRecord.length > 0) {
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}api/backend/sub-sub-categories/delete`,
          {
            id: selectedRecord,
          },
        );

        if (result.data._status === true) {
          setStatus(!status);
          setSelectedRecord([]);
        }
      } catch (error) {
        console.error("Failed to delete records", error);
      }
    }
  };

  const handleRecordSelect = (id) => {
    if (selectedRecord.includes(id)) {
      setSelectedRecord([...selectedRecord.filter((item) => item !== id)]);
    } else {
      setSelectedRecord([...selectedRecord, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = subSubCategories.map((item) => item._id);
      setSelectedRecord(allIds);
    } else {
      setSelectedRecord([]);
    }
  };

  const applyFilter = (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    const obj = {
      name: form.subSubCategoryName.value,
      parent_category_id: form.parentCategory.value,
      sub_category_id: form.subCategory.value,
    };

    console.log("Filter: Applying filter with data:", obj);
    setFilterData(obj);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchSubSubCategories = async () => {
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}api/backend/sub-sub-categories/view`,
          {
            page: currentPage,
            name: filterData.name,
            parent_category_id: filterData.parent_category_id,
            sub_category_id: filterData.sub_category_id,
          },
        );

        console.log("API Response:", result.data);

        if (result.data._status === true) {
          setSubSubCategories(result.data._data);
          setTotalPages(result.data._paginate.total_pages);
        } else {
          setSubSubCategories([]);
          setTotalPages(0);
        }
      } catch (error) {
        console.error("Failed to fetch sub sub categories", error);
        setSubSubCategories([]);
        setTotalPages(0);
      }
    };

    fetchSubSubCategories();
  }, [currentPage, filterData, status]);

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
            <h5 className="text-xl font-bold">Filter ---&gt;</h5>
            <form className="flex flex-col gap-5">
              <div className="flex gap-6">
                <label
                  htmlFor="subSubCategoryName"
                  className="flex flex-col gap-2"
                >
                  <span>Sub Sub Category Name</span>
                  <input
                    className="border border-gray-700 w-55 p-2"
                    name="subSubCategoryName"
                    type="text"
                    placeholder="Enter Sub Sub Category Name"
                    id="subSubCategoryName"
                  />
                </label>
                <label htmlFor="parentCategory" className="flex flex-col gap-2">
                  <span>Parent Category</span>
                  <select
                    className="border border-gray-700 w-55 p-2"
                    name="parentCategory"
                    id="parentCategory"
                    onChange={(e) => {
                      const parentId = e.target.value;
                      console.log(
                        "Filter: Parent category changed to:",
                        parentId,
                      );
                      setFilterData((prev) => ({
                        ...prev,
                        parent_category_id: parentId,
                        sub_category_id: "",
                      }));
                    }}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="subCategory" className="flex flex-col gap-2">
                  <span>Sub Category</span>
                  <select
                    className="border border-gray-700 w-55 p-2"
                    name="subCategory"
                    id="subCategory"
                    disabled={!filterData.parent_category_id}
                  >
                    <option value="">All Sub Categories</option>
                    {subCategories.map((subCat) => (
                      <option key={subCat._id} value={subCat._id}>
                        {subCat.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="flex gap-5">
                <button
                  className="border border-amber-500 py-2 px-3 rounded bg-amber-400 text-white font-bold hover:text-black hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.target.closest("form").reset();
                    setFilterData({});
                    setSubCategories([]);
                  }}
                >
                  Clear
                </button>
                <button
                  className="border border-pink-900 py-2 px-3 rounded bg-pink-300 text-white font-bold hover:text-black hover:bg-white"
                  onClick={(e) => {
                    applyFilter(e);
                  }}
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
              View Sub Sub Category
            </h3>
            <div className="buttons ml-auto flex items-center gap-3">
              <button
                onClick={() => setOpenFilterForm((prev) => !prev)}
                className="flex items-center gap-1 ring rounded py-2 px-3 cursor-pointer hover:bg-amber-500 hover:ring-amber-400"
              >
                <Funnel size={16} />
                Filter
              </button>
              <button
                disabled={selectedRecord.length === 0}
                className="ring ring-gray-800 rounded bg-gray-500 py-2 px-3 cursor-pointer not-disabled:hover:bg-amber-50 not-disabled:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={deleteRecord}
              >
                Delete All
              </button>
              <button
                disabled={selectedRecord.length === 0}
                className="ring ring-gray-800 rounded bg-gray-500 py-2 px-3 cursor-pointer not-disabled:hover:bg-amber-50 not-disabled:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={changeStatus}
              >
                Change Status
              </button>
            </div>
          </div>
        </div>

        {/* Sub Sub Category table */}
        <div className="text-[18px]">
          <table className="w-full mt-2">
            <thead className="border-b">
              <tr>
                <th className="py-3 px-4 text-center text-nowrap">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selectedRecord.length === subSubCategories.length &&
                      subSubCategories.length > 0
                    }
                  />
                </th>
                <th className="py-3 px-4 text-center text-nowrap">S.No.</th>
                <th className="py-3 px-4 text-left text-nowrap">Name</th>
                <th className="py-3 px-4 text-left text-nowrap">
                  Parent Category
                </th>
                <th className="py-3 px-4 text-left text-nowrap">
                  Sub Category
                </th>
                <th className="py-3 px-4 text-center text-nowrap">Image</th>
                <th className="py-3 px-4 text-center text-nowrap">Order</th>
                <th className="py-3 px-4 text-center text-nowrap">Status</th>
                <th className="py-3 px-4 text-center text-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {subSubCategories.length > 0 ? (
                subSubCategories.map((subSubCategory, index) => (
                  <tr
                    key={subSubCategory._id}
                    className="align-middle border-b"
                  >
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRecord.includes(subSubCategory._id)}
                        onChange={() => handleRecordSelect(subSubCategory._id)}
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>
                    <td className="py-3 px-4 text-nowrap">
                      {subSubCategory.name}
                    </td>
                    <td className="py-3 px-4 text-nowrap">
                      {subSubCategory.parent_category_id?.name || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-nowrap">
                      {subSubCategory.sub_category_id?.name || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {subSubCategory.image ? (
                        <img
                          src={`${import.meta.env.VITE_SERVER_URL}uploads/category/${subSubCategory.image}`}
                          alt={subSubCategory.name}
                          className="w-16 h-16 object-cover rounded"
                          onLoad={() =>
                            console.log(
                              "Image loaded successfully:",
                              subSubCategory.image,
                            )
                          }
                          onError={(e) => {
                            console.error(
                              "Image failed to load:",
                              subSubCategory.image,
                            );
                            console.error(
                              "Image URL:",
                              `${import.meta.env.VITE_SERVER_URL}uploads/category/${subSubCategory.image}`,
                            );
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs"
                        style={{
                          display: subSubCategory.image ? "none" : "flex",
                        }}
                      >
                        No Image
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {subSubCategory.order}
                    </td>
                    <td className="py-3 px-4 text-center text-nowrap font-bold">
                      {subSubCategory.status ? (
                        <span className="text-green-600">Active</span>
                      ) : (
                        <span className="text-red-600">Inactive</span>
                      )}
                    </td>
                    <td className="pt-8 px-4 flex items-center justify-center text-yellow-400">
                      <Link
                        to={`/sub-sub-category/update/${subSubCategory._id}`}
                      >
                        <SquarePen />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 pb-4">
            <Pagination
              current={currentPage}
              total={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </>
  );
}
