import axios from "axios";
import iziToast from "izitoast";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function AddColour() {
  const [validationErrors, setValidationErrors] = useState({});

  const colourId = useParams().id;

  const [colourDetails, setColourDetails] = useState(null);

  useEffect(() => {
    async function getColourDetails() {
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}api/backend/colours/details/${colourId}`,
        );

        if (result.data._status === true) {
          setColourDetails(result);
        }
      } catch (error) {
        console.error(error);
        iziToast.error({
          title: "Error",
          message: "Something went wrong!",
          position: "topRight",
        });
      }
    }

    if (colourId) getColourDetails();
  }, [colourId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = {};

    if (!formData.get("name")) {
      errors.name = true;
    }
    if (!formData.get("color_code")) {
      errors.color_code = true;
    }
    if (!formData.get("order")) {
      errors.order = true;
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      let result;
      if (colourId) {
        result = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}api/backend/colours/update/${colourId}`,
          formData,
        );
      } else {
        result = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}api/backend/colours/create`,
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

  const handleErrors = (fieldName) => {
    setValidationErrors((prev) => {
      const updated = { ...prev };
      delete updated[fieldName];
      return updated;
    });
  };

  return (
    <>
      <div className="form-wrapper mt-10 mx-5 rounded-xl overflow-auto shadow-2xl">
        <div className="form-header border border-gray-200 dark:border-gray-700 py-5 px-6 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-500">
          <h3 className="text-2xl font-bold dark:text-white">
            {colourId ? "Update Colour" : "Add New Colour"}
          </h3>
        </div>
        <form
          key={colourId}
          noValidate
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="formContent flex px-5 py-4 text-[18px] gap-5"
        >
          <div className="textContent-wrapper w-full mb-10">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Colour Name</label>
                <input
                  onChange={(e) => handleErrors(e.target.name)}
                  required
                  type="text"
                  name="name"
                  defaultValue={
                    colourDetails ? colourDetails.data._data.name : ""
                  }
                  id="name"
                  placeholder="Enter colour name"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {validationErrors.name && (
                  <span className="text-sm text-red-500 ms-2">
                    Enter colour name
                  </span>
                )}
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="color_code">Color Code</label>
                  <input
                    onChange={(e) => handleErrors(e.target.name)}
                    required
                    type="text"
                    name="color_code"
                    defaultValue={
                      colourDetails ? colourDetails.data._data.color_code : ""
                    }
                    id="color_code"
                    placeholder="Hex Code (e.g., #FF5733)"
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  {validationErrors.color_code && (
                    <span className="text-red-600 text-sm ms-2">
                      Enter color code
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="order">Order</label>
                  <input
                    onChange={(e) => handleErrors(e.target.name)}
                    required
                    name="order"
                    defaultValue={
                      colourDetails ? colourDetails.data._data.order : ""
                    }
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
                <button className="cursor-pointer">
                  {colourId ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
