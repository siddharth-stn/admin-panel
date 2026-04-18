import { ImageUp } from "lucide-react";

// Add Why Choose Us page — form to create a new record with image upload, title, and order
export default function AddWhyChooseUs() {
  return (
    <>
      <div className="form-wrapper mt-10 mx-5 rounded-xl overflow-auto shadow-2xl">
        <div className="form-header border border-gray-200 dark:border-gray-700 py-5 px-6 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-500">
          <h3 className="text-2xl font-bold dark:text-white">
            Add Why Choose Us Record
          </h3>
        </div>
        <div className="formContent flex px-5 py-4 text-[18px] gap-5">
          <div className="image-wrapper flex flex-col gap-3 max-w-1/4">
            <span>Image</span>
            <figure className="bg-gray-300 h-60 w-60 rounded-xl p-2 relative">
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
                <ImageUp size={90} className="text-gray-500" />
              </div>
            </figure>
          </div>
          <div className="textContent-wrapper w-full mb-10">
            <form action="" className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter title..."
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="order">Order</label>
                  <input
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
