import axios from "axios";
import iziToast from "izitoast";
import { SquarePen, Funnel } from "lucide-react";
import { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";
import { Link } from "react-router";

export default function ViewMaterial() {
  const [openFilterForm, setOpenFilterForm] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [selectedRecord, setSelectedRecord] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState(false);

  const changeStatus = async () => {
    if (selectedRecord.length > 0) {
      try {
        const result = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}api/backend/materials/toggle-status`,
          {
            id: selectedRecord,
          },
        );

        if (result.data._status === true) {
          iziToast.success({
            title: "Success",
            message: result.data._message,
            position: "topRight",
          });

          setSelectedRecord([]);
          setStatus(!status);
        } else {
          iziToast.error({
            title: "Failed",
            message: result.data._message,
            position: "topRight",
          });
        }
      } catch (error) {
        iziToast.error({
          title: "Failed",
          message: "Something went wrong!",
          position: "topRight",
        });
        console.log(error);
      }
    }
  };

  const deleteSelected = () => {
    if (selectedRecord.length > 0) {
      iziToast.question({
        timeout: 20000,
        close: true,
        overlay: true,
        displayMode: "once",
        id: "delete-confirm",
        zindex: 999999,
        title: "Are you sure?",
        message: "Record once deleted can not be recovered",
        position: "center",
        buttons: [
          [
            "<button><b>Yes</b></button>",
            async function (instance, toast) {
              try {
                const result = await axios.post(
                  `${import.meta.env.VITE_SERVER_URL}api/backend/materials/delete`,
                  {
                    id: selectedRecord,
                  },
                );

                if (result.data._status === true) {
                  iziToast.success({
                    title: "Success",
                    message: result.data._message,
                    position: "topRight",
                  });

                  setSelectedRecord([]);
                  setStatus(!status);
                } else {
                  iziToast.error({
                    title: "Failed",
                    message: result.data._message,
                    position: "topRight",
                  });
                }
              } catch (error) {
                iziToast.error({
                  title: "Failed",
                  message: "Something went wrong!",
                  position: "topRight",
                });
                console.log(error);
              }

              instance.hide({ transitionOut: "fadeOut" }, toast);
            },
          ],
          [
            "<button><b>No</b></button>",
            function (instance, toast) {
              iziToast.info({
                title: "Cancelled",
                message: "Delete action cancelled",
                position: "topRight",
              });
              instance.hide({ transitionOut: "fadeOut" }, toast);
            },
          ],
        ],
      });
    }
  };

  const singleCheckSelect = (id) => {
    if (selectedRecord.includes(id)) {
      setSelectedRecord(selectedRecord.filter((elem) => elem !== id));
    } else {
      setSelectedRecord([...selectedRecord, id]);
    }
  };

  const applyFilter = (e) => {
    e.preventDefault();
    const obj = {
      name: e.target.closest("form").materialName.value,
      order: e.target.closest("form").materialOrder.value,
    };

    setFilterData(obj);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}api/backend/materials/view`,
          {
            page: currentPage,
            name: filterData.name,
            order: filterData.order,
          },
        );

        if (result.data._status === true) {
          setMaterials(result.data._data);
          setTotalPages(result.data._paginate.total_pages);
        } else {
          setMaterials([]);
          setTotalPages(0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMaterials();
  }, [currentPage, filterData, status]);

  return (
    <>
      <div className="form-wrapper mt-10 mx-5 rounded-xl overflow-auto shadow-2xl">
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
                <label htmlFor="materialName" className="flex flex-col gap-2">
                  <span>Material Name</span>
                  <input
                    className="border border-gray-700 w-55 p-2"
                    name="materialName"
                    type="text"
                    placeholder="Enter Material Name"
                    id="materialName"
                  />
                </label>
                <label htmlFor="materialOrder" className="flex flex-col gap-2">
                  <span>Material Order</span>
                  <input
                    className="border border-gray-700 w-55 p-2"
                    name="materialOrder"
                    type="number"
                    placeholder="Enter Order quantity"
                    id="materialOrder"
                  />
                </label>
              </div>
              <div className="flex gap-5">
                <button
                  className="border border-amber-500 py-2 px-3 rounded bg-amber-400 text-white font-bold hover:text-black hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.target.closest("form").reset();
                    setFilterData({});
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
              View Materials
            </h3>
            <div className="buttons ml-auto flex items-center gap-3">
              <button
                className="flex items-center gap-1 ring rounded py-2 px-3 cursor-pointer hover:bg-amber-500 hover:ring-amber-400"
                onClick={() => setOpenFilterForm((prev) => !prev)}
              >
                <Funnel size={16} />
                Filter
              </button>
              <button
                disabled={selectedRecord.length === 0}
                className="ring ring-gray-800 rounded bg-gray-500 py-2 px-3 cursor-pointer not-disabled:hover:bg-amber-50 not-disabled:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => deleteSelected()}
              >
                Delete All
              </button>
              <button
                disabled={selectedRecord.length === 0}
                className="ring ring-gray-800 rounded bg-gray-500 py-2 px-3 cursor-pointer not-disabled:hover:bg-amber-50 not-disabled:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => changeStatus()}
              >
                Change Status
              </button>
            </div>
          </div>
        </div>
        <div className="text-[18px]">
          <table className="w-full mt-2">
            <thead className="border-b">
              <tr>
                <th className="py-3 px-4 text-center text-nowrap">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={
                      materials.length > 0 &&
                      selectedRecord.length === materials.length
                    }
                    onChange={() => {
                      if (selectedRecord.length === materials.length) {
                        setSelectedRecord([]);
                      } else {
                        setSelectedRecord(materials.map((mat) => mat._id));
                      }
                    }}
                  />
                  Select
                </th>
                <th className="py-3 px-4 text-center text-nowrap">S.No.</th>
                <th className="py-3 px-4 text-left text-nowrap">Name</th>
                <th className="py-3 px-4 text-center text-nowrap">Order</th>
                <th className="py-3 px-4 text-center text-nowrap">Status</th>
                <th className="py-3 px-4 text-center text-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {materials.length > 0 ? (
                materials.map((element, index) => {
                  return (
                    <tr className="align-middle border-b" key={index}>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          onClick={() => singleCheckSelect(element._id)}
                          checked={
                            selectedRecord.includes(element._id) ? true : false
                          }
                        />
                      </td>
                      <td className="py-3 px-4 text-center">{index + 1}</td>
                      <td className="py-3 px-4 text-nowrap">{element.name}</td>
                      <td className="py-3 px-4 text-center">
                        {element.order}
                      </td>
                      <td className="py-3 px-4 text-center text-nowrap text-green-600 font-bold">
                        {element.status ? (
                          "Active"
                        ) : (
                          <span className="text-red-600">Inactive</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-yellow-400">
                        <div className="flex items-center justify-center">
                          <Link to={`/material/update/${element._id}`}>
                            <SquarePen />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="border-b">
                  <td className="py-3 px-4 text-center" colSpan={6}>
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
