import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where, writeBatch } from "firebase/firestore";
import { db } from "../../firebase";

export const getCartList = async (userId) => {
  try {
    const cartCollectionRef = collection(db, "users", userId, "cart");
    const querySnapshot = await getDocs(cartCollectionRef);
    
    const cartItems = [];
    querySnapshot.forEach((doc) => {
      cartItems.push({ ...doc.data() });
    });
    return cartItems; // Returning the list of cart items
  } catch (error) {
    console.error("Error fetching cart items: ", error);
    throw new Error("Failed to fetch cart items");
  }
};


export const addToCart = async (userId, cartItem) => {
    try {
      const cartRef = doc(collection(db, "users", userId, "cart"), cartItem.pId);
      await setDoc(cartRef, cartItem);
      console.log("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart: ", error);
      throw new Error("Failed to add item to cart");
    }
  };
  


export const updateCartItem = async (userId, cartItemId, quantity) => {
    try {
      const cartItemRef = doc(db, "users", userId, "cart", cartItemId);
      const cartItemSnap = await getDoc(cartItemRef);
      
      if (cartItemSnap.exists()) {
        await updateDoc(cartItemRef, { quantity });
        console.log("Item quantity updated successfully!");
      } else {
        throw new Error("Item not found in cart");
      }
    } catch (error) {
      console.error("Error updating cart item: ", error);
      throw new Error("Failed to update cart item");
    }
  };
  

export const removeFromCart = async (userId, cartItemId) => {
    try {
      const cartItemRef = doc(db, "users", userId, "cart", cartItemId);
      await deleteDoc(cartItemRef);
      console.log("Item removed from cart successfully!");
    } catch (error) {
      console.error("Error removing item from cart: ", error);
      throw new Error("Failed to remove item from cart");
    }
  };
  


  // Initialize Firestore instance
  
  export async function clearUserCart(userId) {
    const cartRef = collection(db, "users", userId, "cart");
    try {
      // Initialize Firestore batch
      const batch = writeBatch(db);
      
      // Get the cart items
      const cartSnapshot = await getDocs(cartRef);
      
      // Check if query returned documents
      if (cartSnapshot.empty) {
        console.log('No cart items found for user:', userId);
        return;
      }
      
      // Add delete operations to the batch
      cartSnapshot.forEach((doc) => {
        const cartItemRef = doc.ref;
        batch.delete(cartItemRef);
      });
      
      // Commit the batch
      await batch.commit();
      console.log("Cart cleared successfully!");
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw new Error("Failed to clear cart.");
    }

  }
  
