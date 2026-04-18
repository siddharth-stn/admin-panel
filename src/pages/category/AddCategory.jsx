import axios from "axios";
import { ImageUp } from "lucide-react";
import { useState } from "react";
import iziToast from "izitoast";

// Add Category page — form to create a new category with image upload, name, and order
export default function AddCategory() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const result = await axios.post(
        "http://localhost:8000/api/backend/categories/create",
        formData,
      );

      if (result.data._status) {
        iziToast.success({
          title: "Successful",
          message: result.data._message,
          position: "topRight",
        });
      } else {
        iziToast.warning({
          title: "कुछ तो गड़बड़ है दया!",
          message: result.data._message,
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

  const [imageUrl, setImageUrl] = useState(null);
  const handleImageUpload = (imageUrl) => {
    const imageUrlObj = URL.createObjectURL(imageUrl);
    setImageUrl(imageUrlObj);
  };
  return (
    <>
      <div className="form-wrapper mt-10 mx-5 rounded-xl overflow-auto shadow-2xl">
        <div className="form-header border border-gray-200 dark:border-gray-700 py-5 px-6 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-500">
          <h3 className="text-2xl font-bold dark:text-white">
            Add New Category
          </h3>
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
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
                  src={imageUrl}
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
                  handleImageUpload(e.target.files[0]);
                }}
              />
            </figure>
          </label>
          <div className="textContent-wrapper w-full mb-10">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="category">Category Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  id="category"
                  placeholder="Enter category name"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="order">Order</label>
                  <input
                    required
                    name="order"
                    type="number"
                    id="order"
                    placeholder="Enter order number"
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
              </div>
              <div className="self-end mr-10 border border-gray-200 dark:border-gray-700 py-2 px-4 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-500">
                <button className="cursor-pointer">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
