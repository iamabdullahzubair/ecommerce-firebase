import React, { useEffect, useState } from "react";
import { useGlobalState } from "../reducers/global/GlobalContext";
import Products from "../components/products/Products";
import { fetchAllCategories, fetchAllProducts, fetchFilteredProducts } from "../reducers/products/productAPI";
import  categories from "../localstore/categories";
import CustomRadioButton from "../components/templates/CustomRadioButton";

const banner = "/assets/banner/banner.png";

function ProductsPage() {
  const {
    state: {
      productsGlobal: { products , },
    },
  } = useGlobalState();
  // const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productState, setProductState] = useState(null);
  const [sort, setSort] = useState();
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(false)

  async function fetchProducts(filter) {
    
    setLoading(true)
    console.log("products page :: ");
    try {
        const { success, productList, message } = await fetchFilteredProducts(filter);
        console.log("Fetch result:", { success, productList, message });
        
        if (success) {
            console.log("Fetched product list:", productList);
            setProductState(productList)
            setLoading(false)
        } else {
            console.warn("Fetch failed with message:", message);
            setLoading(false)
        }
    } catch (error) {
        console.error("Error in fetchProducts:", error);
    }
    finally{
      setLoading(false)
    }
}

// async function fetchCategories() {
//   try {
//     const {success, categoryList, message } = await fetchAllCategories()
//     if(success){
//       setCategories(categoryList)

//       return
//     }
//     console.log(message)
//   } catch (error) {
//     console.log(error)
//   }
// }

useEffect(() => {
    if(selectedCategory == "all"){
      setSelectedCategory(null)
    }
    let filter = { limitCount: limit, filterField: "category", filterValue:selectedCategory  };
    if(sort){
       filter = { ...filter,   sortField: "price", sortOrder: sort ,   };
    }
    console.log(filter)
    fetchProducts(filter);

  }, [limit, selectedCategory, sort]); 

  return (
    <div className="min-h-screen">
      <div className="bg-[#1f1f1f] min-w-full text-gray-300 flex justify-center overflow-hidden">
        <img className="scale-110" src={banner} alt="banner image" />
      </div>

      <div className="flex md:px-20 flex-row  ">
        <div className="lg:mt-14 mt-8 bg-gray-100 dark:bg-gray-800 pl-4 pr-8 py-5 w-64 h-full  rounded shadow-md hidden md:block">
          <p className="text-xl font-semibold mb-12">Filter Section</p>
          <p className="text-base font-semibold mb-2">Choose Category</p>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="focus:outline-none text-gray-600 mb-5 bg-transparent"
            name="categories"
            id="categories"
          >
            <option value="all"> All categories </option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <p className="text-base font-semibold mb-2">Sort by Price</p>
          <div className="flex gap-2 text-gray-600">
            <CustomRadioButton label={"Low to High"} value={"asc"} selectedOption={sort} setSelectedOption={setSort}  />
            
          </div>
          <div className="flex gap-2 text-gray-600">
          <CustomRadioButton label={"High to Low"} value={"desc"} selectedOption={sort} setSelectedOption={setSort}  />
          </div>
        </div>
        <div className="flex items-center justify-center flex-1">
          <Products
            products={productState ? productState : products}
            showViewAllBtn={false}
            divStyle="lg:pl-10 lg:min-w-[70rem]"
            loading={loading}
            notToShowTitle = {true}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
