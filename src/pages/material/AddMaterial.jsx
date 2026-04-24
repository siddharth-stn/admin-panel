import axios from "axios";
import iziToast from "izitoast";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function AddMaterial() {
  const [validationErrors, setValidationErrors] = useState({});

  const materialId = useParams().id;

  const [materialDetails, setMaterialDetails] = useState(null);

  useEffect(() => {
    async function getMaterialDetails() {
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}api/backend/materials/details/${materialId}`,
        );

        if (result.data._status === true) {
          setMaterialDetails(result);
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

    if (materialId) getMaterialDetails();
  }, [materialId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = {};

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
      if (materialId) {
        result = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}api/backend/materials/update/${materialId}`,
          formData,
        );
      } else {
        result = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}api/backend/materials/create`,
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
            {materialId ? "Update Material" : "Add New Material"}
          </h3>
        </div>
        <form
          key={materialId}
          noValidate
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="formContent flex px-5 py-4 text-[18px] gap-5"
        >
          <div className="textContent-wrapper w-full mb-10">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Material Name</label>
                <input
                  onChange={(e) => handleErrors(e.target.name)}
                  required
                  type="text"
                  name="name"
                  defaultValue={
                    materialDetails ? materialDetails.data._data.name : ""
                  }
                  id="name"
                  placeholder="Enter material name"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {validationErrors.name && (
                  <span className="text-sm text-red-500 ms-2">
                    Enter material name
                  </span>
                )}
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="order">Order</label>
                  <input
                    onChange={(e) => handleErrors(e.target.name)}
                    required
                    name="order"
                    defaultValue={
                      materialDetails ? materialDetails.data._data.order : ""
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
                  {materialId ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
