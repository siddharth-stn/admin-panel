import { ImageUp } from "lucide-react";

export default function AddTestimonial() {
  return (
    <>
      <div className="form-wrapper mt-10 mx-5 rounded-xl overflow-auto shadow-2xl">
        <div className="form-header border border-gray-200 dark:border-gray-700 py-5 px-6 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-500">
          <h3 className="text-2xl font-bold dark:text-white">
            Add New Testimonial
          </h3>
        </div>
        <div className="formContent flex px-5 py-4 text-[18px] gap-5">
          <div className="image-wrapper flex flex-col gap-3 max-w-1/4">
            <span>Image</span>
            <figure className="bg-gray-300 h-60 w-60 rounded-xl p-2 relative">
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
                <ImageUp size={90} className="text-gray-500" />
              </div>

              <img src="" alt="upload" className="w-full z-3" />
            </figure>
          </div>
          <div className="textContent-wrapper w-full mb-10">
            <form action="" className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter name..."
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Enter message"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="rating">Rating</label>
                  <input
                    type="text"
                    id="rating"
                    placeholder="Enter rating number"
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="order">Order</label>
                  <input
                    type="text"
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
