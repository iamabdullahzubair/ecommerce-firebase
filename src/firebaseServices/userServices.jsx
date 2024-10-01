import { collection, doc, setDoc, getDoc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";


class UserService {
  constructor(userId) {
    this.userId = userId;
    this.usersCollection = collection(db, "users");
  }

  // Fetch all user details
  async getAllUsers() {
    try {
      const usersSnapshot = await getDocs(this.usersCollection); // Fetch all documents from the products collection
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return {
        success: true,
        data: usersList, // Return the list of products
      };
    } catch (error) {
      console.error("Error fetching user details:", error);
      return { success: false, error: error.message };
    }
  }
  // Fetch user details by userId
  async getUserDetails() {
    try {
      const userDoc = doc(this.usersCollection, this.userId);
      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) {
        throw new Error("User not found");
      }

      return { success: true, data: userSnapshot.data() };
    } catch (error) {
      console.error("Error fetching user details:", error);
      return { success: false, error: error.message };
    }
  }

  // Update user profile (e.g., name, email, etc.)
  async updateUserProfile(updatedData) {
    try {
      const userDoc = doc(this.usersCollection, this.userId);
      await updateDoc(userDoc, updatedData);
      return { success: true };
    } catch (error) {
      console.error("Error updating user profile:", error);
      return { success: false, error: error.message };
    }
  }
  // for admin
  async updateUsersProfile(updatedData, userId) {
    try {
      const userDoc = doc(this.usersCollection, userId);
      await updateDoc(userDoc, updatedData);
      return { success: true };
    } catch (error) {
      console.error("Error updating user profile:", error);
      return { success: false, error: error.message };
    }
  }

  // Add a new address for the user
  async addUserAddress(addressData) {
    try {
      const userDoc = doc(this.usersCollection, this.userId);
      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) {
        throw new Error("User not found");
      }

      const userData = userSnapshot.data();
      const updatedAddresses = [...(userData.addresses || []), addressData];

      await updateDoc(userDoc, { addresses: updatedAddresses });
      return { success: true };
    } catch (error) {
      console.error("Error adding user address:", error);
      return { success: false, error: error.message };
    }
  }

  // Get all addresses of the user
  async getUserAddresses() {
    try {
      const userDoc = doc(this.usersCollection, this.userId);
      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) {
        throw new Error("User not found");
      }

      const userData = userSnapshot.data();
      return { success: true, addresses: userData.addresses || [] };
    } catch (error) {
      console.error("Error fetching user addresses:", error);
      return { success: false, error: error.message };
    }
  }

  // Delete a user address
  async deleteUserAddress(addressId) {
    try {
      const userDoc = doc(this.usersCollection, this.userId);
      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) {
        throw new Error("User not found");
      }

      const userData = userSnapshot.data();
      const updatedAddresses = (userData.addresses || []).filter((address) => address.id !== addressId);

      await updateDoc(userDoc, { addresses: updatedAddresses });
      return { success: true };
    } catch (error) {
      console.error("Error deleting user address:", error);
      return { success: false, error: error.message };
    }
  }
}

export default UserService;
