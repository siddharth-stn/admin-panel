import axios from "axios";
import { ImageUp } from "lucide-react";
import iziToast from "izitoast";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

// Add Sub Category page — form with parent category dropdown, image upload, name, and order
export default function AddSubCategory() {
  const [validationErrors, setValidationErrors] = useState({});
  const [categories, setCategories] = useState([]); // State for parent categories dropdown
  const [subCategoryDetails, setSubCategoryDetails] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // Form field states for controlled components
  const [formData, setFormData] = useState({
    parent_category_id: "default",
    name: "",
    order: "",
  });

  const subCategoryId = useParams().id;

  // 1. Fetch Parent Categories for the dropdown
  useEffect(() => {
    async function fetchCategories() {
      try {
        // Adjust this endpoint if your route to fetch all categories is different
        const result = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}api/backend/sub-categories/parent-category`,
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

  // Handle form state - fetch details for update, reset for add
  useEffect(() => {
    if (subCategoryId) {
      // Update mode: fetch subcategory details
      async function getSubCategoryDetails() {
        try {
          const result = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}api/backend/sub-categories/details/${subCategoryId}`,
          );

          if (result.data._status === true) {
            console.log("SubCategory details fetched:", result.data);
            setSubCategoryDetails(result);
            // Populate form data for update mode
            setFormData({
              parent_category_id: result.data._data.parent_category_id,
              name: result.data._data.name,
              order: result.data._data.order,
            });
          }
        } catch (error) {
          console.error(error);
          iziToast.error({
            title: "Error",
            message: "Something went wrong fetching sub-category details!",
            position: "topRight",
          });
        }
      }

      getSubCategoryDetails();
    } else {
      // Add mode: reset form state using setTimeout to avoid synchronous setState
      setTimeout(() => {
        setSubCategoryDetails(null);
        setImageUrl(null);
        setValidationErrors({});
        setFormData({
          parent_category_id: "default",
          name: "",
          order: "",
        });
      }, 0);
    }
  }, [subCategoryId]);

  const handleImagePreview = (fileObj) => {
    if (fileObj) {
      const imageUrlObj = URL.createObjectURL(fileObj);
      console.log("Image preview created:", imageUrlObj);
      setImageUrl(imageUrlObj);
    }
  };

  const handleErrors = (fieldName) => {
    setValidationErrors((prev) => {
      const updated = { ...prev };
      delete updated[fieldName];
      return updated;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    handleErrors(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = {};

    // Only mandate image if creating new (no existing details)
    if (!imageUrl && !subCategoryId) {
      errors.image = true;
    }
    if (
      !formData.get("parent_category_id") ||
      formData.get("parent_category_id") === "default"
    ) {
      errors.parent_category_id = true;
    }
    if (!formData.get("name")) {
      errors.name = true;
    }
    if (!formData.get("order")) {
      errors.order = true;
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      let result;
      if (subCategoryId) {
        result = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}api/backend/sub-categories/update/${subCategoryId}`,
          formData,
        );
      } else {
        result = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}api/backend/sub-categories/create`,
          formData,
        );
      }

      if (result.data._status) {
        iziToast.success({
          title: "Successful",
          message: result.data._message,
          position: "topRight",
        });
      } else {
        const message = result.data._error
          ? Object.values(result.data._error).join(", ")
          : result.data._message;
        iziToast.warning({
          title: "कुछ तो गड़बड़ है दया!",
          message: message,
          position: "topRight",
        });
      }
    } catch (error) {
      iziToast.error({
        title: "घनि मिस्टेक कित्ता पाई!",
        message: error.message,
        position: "topRight",
      });
    }
  };

  return (
    <>
      <div className="form-wrapper mt-10 mx-5 rounded-xl overflow-auto shadow-2xl">
        <div className="form-header border border-gray-200 dark:border-gray-700 py-5 px-6 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-500">
          <h3 className="text-2xl font-bold dark:text-white">
            {subCategoryId ? "Update Sub Category" : "Add New Sub Category"}
          </h3>
        </div>
        <form
          key={subCategoryId}
          noValidate
          onSubmit={handleSubmit}
          className="formContent flex px-5 py-4 text-[18px] gap-5"
        >
          <label
            htmlFor="imageUpload"
            className="image-wrapper flex flex-col gap-3 max-w-1/4 cursor-pointer"
          >
            <span className="ms-3">Image Upload</span>
            <figure className="bg-gray-300 h-60 w-60 rounded-xl p-2 relative">
              {imageUrl ||
              (subCategoryDetails && subCategoryDetails.data._data?.image) ? (
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={
                    imageUrl
                      ? imageUrl
                      : import.meta.env.VITE_SERVER_URL +
                        "uploads/category/" +
                        subCategoryDetails.data._data.image
                  }
                  alt="uploaded image"
                />
              ) : (
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
                  <ImageUp size={90} className="text-gray-500" />
                </div>
              )}
              <input
                id="imageUpload"
                name="image"
                type="file"
                className="absolute hidden"
                accept="image/*"
                onChange={(e) => {
                  handleImagePreview(e.target.files[0]);
                  handleErrors("image");
                }}
              />
            </figure>
            {validationErrors.image && (
              <span className="text-red-600 text-sm ms-2">Upload Image</span>
            )}
          </label>
          <div className="textContent-wrapper w-full mb-10">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="categoryId">Select Parent Category</label>
                <select
                  id="categoryId"
                  name="parent_category_id"
                  onChange={handleInputChange}
                  value={formData.parent_category_id}
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="default" disabled>
                    Select Category
                  </option>
                  {/* Map through fetched categories */}
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {validationErrors.parent_category_id && (
                  <span className="text-sm text-red-500 ms-2">
                    Please select a parent category
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="name">Sub Category Name</label>
                <input
                  onChange={handleInputChange}
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  id="name"
                  placeholder="Enter category name"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {validationErrors.name && (
                  <span className="text-sm text-red-500 ms-2">
                    Enter sub category name
                  </span>
                )}
              </div>

              <div className="flex gap-5">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="order">Order</label>
                  <input
                    onChange={handleInputChange}
                    required
                    name="order"
                    value={formData.order}
                    type="number"
                    id="order"
                    placeholder="Enter order number"
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  {validationErrors.order && (
                    <span className="text-red-600 text-sm ms-2">
                      Enter order quantity
                    </span>
                  )}
                </div>
              </div>

              <div className="self-end mr-10 border border-gray-200 dark:border-gray-700 py-2 px-4 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-500">
                <button type="submit" className="cursor-pointer">
                  {subCategoryId ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
