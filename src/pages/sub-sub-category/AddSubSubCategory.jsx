import axios from "axios";
import { ImageUp } from "lucide-react";
import iziToast from "izitoast";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

// Add Sub Sub Category page — form with parent category + sub category dropdowns, image upload, name, and order
export default function AddSubSubCategory() {
  const [validationErrors, setValidationErrors] = useState({});
  const [categories, setCategories] = useState([]); // State for parent categories dropdown
  const [subCategories, setSubCategories] = useState([]); // State for sub categories dropdown
  const [imageUrl, setImageUrl] = useState(null);

  // Form field states for controlled components
  const [formData, setFormData] = useState({
    parent_category_id: "default",
    sub_category_id: "default",
    name: "",
    order: "",
  });

  const subSubCategoryId = useParams().id;

  // 1. Fetch Parent Categories for the dropdown
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

  // 2. Fetch Sub Categories when parent category changes
  useEffect(() => {
    async function fetchSubCategories() {
      console.log(
        "Fetching sub categories for parent:",
        formData.parent_category_id,
      );
      if (
        formData.parent_category_id &&
        formData.parent_category_id !== "default"
      ) {
        try {
          const result = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}api/backend/sub-sub-categories/sub-category`,
            { parent_category_id: formData.parent_category_id },
          );
          console.log("Sub categories API response:", result.data);
          if (result.data._status === true) {
            setSubCategories(result.data._data || []);
            console.log("Sub categories set:", result.data._data);
          }
        } catch (error) {
          console.error("Failed to fetch sub categories", error);
        }
      } else {
        setSubCategories([]);
        console.log("Sub categories cleared");
      }
    }
    fetchSubCategories();
  }, [formData.parent_category_id]);

  // Handle form state - fetch details for update, reset for add
  useEffect(() => {
    if (subSubCategoryId) {
      // Update mode: fetch sub sub category details
      async function getSubSubCategoryDetails() {
        try {
          const result = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}api/backend/sub-sub-categories/details/${subSubCategoryId}`,
          );

          console.log("Sub Sub Category Details:", result.data);

          if (result.data._status === true) {
            const details = result.data._data;
            setImageUrl(details.image);

            // Populate form with existing data
            setFormData({
              parent_category_id:
                details.parent_category_id._id || details.parent_category_id,
              sub_category_id:
                details.sub_category_id._id || details.sub_category_id,
              name: details.name,
              order: details.order,
            });

            // Fetch sub categories for the selected parent category
            if (details.parent_category_id._id || details.parent_category_id) {
              const parentCategoryId =
                details.parent_category_id._id || details.parent_category_id;
              try {
                const subResult = await axios.post(
                  `${import.meta.env.VITE_SERVER_URL}api/backend/sub-sub-categories/sub-category`,
                  { parent_category_id: parentCategoryId },
                );
                if (subResult.data._status === true) {
                  setSubCategories(subResult.data._data || []);
                }
              } catch (error) {
                console.error("Failed to fetch sub categories for edit", error);
              }
            }
          }
        } catch (error) {
          console.error("Failed to fetch sub sub category details", error);
          iziToast.error({
            message: "Failed to fetch sub sub category details",
            position: "topCenter",
          });
        }
      }
      getSubSubCategoryDetails();
    } else {
      // Add mode: reset form
      setTimeout(() => {
        setFormData({
          parent_category_id: "default",
          sub_category_id: "default",
          name: "",
          order: "",
        });
        setImageUrl(null);
      }, 0);
    }
  }, [subSubCategoryId]);

  // Handle input changes for controlled components
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Reset sub category when parent category changes
    if (name === "parent_category_id") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        sub_category_id: "default", // Reset sub category selection
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    handleErrors(name);
  };

  // Handle validation errors
  const handleErrors = (name) => {
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (
      !formData.parent_category_id ||
      formData.parent_category_id === "default"
    ) {
      errors.parent_category_id = "Please select a parent category";
    }
    if (!formData.sub_category_id || formData.sub_category_id === "default") {
      errors.sub_category_id = "Please select a sub category";
    }
    if (!formData.name.trim()) {
      errors.name = "Sub sub category name is required";
    }
    if (!formData.order.trim()) {
      errors.order = "Order is required";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const form = e.target;
      const formDataToSend = new FormData();

      // Add form fields
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== "default") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add image if exists
      const imageInput = form.querySelector('input[type="file"]');
      if (imageInput && imageInput.files[0]) {
        formDataToSend.append("image", imageInput.files[0]);
      }

      let response;
      if (subSubCategoryId) {
        // Update mode
        response = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}api/backend/sub-sub-categories/update/${subSubCategoryId}`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
      } else {
        // Create mode
        response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}api/backend/sub-sub-categories/create`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
      }

      if (response.data._status === true) {
        iziToast.success({
          message: response.data._message,
          position: "topCenter",
        });

        // Reset form for add mode
        if (!subSubCategoryId) {
          form.reset();
          setFormData({
            parent_category_id: "default",
            sub_category_id: "default",
            name: "",
            order: "",
          });
          setImageUrl(null);
          setSubCategories([]);
        }
      } else {
        if (response.data._error) {
          setValidationErrors(response.data._error);
        }
        iziToast.error({
          message: response.data._message || "Something went wrong",
          position: "topCenter",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      iziToast.error({
        message: "Something went wrong",
        position: "topCenter",
      });
    }
  };

  return (
    <>
      <div className="form-wrapper mt-10 mx-5 rounded-xl overflow-auto shadow-2xl">
        <div className="form-header border border-gray-200 dark:border-gray-700 py-5 px-6 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-500">
          <h3 className="text-2xl font-bold dark:text-white">
            {subSubCategoryId
              ? "Update Sub Sub Category"
              : "Add New Sub Sub Category"}
          </h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="formContent flex px-5 py-4 text-[18px] gap-5"
        >
          <label
            htmlFor="imageUpload"
            className="image-wrapper flex flex-col gap-3 max-w-1/4 cursor-pointer"
          >
            <span className="ms-3">Image Upload</span>
            <figure className="bg-gray-300 h-60 w-60 rounded-xl p-2 relative">
              {imageUrl ? (
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={
                    imageUrl.startsWith("blob:")
                      ? imageUrl
                      : `${import.meta.env.VITE_SERVER_URL}uploads/category/${imageUrl}`
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
                onChange={handleImageUpload}
              />
            </figure>
            {validationErrors.image && (
              <span className="text-red-600 text-sm ms-2">Upload Image</span>
            )}
          </label>
          <div className="textContent-wrapper w-full mb-10">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="parent_category_id">
                  Select Parent Category
                </label>
                <select
                  id="parent_category_id"
                  name="parent_category_id"
                  value={formData.parent_category_id}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="default">Select Parent Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {validationErrors.parent_category_id && (
                  <span className="text-red-600 text-sm ms-2">
                    {validationErrors.parent_category_id}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="sub_category_id">Select Sub Category</label>
                <select
                  id="sub_category_id"
                  name="sub_category_id"
                  value={formData.sub_category_id}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  disabled={
                    !formData.parent_category_id ||
                    formData.parent_category_id === "default"
                  }
                >
                  <option value="default">Select Sub Category</option>
                  {subCategories.map((subCat) => (
                    <option key={subCat._id} value={subCat._id}>
                      {subCat.name}
                    </option>
                  ))}
                </select>
                {validationErrors.sub_category_id && (
                  <span className="text-red-600 text-sm ms-2">
                    {validationErrors.sub_category_id}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="name">Sub Sub Category Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter sub sub category name"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {validationErrors.name && (
                  <span className="text-sm text-red-500 ms-2">
                    Enter sub sub category name
                  </span>
                )}
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="order">Order</label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
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
                  {subSubCategoryId ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
