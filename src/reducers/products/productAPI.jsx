import ProductService from "../../firebaseServices/productService";

const productService = new ProductService();

// API to add a new product
// API to add a new product with multiple image uploads
export const addProduct = async (productData, files) => {
    try {
        const imageUrls = [];  // Array to store image URLs

        // Step 1: Upload each product image to Firebase Storage
        for (const file of files) {
            const imageResponse = await productService.uploadProductImage(file);
            if (imageResponse.success) {
                imageUrls.push(imageResponse.imageUrl);  // Store the image URL
            } else {
                return {
                    success: false,
                    message: imageResponse.message,  // Return the error message for the first failed upload
                };
            }
        }

        // Step 2: Add the product to Firestore with the array of image URLs
        const productWithImages = {
            ...productData,
            thumbnail : imageUrls[0],
            imageUrls: imageUrls,  // Include the array of image URLs in the product data
        };
        const productResponse = await productService.addProduct(productWithImages);
        if(productResponse.success){
            productWithImages.pId = productResponse.productId
            return {
                success : true,
                product : productWithImages
            }
        }
        return {success : false, message : "Failed to add product"};  // Return response from the service
    } catch (error) {
        return {
            success: false,
            message: error.message,  // Handle any errors
        };
    }
};

// API to fetch a single product by ID
export const fetchProductById = async (productId) => {
    try {
        const response = await productService.getProduct(productId);
        if (response.success) {
            return {
                success: true,
                data: response.data,  // Return the product data if successful
            };
        }
        return { success: false, message: "Product not found" };
    } catch (error) {
        return {
            success: false,
            message: error.message,  // Handle any errors
        };
    }
};

// API to fetch all products
export const fetchAllProducts = async () => {
    try {
        const response = await productService.getAllProducts();
        if (response.success) {
            return {
                success: true,
                productList: response.data,  // Return the product list if successful
            };
        }
        return { success: false, message: "Failed to fetch products" };
    } catch (error) {
        return {
            success: false,
            message: error.message,  // Handle any errors
        };
    }
};

// API to get filtered products
export const fetchFilteredProducts = async ({ limitCount = 10, filterField, filterValue, sortField, sortOrder = "asc", startAfterDoc }) => {
    try {
        console.log("Fetching products with filter:", { limitCount, filterField, filterValue, sortField, sortOrder, startAfterDoc });
        const response = await productService.getFilteredProducts({
            limitCount,
            filterField,
            filterValue,
            sortField,
            sortOrder,
            startAfterDoc,
        });

        console.log("Response from API:", response);
        if (response.success) {
            return {
                success: true,
                productList: response.data,
            };
        }
        return { success: false, message: "Failed to fetch products" };

    } catch (error) {
        console.error("Error fetching products:", error);
        return {
            success: false,
            message: error.message,
        };
    }
};

// API to update a product by ID
export const updateProduct = async (productId, updatedData) => {
    try {
        const response = await productService.updateProduct(productId, updatedData);
        if (response.success) {
            return {
                success: true,
                message: "Product updated successfully",  // Return success message if successful
            };
        }
        return { success: false, message: "Failed to update product" };
    } catch (error) {
        return {
            success: false,
            message: error.message,  // Handle any errors
        };
    }
};

// API to delete a product by ID
export const deleteProduct = async (productId) => {
    try {
        const response = await productService.deleteProduct(productId);
        if (response.success) {
            return {
                success: true,
                message: "Product deleted successfully",  // Return success message if successful
            };
        }
        return { success: false, message: "Failed to delete product" };
    } catch (error) {
        return {
            success: false,
            message: error.message,  // Handle any errors
        };
    }
};


//  Category Api


// API to fetch all products
export const fetchAllCategories = async () => {
    try {
        const response = await productService.getAllCategories();
        if (response.success) {
            return {
                success: true,
                categoryList: response.data,  // Return the product list if successful
            };
        }
        return { success: false, message: "Failed to fetch categories" };
    } catch (error) {
        return {
            success: false,
            message: error.message,  // Handle any errors
        };
    }
};