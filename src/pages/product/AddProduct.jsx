import { ImageUp } from "lucide-react";

export default function AddProduct() {
  return (
    <>
      <div className="form-wrapper mt-10 mx-5 rounded-xl overflow-auto  shadow-2xl">
        <div className="form-header border border-gray-200 dark:border-gray-700 py-5 px-6 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-500">
          <h3 className="text-2xl font-bold dark:text-white">
            Add New Product
          </h3>
        </div>
        <form action="" className="relative">
          <div className="formContent flex flex-col px-5 py-4 text-[18px] gap-5 pb-20">
            <div className="flex gap-5 ">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="parent">Select Patrent Category</label>
                <select
                  id="parent"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option>Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothess">Clothes</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="sub-category">Select Sub Category</label>
                <select
                  id="sub-category"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option>Select Sub Category</option>
                  <option value="mobile">Mobile</option>
                  <option value="laptop">Laptop</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="sub-sub-category">Sub Sub Category Name</label>
                <select
                  type="text"
                  id="sub-sub-category"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option>Select Sub Sub Category</option>
                </select>
              </div>
            </div>
            <div className="flex gap-5 ">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="product">Product Name</label>
                <input
                  id="product"
                  placeholder="Enter product name"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="product-type">Select Product Type</label>
                <select
                  id="product-type"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option>Select Product Type</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="materials">Materials</label>
                <select
                  type="text"
                  id="material"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option>Select...</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="colors">Colors</label>
                <select
                  type="text"
                  id="colors"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option>Select...</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-5 ">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="short-desc">Short Description</label>
                <textarea
                  id="short-desc"
                  placeholder="Enter short description"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="desc">Description</label>
                <textarea
                  id="desc"
                  rows={6}
                  placeholder="Enter description"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </div>
            <div className="image-wrapper flex flex-col gap-3 max-w-1/4">
              <span>Image</span>
              <figure className="bg-gray-300 h-60 w-60 rounded-xl p-2 relative">
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
                  <ImageUp size={90} className="text-gray-500" />
                </div>

                <img src="" alt="upload" className="w-full z-3" />
              </figure>
            </div>
            <div className="image-wrapper flex flex-col gap-3 max-w-1/4">
              <span>Multiple Images</span>
              <figure className="bg-gray-300 h-60 w-60 rounded-xl p-2 relative">
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
                  <ImageUp size={90} className="text-gray-500" />
                </div>

                <img src="" alt="upload" className="w-full z-3" />
              </figure>
            </div>
            <div className="textContent-wrapper w-full mb-10">
              <div action="" className="flex gap-8">
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    id="price"
                    placeholder="Enter price"
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="actual-price">Actual Price</label>
                  <input
                    type="number"
                    id="actual-price"
                    placeholder="Enter actual price"
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="order">Order</label>
                  <input
                    type="number"
                    id="order"
                    placeholder="Enter order"
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 right-25 border border-gray-200 dark:border-gray-700 py-2 px-4 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-500">
            <button className="cursor-pointer">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
