import React, { useEffect, useRef, useState } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddchartIcon from "@mui/icons-material/Addchart";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { uploadImage } from "../../../utils/products/uploadImages";
import { addProduct, fetchProduct, updateProductInFirestore } from "../../../utils/products/products";
import { useGlobalState } from "../../../reducers/global/GlobalContext";
import { PRODUCT_ACTIONS } from "../../../reducers/products/productsReducer";
import Spinner from "../../../components/templates/Spinner";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  name: "",
  desc: "",
  price: "",
  discount: 0,
  stock: "",
  sizes: [],
  category: "",
  featured: "new",
  thumbnail: "",
  images: [],
  reviews: [],
  rating: 3,
};

const categories = [
  "Phone",
  "Computers",
  "Smartwatch",
  "Camera",
  "Headphones",
  "Gaming",
  "Fashion",
  "others",

];

const allSizes = [
  { size: "XS", selected: false },
  { size: "S", selected: false },
  { size: "M", selected: false },
  { size: "L", selected: false },
  { size: "XL", selected: false },
];

const AddProduct = () => {
  const {id : productID} = useParams()
  const {
    state: {
      productsGlobal: { loading, error },
    },
    dispatch,
  } = useGlobalState();

  const [product, setProduct] = useState(initialState);
  // Array to store multiple images
  const [imageFiles, setImageFiles] = useState([null, null, null, null, null]);
  const [imageUrl, setImageUrl] = useState([]);
  const [imgUploading, setImgUploading] = useState(false);
  const [sizes, setSize] = useState(allSizes);

  const navigate = useNavigate()

  const handleSize = (inputSize) => {
    let newSize = sizes.map((item) =>
      item.size == inputSize.size ? { ...item, selected: !item.selected } : item
    );
    setSize(newSize);

    let selectedSize = newSize.map((item) =>
      item.selected == true ? item.size : null
    );
    selectedSize = selectedSize.filter((size) => size);

    let newProduct = { ...product, sizes: [...selectedSize] };
    setProduct(newProduct);
  };

  // Function to handle individual image upload
  const handleSetImage = ({ files, index }) => {
    if (files.length == 1) {
      const newImages = [...imageFiles];
      newImages[index] = files[0];
      setImageFiles(newImages);
      return;
    }
    if (files.length == 5) {
      setImageFiles(files);
      return;
    }
    const newImages = [];
    for (let i = 0; i < 5; i++) {
      if (files && files[i]) {
        newImages.push(files[i]);
      } else {
        newImages.push(null);
      }
    }
    setImageFiles(newImages);
  };

  // Flash sale state
  const [flashSale, setFlashSale] = useState({
    active: false,
    discount: 0,
    endDate: null,
  });

  async function fetchSingleProduct(id) {
    try {
      const data = await fetchProduct(id);
      if (data) {
        setProduct(data);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
    }
  }

  useEffect(() => {
    if (productID) {
      fetchSingleProduct(productID);
      return;
    }

    const local = localStorage.getItem("add-product-details");
    if (local) {
      try {
        const { product, flashSale, sizes } = JSON.parse(local);
        setProduct(product || initialState);
        setSize(sizes);
        setFlashSale(
          flashSale || { active: false, discount: 0, endDate: null }
        );
      } catch (error) {
        console.error("Error parsing local storage data:", error);
      }
    }
  }, [productID]);

  const handleFlashSaleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFlashSale((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChange = (e) => {
    const newProduct = {
      ...product,
      [e.target.name]: e.target.value,
    };
    setProduct(newProduct);
  };

  const handleUploadImage = async (images) => {
    if (images[0] == null) {
      toast.warn("Please add thumbnail");
      return;
    }
    setImgUploading(true);
    const urls = await Promise.all(
      images.map(async (image) => {
        if (image) {
          const url = await uploadImage(image);
          return url;
        }
        return null;
      })
    );
    const validUrls = urls.filter((url) => url); // filter out any null values
    setImageUrl(validUrls); // set filtered URLs
    setImgUploading(false);
    return validUrls; // Return the URLs directly from the function
  };

  const handleAddProduct = async () => {
    const { name, desc, price, stock } = product;

    if (!name || !desc || !price || !stock || imageFiles.length === 0) {
      toast.warn("Please fill all the fields and upload images.");
      return;
    }

    try {
      dispatch({ type: PRODUCT_ACTIONS.SET_LOADING });

      // Upload images if imageUrl is empty
      let finalImageUrl = imageUrl;

      if (imageUrl.length === 0) {
        finalImageUrl = await handleUploadImage(imageFiles);
      }

      if (finalImageUrl.length === 0) {
        toast.error("Image upload failed. Please try again.");
        return;
      }

      const newProduct = {
        ...product,
        thumbnail: finalImageUrl[0], // Set the first image as the thumbnail
        images: finalImageUrl,
        flashSale,
      };

      let productId 

      if(productID){
        await updateProductInFirestore(productID, newProduct)
        toast.success("Updated Sucessfully")
        navigate(-1)
        return
      }

      productId = await addProduct(newProduct);
      newProduct.pId = productId;

      toast.success("Product added successfully!");
      dispatch({ type: PRODUCT_ACTIONS.ADD_PRODUCTS, payload: newProduct });

      localStorage.removeItem("add-product-details");
      setProduct(initialState);
      setFlashSale({ active: false, discount: 0, endDate: null });
      setImageFiles([null, null, null, null, null]);
      setImageUrl([]);
      setSize(allSizes);
    } catch (error) {
      toast.error(`Failed to add product: ${error.message}`);
      dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const handleSaveDraft = async () => {
    try {
      const productDetails = { product, flashSale, sizes };
      localStorage.setItem(
        "add-product-details",
        JSON.stringify(productDetails)
      );
      toast.success("saved to local");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleReset = () => {
    setProduct(initialState);
    setFlashSale({ active: false, discount: 0, endDate: null });
    setImageFiles([null, null, null, null, null]);
    setImageUrl([]);
    setSize(allSizes);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-40 mt-10 border-b border-slate-300 pb-2">
        <div>
          <p className="text-2xl  font-bold tracking-wider flex items-center gap-2">
            <AddchartIcon />
            {productID ? "Edit Product" : "Add New Product"}
          </p>
        </div>
        <div className="flex gap-2 justify-center items-center text-lg font-semibold">
          <button
            onClick={handleReset}
            className="bg-secondary rounded-sm px-4 py-2 text-white flex items-center gap-2"
          >
            <RestartAltIcon />
            Reset
          </button>
          {!productID && (
            <button
              onClick={handleSaveDraft}
              className="bg-secondary rounded-sm px-4 py-2 text-white flex items-center gap-2"
            >
              <SaveIcon />
              Save Draft
            </button>
          )}
          <button
            onClick={handleAddProduct}
            className="bg-secondary rounded-sm px-4 py-2 text-white flex items-center gap-2"
          >
            {!loading && <AddTaskIcon />}

            {loading && <Spinner />}
            {productID ? "Save" : "Add Product"}
          </button>
        </div>
      </div>

      <div className="flex-1 px-14 mt-10 flex flex-row gap-4">
        {/* column1 */}
        <div className="flex flex-col gap-4 w-2/3 flex-grow-0">
          {/* general info */}
          <div className="flex flex-col bg-gray-200 dark:bg-gray-800 py-5 px-4 gap-2 rounded-lg">
            <p className="text-lg font-semibold">General Information</p>
            <label className="font-semibold text-sm" htmlFor="name">
              Name
            </label>
            <input
              name="name"
              onChange={handleChange}
              value={product.name}
              className="focus:outline-none bg-gray-300 px-3 py-2 text-slate-700  rounded-md placeholder:text-slate-500"
              type="text"
              id="name"
              placeholder="Enter product name"
              autoComplete="given-name"
            />
            <label className="font-semibold text-sm" htmlFor="desc">
              Product Description
            </label>
            <textarea
              name="desc"
              onChange={handleChange}
              value={product.desc}
              className="focus:outline-none bg-gray-300 px-3 py-2 rounded-md resize-none h-40 text-slate-700 placeholder:text-slate-500"
              id="desc"
              placeholder="Write product description"
            ></textarea>
          </div>

          {/* pricing and stock */}
          <div className="flex flex-col bg-gray-200 dark:bg-gray-800 py-5 px-4 gap-2 rounded-lg">
            <p className="text-lg font-semibold">Pricing And Stock</p>
            <div className="flex flex-row gap-2 items-center justify-between px-5 pt-2">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-sm" htmlFor="base-price">
                  Base Pricing
                </label>
                <input
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="focus:outline-none bg-gray-300 px-3 py-2 rounded-md text-slate-700 placeholder:text-slate-500"
                  type="number"
                  id="base-price"
                  placeholder="price"
                />
                <label className="font-semibold text-sm" htmlFor="stock">
                  Stock
                </label>
                <input
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  className="focus:outline-none bg-gray-300 px-3 py-2 rounded-md text-slate-700 placeholder:text-slate-500"
                  type="number"
                  id="stock"
                  placeholder="stock"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-sm" htmlFor="discount">
                  Discount
                </label>
                <input
                  name="discount"
                  value={product.discount}
                  onChange={handleChange}
                  className="focus:outline-none bg-gray-300 px-3 py-2 rounded-md text-slate-700 placeholder:text-slate-500"
                  type="number"
                  id="discount"
                  placeholder="discount"
                />
                <span className="font-semibold text-sm" htmlFor="size">
                  Sizes
                </span>
                <div className="rounded-md flex flex-row gap-2 justify-between text-gray-600 items-center">
                  {sizes.map((item) => (
                    <button
                      key={item.size}
                      onClick={() => handleSize(item)}
                      className={` px-2 py-1 rounded ${
                        item.selected
                          ? "bg-secondary text-white"
                          : "bg-gray-300 hover:bg-secondary"
                      }`}
                    >
                      {item.size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-sm" htmlFor="category">
                  Category
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="focus:outline-none bg-gray-300 px-3 py-2 rounded-md text-slate-700 placeholder:text-slate-500"
                  id="category"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <label className="font-semibold text-sm" htmlFor="featured">
                  Featured
                </label>
                <select
                  name="featured"
                  value={product.featured}
                  onChange={handleChange}
                  className="focus:outline-none bg-gray-300 px-3 py-2 rounded-md text-slate-700 placeholder:text-slate-500"
                  id="featured"
                >
                  <option value="">None</option>
                  <option value="new">New Arrival</option>
                  <option value="best-selling">Best Selling</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* column2 */}
        <div className="flex-1 flex flex-col gap-4">
          {/* image upload section */}
          <div className="flex flex-col bg-gray-200 dark:bg-gray-800 py-5 px-4 gap-2 rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Upload Images</p>
              <button
                onClick={() => handleUploadImage(imageFiles)}
                className="bg-secondary px-4 py-1 rounded text-white flex items-center justify-center gap-2"
              >
                {imgUploading ? "Uploading" : "Upload"}
                {imgUploading && <Spinner />}
              </button>
            </div>

            <div className="bg-gray-300 w-full h-56 rounded-md flex justify-center items-center">
              <UploadImageComponent
                divStyle="w-full h-56 rounded-md border border-dashed border-secondary flex justify-center items-center"
                image={imageFiles[0]}
                setImage={(files) => handleSetImage(files)}
                index={0}
              />
            </div>

            <div className="flex gap-2 justify-between items-center">
              {imageFiles.slice(1).map((image, index) => (
                <UploadImageComponent
                  key={index}
                  divStyle="bg-gray-300 w-20 h-20 rounded-md border border-dashed border-secondary flex justify-center items-center"
                  image={image}
                  setImage={(files) => handleSetImage(files)}
                  index={1 + index}
                />
              ))}
            </div>
          </div>
          {/* Flash Sales Info */}
          <div className="flex flex-col bg-gray-200 dark:bg-gray-800 py-5 px-4 gap-2 rounded-lg">
            <p className="text-lg font-semibold">Flash Sales Info</p>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="active"
                id="flashSaleActive"
                checked={flashSale?.active}
                onChange={handleFlashSaleChange}
              />
              <label
                htmlFor="flashSaleActive"
                className="text-sm font-semibold"
              >
                Flash Sale Active
              </label>
            </div>

            {flashSale?.active && (
              <>
                <label
                  htmlFor="flashSaleDiscount"
                  className="font-semibold text-sm"
                >
                  Flash Sale Discount (%)
                </label>
                <input
                  type="number"
                  id="flashSaleDiscount"
                  name="discount"
                  value={flashSale.discount}
                  onChange={handleFlashSaleChange}
                  className="focus:outline-none bg-gray-300 px-3 py-2 rounded-md text-slate-700 placeholder:text-slate-500"
                  placeholder="Enter discount percentage"
                />

                <label
                  className="font-semibold text-sm"
                  htmlFor="flashSaleEndDate"
                >
                  Flash Sale End Date
                </label>
                <DatePicker
                  id="flashSaleEndDate"
                  selected={flashSale.endDate}
                  onChange={(date) =>
                    setFlashSale((prev) => ({ ...prev, endDate: date }))
                  }
                  className="focus:outline-none bg-gray-300 px-3 py-2 rounded-md text-slate-700 placeholder:text-slate-500"
                  placeholderText="Select end date"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

function UploadImageComponent({ image, setImage, divStyle, index }) {
  const inputRef = useRef(null);

  const handleBtnClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];

    // Validate each file
    const newValidFiles = files.filter((file) =>
      validTypes.includes(file.type)
    );

    console.log(files);
    // If files are valid, update the state
    if (newValidFiles.length > 0) {
      setImage({ files: newValidFiles, index });
    } else {
      alert("Only JPG, JPEG, and PNG files are allowed.");
    }
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/jpeg, image/png, image/jpg"
        multiple
      />
      <div className={`${divStyle}`} onClick={handleBtnClick}>
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            className="w-full object-contain h-full"
            alt="Uploaded"
          />
        ) : (
          <AddIcon fontSize="large" className="text-secondary" />
        )}
      </div>
    </>
  );
}

// export default UploadImageComponent
