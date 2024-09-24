import React, { useCallback, useEffect, useState } from "react";
import CommonForm from "./CommonForm";
import { getUserDetails, updateUserProfile } from "../../reducers/user/userAPI";
import { toast } from "react-toastify";
import { useGlobalState } from "../../reducers/global/GlobalContext";
import { USER_ACTIONS } from "../../reducers/user/userReducer";

const AddressBook = () => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const { dispatch } = useGlobalState();

  const fields = [
    { label: "Street Address", name: "streetAddress", required: true },
    { label: "Apartment, Floor, etc.", name: "apartmentDetails" },
    { label: "Town/City", name: "town", required: true },
    { label: "Pin Code", name: "pincode", required: true },
  ];

  const fetchUserDetails = useCallback(async () => {
    try {
      setLoading(true);
      const { success, data } = await getUserDetails();
      if (success) {
        setUserData(data)
        const { address } = data;
        const addressData = {
          streetAddress: address?.streetAddress || "",
          apartmentDetails: address?.apartmentDetails || "",
          town: address?.town || "",
          pincode: address?.pincode || "",
        };
        setInitialData(addressData)
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const updatedData = { ...userData, address:data};
      const { success, error } = await updateUserProfile(updatedData);
      if (success) {
        dispatch({ type: USER_ACTIONS.SET_USER_DATA, payload: updatedData });
        toast.success("Updated Successfully", {position : "bottom-center"});
      } else {
        toast.error(error, {position : "top-center"});
      }
    } catch (error) {
      toast.error(error.message, {position : "top-center"});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <CommonForm
      onSubmit={onSubmit}
      fields={fields}
      title="Edit Your Address Details"
      loading={loading}
      initialData={initialData} // Pass any initial data if needed
    />
  );
};

export default AddressBook;
