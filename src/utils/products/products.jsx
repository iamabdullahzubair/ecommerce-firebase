// src/utils/addProduct.js
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  limit,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { PRODUCT_ACTIONS } from "../../reducers/products/productsReducer";
import { deleteObject, ref } from "firebase/storage";

export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Function to fetch products
export const fetchAllProducts = async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ACTIONS.SET_LOADING });

    // Reference to the products collection
    const productsCollection = collection(db, "products");

    // Fetch all documents from the collection
    const productsSnapshot = await getDocs(productsCollection);

    // Map over the documents to get data and add ID
    const productsList = productsSnapshot.docs.map((doc) => ({
      pId: doc.id,
      ...doc.data(),
    }));

    // Dispatch action to update the global state with the fetched products
    dispatch({ type: PRODUCT_ACTIONS.SET_PRODUCTS, payload: productsList });
  } catch (error) {
    // Handle errors and update the global state with error information
    dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: error.message });
    console.error("Error fetching products:", error);
  }
};

export const fetchProduct = async (productId) => {
  try {
    const docRef = doc(db, "products", productId); // "products" is the collection name
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (err) {
    console.error("Error fetching product:", err);
  }
};

export const updateProductInFirestore = async (
  productId,
  updatedProductData
) => {
  try {
    // Reference to the product document
    const productRef = doc(db, "products", productId);

    // Update the product document with the new data
    await updateDoc(productRef, updatedProductData);

    console.log("Product updated successfully");
  } catch (error) {
    console.error("Error updating product: ", error);
  }
};

export const deleteProduct = async (productId, product) => {
  // console.log(productId, product)
  try {
    // 1. Delete the product document from Firestore
    await deleteDoc(doc(db, "products", productId));

    // 2. Delete the thumbnail from Firebase Storage
    const thumbnailRef = ref(storage, product.thumbnail);
    await deleteObject(thumbnailRef);

    // 3. Delete each image in the images array from Firebase Storage
    const imageDeletionPromises = product.images.map((imageUrl) => {
      const imageRef = ref(storage, imageUrl);
      return deleteObject(imageRef);
    });

    // Wait for all image deletions to complete
    await Promise.all(imageDeletionPromises);

    console.log("Product and associated images deleted successfully!");
    return true;
  } catch (error) {
    console.error("Error deleting product: ", error);
    return false;
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("category", "==", category));

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => doc.data());
    console.log(products)
  } catch (error) {
    console.log("Error Occurred fetchProductsByCategory :: " ,error.message)
  }

};

 

export const fetchLimitedProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, limit(5));
  
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => doc.data());
    console.log(products)
  } catch (error) {
   console.log("Error Occured fetchLimitedProducts :: ", error.message) 
  }

};

export const fetchFilteredAndSortedProducts = async (minPrice, maxPrice) => {
  try {
    const productsRef = collection(db, "products");
    const q = query(
      productsRef,
      where("price", ">=", minPrice),
      where("price", "<=", maxPrice),
      orderBy("rating", "desc")
    );
  
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => doc.data());
  
    console.log(products);
  } catch (error) {
    console.log("Error Occured fetchFilteredAndSortedProducts :: ", error.message) 

  }


};






