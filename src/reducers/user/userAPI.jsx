import { auth } from "../../firebase";
import UserService from "../../firebaseServices/userServices";

export async function getUserDetails() {
  const user = auth.currentUser;
  if (!user) {
    console.log("User is not authenticated, redirect to login");
    return { success: false, message: "User not authenticated" };
  }
  try {
    const service = new UserService(user.uid);
    const { success, data, error } = await service.getUserDetails();
    if (error) return { success: false, error };
    if (!success) return { success: false };
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateUserProfile(updatedData) {
  const user = auth.currentUser;
  if (!user) {
    console.log("User is not authenticated, redirect to login");
    return { success: false, message: "User not authenticated" };
  }
  try {
    const service = new UserService(user.uid);
    const { success, error } = await service.updateUserProfile(updatedData);
    if (success) return { success: true };
    if (error) return { success: false, error };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
