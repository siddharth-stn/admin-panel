import axios from "axios";
import { ImageUp } from "lucide-react";
import iziToast from "izitoast";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function AddProduct() {
  const [validationErrors, setValidationErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [colors, setColors] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [multiImageUrls, setMultiImageUrls] = useState([]);
  const [imagePath, setImagePath] = useState("");

  const [formData, setFormData] = useState({
    parent_category_id: "default",
    sub_category_id: "default",
    sub_sub_category_id: "default",
    name: "",
    product_type: "default",
    best_selling: "default",
    material_ids: [],
    color_ids: [],
    short_description: "",
    long_description: "",
    code: "",
    dimension: "",
    estimated_delivery: "",
    sale_price: "",
    actual_price: "",
    order: "",
  });

  const productId = useParams().id;
  const BASE = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    async function fetchDropdowns() {
      try {
        const [catRes, matRes, colRes] = await Promise.all([
          axios.post(`${BASE}api/backend/products/parent-category`),
          axios.post(`${BASE}api/backend/products/material`),
          axios.post(`${BASE}api/backend/products/color`),
        ]);
        if (catRes.data._status) setCategories(catRes.data._data || []);
        if (matRes.data._status) setMaterials(matRes.data._data || []);
        if (colRes.data._status) setColors(colRes.data._data || []);
      } catch (error) {
        console.error("Failed to fetch dropdown data", error);
      }
    }
    fetchDropdowns();
  }, []);

  useEffect(() => {
    async function fetchSubCategories() {
      if (formData.parent_category_id && formData.parent_category_id !== "default") {
        try {
          const result = await axios.post(`${BASE}api/backend/products/sub-category`, {
            parent_category_id: formData.parent_category_id,
          });
          if (result.data._status) setSubCategories(result.data._data || []);
          else setSubCategories([]);
        } catch (error) {
          console.error("Failed to fetch sub categories", error);
        }
      } else {
        setSubCategories([]);
      }
    }
    fetchSubCategories();
  }, [formData.parent_category_id]);

  useEffect(() => {
    async function fetchSubSubCategories() {
      if (formData.sub_category_id && formData.sub_category_id !== "default") {
        try {
          const result = await axios.post(`${BASE}api/backend/products/sub-sub-category`, {
            sub_category_id: formData.sub_category_id,
          });
          if (result.data._status) setSubSubCategories(result.data._data || []);
          else setSubSubCategories([]);
        } catch (error) {
          console.error("Failed to fetch sub sub categories", error);
        }
      } else {
        setSubSubCategories([]);
      }
    }
    fetchSubSubCategories();
  }, [formData.sub_category_id]);

  useEffect(() => {
    if (productId) {
      async function getProductDetails() {
        try {
          const result = await axios.post(`${BASE}api/backend/products/details/${productId}`);
          if (result.data._status) {
            const d = result.data._data;
            setImagePath(result.data._image_path || "");
            if (d.image) setImageUrl(d.image);
            if (d.images && d.images.length > 0) setMultiImageUrls(d.images);

            setFormData({
              parent_category_id: d.parent_category_id?._id || d.parent_category_id || "default",
              sub_category_id: d.sub_category_id?._id || d.sub_category_id || "default",
              sub_sub_category_id: d.sub_sub_category_id?._id || d.sub_sub_category_id || "default",
              name: d.name || "",
              product_type: d.product_type?.toString() || "default",
              best_selling: d.best_selling?.toString() || "default",
              material_ids: d.material_ids ? d.material_ids.map((m) => m._id || m) : [],
              color_ids: d.color_ids ? d.color_ids.map((c) => c._id || c) : [],
              short_description: d.short_description || "",
              long_description: d.long_description || "",
              code: d.code || "",
              dimension: d.dimension || "",
              estimated_delivery: d.estimated_delivery || "",
              sale_price: d.sale_price?.toString() || "",
              actual_price: d.actual_price?.toString() || "",
              order: d.order?.toString() || "",
            });

            if (d.parent_category_id?._id || d.parent_category_id) {
              const parentId = d.parent_category_id?._id || d.parent_category_id;
              const subRes = await axios.post(`${BASE}api/backend/products/sub-category`, {
                parent_category_id: parentId,
              });
              if (subRes.data._status) setSubCategories(subRes.data._data || []);
            }

            if (d.sub_category_id?._id || d.sub_category_id) {
              const subId = d.sub_category_id?._id || d.sub_category_id;
              const subSubRes = await axios.post(`${BASE}api/backend/products/sub-sub-category`, {
                sub_category_id: subId,
              });
              if (subSubRes.data._status) setSubSubCategories(subSubRes.data._data || []);
            }
          }
        } catch (error) {
          console.error("Failed to fetch product details", error);
          iziToast.error({ message: "Failed to fetch product details", position: "topCenter" });
        }
      }
      getProductDetails();
    } else {
      setFormData({
        parent_category_id: "default",
        sub_category_id: "default",
        sub_sub_category_id: "default",
        name: "",
        product_type: "default",
        best_selling: "default",
        material_ids: [],
        color_ids: [],
        short_description: "",
        long_description: "",
        code: "",
        dimension: "",
        estimated_delivery: "",
        sale_price: "",
        actual_price: "",
        order: "",
      });
      setImageUrl(null);
      setMultiImageUrls([]);
      setImagePath("");
    }
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "parent_category_id") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        sub_category_id: "default",
        sub_sub_category_id: "default",
      }));
    } else if (name === "sub_category_id") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        sub_sub_category_id: "default",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    handleErrors(name);
  };

  const handleMultiSelect = (e) => {
    const { name, options } = e.target;
    const selected = [];
    for (const option of options) {
      if (option.selected) selected.push(option.value);
    }
    setFormData((prev) => ({ ...prev, [name]: selected }));
    handleErrors(name);
  };

  const handleErrors = (name) => {
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImageUrl(URL.createObjectURL(file));
  };

  const handleMultiImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setMultiImageUrls(urls);
  };

  const getImageSrc = (img) => {
    if (!img) return "";
    if (img.startsWith("blob:")) return img;
    const path = imagePath ? `http://${imagePath}` : `${BASE}uploads/product/`;
    return path + img;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.parent_category_id || formData.parent_category_id === "default")
      errors.parent_category_id = "Select a parent category";
    if (!formData.sub_category_id || formData.sub_category_id === "default")
      errors.sub_category_id = "Select a sub category";
    if (!formData.sub_sub_category_id || formData.sub_sub_category_id === "default")
      errors.sub_sub_category_id = "Select a sub sub category";
    if (!formData.name.trim()) errors.name = "Product name is required";
    if (!formData.product_type || formData.product_type === "default")
      errors.product_type = "Select product type";
    if (!formData.best_selling || formData.best_selling === "default")
      errors.best_selling = "Select best selling";
    if (formData.material_ids.length === 0) errors.material_ids = "Select at least one material";
    if (formData.color_ids.length === 0) errors.color_ids = "Select at least one color";
    if (!formData.short_description.trim()) errors.short_description = "Short description is required";
    if (!formData.long_description.trim()) errors.long_description = "Description is required";
    if (!formData.code.trim()) errors.code = "Product code is required";
    if (!formData.dimension.trim()) errors.dimension = "Dimension is required";
    if (!formData.estimated_delivery.trim()) errors.estimated_delivery = "Estimated delivery is required";
    if (!formData.sale_price) errors.sale_price = "Sale price is required";
    if (!formData.actual_price) errors.actual_price = "Actual price is required";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const form = e.target;
      const fd = new FormData();

      fd.append("name", formData.name);
      fd.append("product_type", formData.product_type);
      fd.append("best_selling", formData.best_selling);
      fd.append("parent_category_id", formData.parent_category_id);
      fd.append("sub_category_id", formData.sub_category_id);
      fd.append("sub_sub_category_id", formData.sub_sub_category_id);
      fd.append("short_description", formData.short_description);
      fd.append("long_description", formData.long_description);
      fd.append("code", formData.code);
      fd.append("dimension", formData.dimension);
      fd.append("estimated_delivery", formData.estimated_delivery);
      fd.append("sale_price", formData.sale_price);
      fd.append("actual_price", formData.actual_price);
      if (formData.order) fd.append("order", formData.order);

      formData.color_ids.forEach((id) => fd.append("color_ids", id));
      formData.material_ids.forEach((id) => fd.append("material_ids", id));

      const imageInput = form.querySelector('input[name="image"]');
      if (imageInput && imageInput.files[0]) {
        fd.append("image", imageInput.files[0]);
      }

      const imagesInput = form.querySelector('input[name="images"]');
      if (imagesInput && imagesInput.files.length > 0) {
        Array.from(imagesInput.files).forEach((file) => {
          fd.append("images", file);
        });
      }

      let response;
      if (productId) {
        response = await axios.put(`${BASE}api/backend/products/update/${productId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios.post(`${BASE}api/backend/products/create`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.data._status) {
        iziToast.success({ message: response.data._message, position: "topCenter" });
        if (!productId) {
          form.reset();
          setFormData({
            parent_category_id: "default",
            sub_category_id: "default",
            sub_sub_category_id: "default",
            name: "",
            product_type: "default",
            best_selling: "default",
            material_ids: [],
            color_ids: [],
            short_description: "",
            long_description: "",
            code: "",
            dimension: "",
            estimated_delivery: "",
            sale_price: "",
            actual_price: "",
            order: "",
          });
          setImageUrl(null);
          setMultiImageUrls([]);
          setSubCategories([]);
          setSubSubCategories([]);
        }
      } else {
        if (response.data._error) setValidationErrors(response.data._error);
        iziToast.error({ message: response.data._message || "Something went wrong", position: "topCenter" });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      iziToast.error({ message: "Something went wrong", position: "topCenter" });
    }
  };

  const inputClass = "border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500";

  return (
    <>
      <div className="form-wrapper mt-10 mx-5 rounded-xl overflow-auto shadow-2xl">
        <div className="form-header border border-gray-200 dark:border-gray-700 py-5 px-6 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-500">
          <h3 className="text-2xl font-bold dark:text-white">
            {productId ? "Update Product" : "Add New Product"}
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="relative">
          <div className="formContent flex flex-col px-5 py-4 text-[18px] gap-5 pb-20">
            {/* Row 1: Category Dropdowns */}
            <div className="flex gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="parent_category_id">Select Parent Category</label>
                <select
                  id="parent_category_id"
                  name="parent_category_id"
                  value={formData.parent_category_id}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  <option value="default">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
                {validationErrors.parent_category_id && (
                  <span className="text-red-600 text-sm">{validationErrors.parent_category_id}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="sub_category_id">Select Sub Category</label>
                <select
                  id="sub_category_id"
                  name="sub_category_id"
                  value={formData.sub_category_id}
                  onChange={handleInputChange}
                  disabled={formData.parent_category_id === "default"}
                  className={inputClass}
                >
                  <option value="default">Select Sub Category</option>
                  {subCategories.map((sc) => (
                    <option key={sc._id} value={sc._id}>{sc.name}</option>
                  ))}
                </select>
                {validationErrors.sub_category_id && (
                  <span className="text-red-600 text-sm">{validationErrors.sub_category_id}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="sub_sub_category_id">Select Sub Sub Category</label>
                <select
                  id="sub_sub_category_id"
                  name="sub_sub_category_id"
                  value={formData.sub_sub_category_id}
                  onChange={handleInputChange}
                  disabled={formData.sub_category_id === "default"}
                  className={inputClass}
                >
                  <option value="default">Select Sub Sub Category</option>
                  {subSubCategories.map((ssc) => (
                    <option key={ssc._id} value={ssc._id}>{ssc.name}</option>
                  ))}
                </select>
                {validationErrors.sub_sub_category_id && (
                  <span className="text-red-600 text-sm">{validationErrors.sub_sub_category_id}</span>
                )}
              </div>
            </div>

            {/* Row 2: Name, Product Type, Best Selling */}
            <div className="flex gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="name">Product Name</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className={inputClass}
                />
                {validationErrors.name && (
                  <span className="text-red-600 text-sm">{validationErrors.name}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="product_type">Select Product Type</label>
                <select
                  id="product_type"
                  name="product_type"
                  value={formData.product_type}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  <option value="default">Select Product Type</option>
                  <option value="1">Featured</option>
                  <option value="2">On Sale</option>
                  <option value="3">New Arrivals</option>
                </select>
                {validationErrors.product_type && (
                  <span className="text-red-600 text-sm">{validationErrors.product_type}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="best_selling">Best Selling</label>
                <select
                  id="best_selling"
                  name="best_selling"
                  value={formData.best_selling}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  <option value="default">Select</option>
                  <option value="1">Yes</option>
                  <option value="2">No</option>
                </select>
                {validationErrors.best_selling && (
                  <span className="text-red-600 text-sm">{validationErrors.best_selling}</span>
                )}
              </div>
            </div>

            {/* Row 3: Materials and Colors (multi-select) */}
            <div className="flex gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="material_ids">Materials (hold Ctrl to select multiple)</label>
                <select
                  multiple
                  id="material_ids"
                  name="material_ids"
                  value={formData.material_ids}
                  onChange={handleMultiSelect}
                  className={inputClass + " min-h-[100px]"}
                >
                  {materials.map((m) => (
                    <option key={m._id} value={m._id}>{m.name}</option>
                  ))}
                </select>
                {validationErrors.material_ids && (
                  <span className="text-red-600 text-sm">{validationErrors.material_ids}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="color_ids">Colors (hold Ctrl to select multiple)</label>
                <select
                  multiple
                  id="color_ids"
                  name="color_ids"
                  value={formData.color_ids}
                  onChange={handleMultiSelect}
                  className={inputClass + " min-h-[100px]"}
                >
                  {colors.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
                {validationErrors.color_ids && (
                  <span className="text-red-600 text-sm">{validationErrors.color_ids}</span>
                )}
              </div>
            </div>

            {/* Row 4: Code, Dimension, Estimated Delivery */}
            <div className="flex gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="code">Product Code</label>
                <input
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="Enter product code"
                  className={inputClass}
                />
                {validationErrors.code && (
                  <span className="text-red-600 text-sm">{validationErrors.code}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="dimension">Dimension</label>
                <input
                  id="dimension"
                  name="dimension"
                  value={formData.dimension}
                  onChange={handleInputChange}
                  placeholder="Enter dimension"
                  className={inputClass}
                />
                {validationErrors.dimension && (
                  <span className="text-red-600 text-sm">{validationErrors.dimension}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="estimated_delivery">Estimated Delivery</label>
                <input
                  id="estimated_delivery"
                  name="estimated_delivery"
                  value={formData.estimated_delivery}
                  onChange={handleInputChange}
                  placeholder="e.g. 3-5 days"
                  className={inputClass}
                />
                {validationErrors.estimated_delivery && (
                  <span className="text-red-600 text-sm">{validationErrors.estimated_delivery}</span>
                )}
              </div>
            </div>

            {/* Row 5: Descriptions */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="short_description">Short Description</label>
                <textarea
                  id="short_description"
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleInputChange}
                  placeholder="Enter short description"
                  className={inputClass}
                />
                {validationErrors.short_description && (
                  <span className="text-red-600 text-sm">{validationErrors.short_description}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="long_description">Description</label>
                <textarea
                  id="long_description"
                  name="long_description"
                  rows={6}
                  value={formData.long_description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  className={inputClass}
                />
                {validationErrors.long_description && (
                  <span className="text-red-600 text-sm">{validationErrors.long_description}</span>
                )}
              </div>
            </div>

            {/* Row 6: Image Uploads */}
            <div className="flex gap-10">
              <label htmlFor="imageUpload" className="image-wrapper flex flex-col gap-3 max-w-1/4 cursor-pointer">
                <span>Image</span>
                <figure className="bg-gray-300 h-60 w-60 rounded-xl p-2 relative">
                  {imageUrl ? (
                    <img
                      className="w-full h-full object-cover rounded-xl"
                      src={getImageSrc(imageUrl)}
                      alt="uploaded"
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
                    onChange={handleImageUpload}
                  />
                </figure>
              </label>

              <label htmlFor="multiImageUpload" className="image-wrapper flex flex-col gap-3 cursor-pointer">
                <span>Multiple Images (up to 12)</span>
                <div className="flex gap-3 flex-wrap">
                  {multiImageUrls.length > 0 ? (
                    multiImageUrls.map((url, idx) => (
                      <figure key={idx} className="bg-gray-300 h-32 w-32 rounded-xl p-1">
                        <img
                          className="w-full h-full object-cover rounded-xl"
                          src={getImageSrc(url)}
                          alt={`upload-${idx}`}
                        />
                      </figure>
                    ))
                  ) : (
                    <figure className="bg-gray-300 h-60 w-60 rounded-xl p-2 relative">
                      <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
                        <ImageUp size={90} className="text-gray-500" />
                      </div>
                    </figure>
                  )}
                </div>
                <input
                  id="multiImageUpload"
                  name="images"
                  type="file"
                  multiple
                  className="absolute hidden"
                  accept="image/*"
                  onChange={handleMultiImageUpload}
                />
              </label>
            </div>

            {/* Row 7: Prices and Order */}
            <div className="flex gap-8 mb-10">
              <div className="flex flex-col flex-1 gap-2">
                <label htmlFor="sale_price">Sale Price</label>
                <input
                  type="number"
                  id="sale_price"
                  name="sale_price"
                  value={formData.sale_price}
                  onChange={handleInputChange}
                  placeholder="Enter sale price"
                  className={inputClass}
                />
                {validationErrors.sale_price && (
                  <span className="text-red-600 text-sm">{validationErrors.sale_price}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="actual_price">Actual Price</label>
                <input
                  type="number"
                  id="actual_price"
                  name="actual_price"
                  value={formData.actual_price}
                  onChange={handleInputChange}
                  placeholder="Enter actual price"
                  className={inputClass}
                />
                {validationErrors.actual_price && (
                  <span className="text-red-600 text-sm">{validationErrors.actual_price}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="order">Order</label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  placeholder="Enter order"
                  className={inputClass}
                />
                {validationErrors.order && (
                  <span className="text-red-600 text-sm">{validationErrors.order}</span>
                )}
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 right-25 border border-gray-200 dark:border-gray-700 py-2 px-4 rounded text-white bg-blue-600 dark:bg-blue-400 dark:text-white cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-500">
            <button type="submit" className="cursor-pointer">
              {productId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
