export default function AddMaterial() {
  return (
    <>
      <div className="form-wrapper mt-10 mx-5 rounded-xl overflow-auto shadow-2xl">
        <div className="form-header border border-gray-200 dark:border-gray-700 py-5 px-6 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-500">
          <h3 className="text-2xl font-bold dark:text-white">
            Add New Material
          </h3>
        </div>
        <div className="formContent flex px-5 py-4 text-[18px] gap-5">
          <div className="textContent-wrapper w-full mb-10">
            <form action="" className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="material">Material Name</label>
                <input
                  type="text"
                  id="material"
                  placeholder="Enter material name"
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="order">Order</label>
                <input
                  type="number"
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
