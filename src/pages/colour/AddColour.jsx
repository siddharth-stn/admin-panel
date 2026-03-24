import { ImageUp } from "lucide-react";

// Add Colour page — form to create a new colour with name, hex code, and order
export default function AddColour() {
  return (
    <>
      <div className="form-wrapper mt-10 mx-5 rounded-xl overflow-auto shadow-2xl">
        <div className="form-header border border-gray-200 dark:border-gray-700 py-5 px-6 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-500">
          <h3 className="text-2xl font-bold dark:text-white">Add New Color</h3>
        </div>
        <div className="formContent flex px-5 py-4 text-[18px] gap-5">
          <div className="textContent-wrapper w-full mb-10">
            <form action="" className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="color">Color Name</label>
                <input
                  type="text"
                  id="color"
                  placeholder="Enter color name (e.g., Red)"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="ccode">Color Code</label>
                  <input
                    type="number"
                    id="ccode"
                    placeholder="Hex Code (e.g., #FF5733)"
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="order">Order</label>
                <input
                  type="text"
                  id="order"
                  placeholder="Enter order number"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="self-start mr-10 border border-gray-200 dark:border-gray-700 py-2 px-4 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-500">
                <button className="cursor-pointer">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
