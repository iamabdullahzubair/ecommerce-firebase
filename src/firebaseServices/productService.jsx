import { db } from "../firebase"; // Import Firebase instance
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  limit,
  orderBy,
  where,
  startAfter,
} from "firebase/firestore"; // Import Firestore methods
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

class ProductService {
  constructor() {
    this.productsCollection = collection(db, "products"); // Define the products collection reference
    this.categoryCollection = collection(db, "categories");
  }

  // Add a new product
  async addProduct(productData) {
    try {
      const docRef = await addDoc(this.productsCollection, productData); // Add product to Firestore
      return {
        success: true,
        productId: docRef.id, // Return the new product ID
      };
    } catch (error) {
      return {
        success: false,
        message: error.message, // Return error message if something goes wrong
      };
    }
  }

  // Upload product image to Firebase Storage
  async uploadProductImage(file) {
    try {
      const storageRef = ref(storage, `products/${file.name}`); // Create a reference to the storage location
      await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
      const downloadURL = await getDownloadURL(storageRef); // Get the download URL of the uploaded file
      return {
        success: true,
        imageUrl: downloadURL, // Return the download URL
      };
    } catch (error) {
      return {
        success: false,
        message: error.message, // Handle any errors
      };
    }
  }
  // Fetch a single product by ID
  async getProduct(productId) {
    try {
      const productRef = doc(this.productsCollection, productId); // Get document reference for the specific product
      const productSnap = await getDoc(productRef); // Fetch the document from Firestore

      if (productSnap.exists()) {
        return {
          success: true,
          data: productSnap.data(), // Return the product data
        };
      } else {
        return {
          success: false,
          message: "No such product found!", // If product doesn't exist
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message, // Handle any errors
      };
    }
  }

  // Fetch all products
  async getAllProducts() {
    try {
      const productsSnapshot = await getDocs(this.productsCollection); // Fetch all documents from the products collection
      const productList = productsSnapshot.docs.map((doc) => ({
        pId: doc.id,
        ...doc.data(),
      }));
      return {
        success: true,
        data: productList, // Return the list of products
      };
    } catch (error) {
      return {
        success: false,
        message: error.message, // Handle any errors
      };
    }
  }

  // Fetch all products with filtering, sorting, and pagination
  async getFilteredProducts({
    limitCount = 10,
    startAfterDoc,
    filterField,
    filterValue,
    sortField,
    sortOrder = "asc",
  }) {
    try {
      console.log("Building query for products...");
      let productsQuery = query(this.productsCollection);

      // Apply filter if provided
      if (filterField && filterValue) {
        productsQuery = query(
          productsQuery,
          where(filterField, "==", filterValue)
        );
      }

      // Apply sorting
      if (sortField) {
        productsQuery = query(productsQuery, orderBy(sortField, sortOrder));
      }

      // Apply pagination limit
      if (limitCount) {
        productsQuery = query(productsQuery, limit(limitCount));
      }

      // If startAfter is provided, use it for pagination
      if (startAfterDoc) {
        productsQuery = query(
          productsQuery,
          limit(limitCount),
          startAfter(startAfterDoc)
        ); // Ensure startAfter is valid
      }

      console.log("Executing Firestore query...");
      const productsSnapshot = await getDocs(productsQuery);
      const productList = productsSnapshot.docs.map((doc) => ({
        pId: doc.id,
        ...doc.data(),
      }));

      return {
        success: true,
        data: productList,
      };
    } catch (error) {
      console.error("Error fetching products from Firestore:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // Update a product by ID
  async updateProduct(productId, updatedData) {
    try {
      const productRef = doc(this.productsCollection, productId); // Get reference to the product document
      await updateDoc(productRef, updatedData); // Update the product data in Firestore
      return {
        success: true,
        message: "Product updated successfully", // Success message
      };
    } catch (error) {
      return {
        success: false,
        message: error.message, // Handle any errors
      };
    }
  }

  // Delete a product by ID
  async deleteProduct(productId) {
    try {
      const productRef = doc(this.productsCollection, productId); // Get reference to the product document
      await deleteDoc(productRef); // Delete the product from Firestore
      return {
        success: true,
        message: "Product deleted successfully", // Success message
      };
    } catch (error) {
      return {
        success: false,
        message: error.message, // Handle any errors
      };
    }
  }

  //   category section

  async addCategory(category) {
    try {
      const docRef = await addDoc(this.category, category); // Add product to Firestore
      return {
        success: true,
        categoryId: docRef.id, // Return the new product ID
      };
    } catch (error) {
      return {
        success: false,
        message: error.message, // Return error message if something goes wrong
      };
    }
  }

   // Fetch all categories
   async getAllCategories() {
    try {
      const categorySnapshot = await getDocs(this.categoryCollection); // Fetch all documents from the products collection
      const categoryList = categorySnapshot.docs.map((doc) => ({
        categoryId: doc.id,
        ...doc.data(),
      }));
      return {
        success: true,
        data: categoryList, // Return the list of products
      };
    } catch (error) {
      return {
        success: false,
        message: error.message, // Handle any errors
      };
    }
  }

}

export default ProductService;
