import { ImageUp, Funnel } from "lucide-react";

// View Testimonials page — displays testimonials in a table with filter and bulk actions
export default function ViewTestimonial() {
  return (
    <>
      <div className="form-wrapper mt-10 mx-5 rounded-xl overflow-auto shadow-2xl">
        {/* Header with title and action buttons */}
        <div className="form-header border border-gray-200 dark:border-gray-700 py-5 px-6 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-500">
          <div className="flex">
            <h3 className="text-2xl font-bold dark:text-white">
              View Testimonials
            </h3>
            <div className="buttons ml-auto flex items-center gap-3">
              <button className="flex items-center gap-1 ring rounded py-2 px-3 cursor-pointer hover:bg-amber-500 hover:ring-amber-400">
                <Funnel size={16} />
                Filter
              </button>
              <button className="ring ring-gray-800 rounded bg-gray-500 py-2 px-3 cursor-pointer hover:bg-amber-50 hover:text-black">
                Delete All
              </button>
              <button className="ring ring-gray-800 rounded bg-gray-500 py-2 px-3 cursor-pointer hover:bg-amber-50 hover:text-black">
                Change Status
              </button>
            </div>
          </div>
        </div>
        {/* Testimonials table — short content columns are center-aligned, text columns are left-aligned */}
        <div className="text-[18px]">
          <table className="w-full mt-2">
            <thead className="border-b">
              <tr>
                <th className="py-3 px-4 text-center text-nowrap">Select</th>
                <th className="py-3 px-4 text-center text-nowrap">S.No.</th>
                <th className="py-3 px-4 text-left text-nowrap">Name</th>
                <th className="py-3 px-4 text-left text-nowrap">Message</th>
                <th className="py-3 px-4 text-center text-nowrap">Rating</th>
                <th className="py-3 px-4 text-center text-nowrap">Image</th>
                <th className="py-3 px-4 text-center text-nowrap">Order</th>
                <th className="py-3 px-4 text-center text-nowrap">Status</th>
                <th className="py-3 px-4 text-center text-nowrap">Action</th>
              </tr>
            </thead>
            {/* align-middle keeps all cells vertically centered when image makes row taller */}
            <tbody>
              <tr className="align-middle">
                <td className="py-3 px-4 text-center">
                  <input type="checkbox" />
                </td>
                <td className="py-3 px-4 text-center">1</td>
                <td className="py-3 px-4 text-nowrap">Red</td>
                <td className="py-3 px-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </td>
                <td className="py-3 px-4 text-center">5</td>
                <td className="py-3 px-4 text-center">
                  <img
                    src="https://picsum.photos/id/237/200/300"
                    alt="lorem-picsum"
                    className="w-16 h-16 object-cover rounded inline-block"
                  />
                </td>
                <td className="py-3 px-4 text-center">1</td>
                <td className="py-3 px-4 text-center text-nowrap text-green-600 font-bold">
                  Active
                </td>
                <td className="py-3 px-4 text-center"></td>
              </tr>
            </tbody>
          </table>
          {/* <div className="image-wrapper flex flex-col gap-3 max-w-1/4">
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
                    type="number"
                    id="rating"
                    placeholder="Enter rating number"
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
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
          </div> */}
        </div>
      </div>
    </>
  );
}
