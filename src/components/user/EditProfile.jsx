import React, { useCallback, useEffect, useState } from "react";
import { getUserDetails, updateUserProfile } from "../../reducers/user/userAPI";
import { useGlobalState } from "../../reducers/global/GlobalContext";
import { USER_ACTIONS } from "../../reducers/user/userReducer";
import { toast } from "react-toastify";
import CommonForm from "./CommonForm";
import UploadImageComponent from "../templates/UploadImageComponent";
import { uploadImage } from "../../utils/products/uploadImages";

const EditProfile = () => {
  const [userData, setUserData] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useGlobalState();

  const fields = [
    { label: "First Name", name: "firstName", required: true },
    { label: "Last Name", name: "lastName" },
    { label: "Email", name: "email", required: true },
    { label: "Phone Number", name: "phoneNumber", required: true },
  ];

  const handleSetImage = ({ files }) => {
    setImgFile(files[0]);
    setAvatar(URL.createObjectURL(files[0]));
  };

  const fetchUserDetails = useCallback(async () => {
    try {
      setLoading(true);
      const { success, data } = await getUserDetails();
      if (success) {
        setUserData(data);
        const { firstName, lastName, name, email, phoneNumber, avatar } = data;
        let initialData = {
          firstName: firstName || name?.split(" ")[0], // First part is the first name
          lastName: lastName || name?.split(" ").slice(1).join(" "), // Remaining parts are the last name
          email,
          phoneNumber,
        };
        setUserData(initialData);
        setAvatar(avatar);
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
      let ImgUrl = avatar || "";
      if (imgFile) {
        ImgUrl = await uploadImage(imgFile);
        setImgFile(null)
        setAvatar(ImgUrl)
      }
      const updatedData = { ...userData, ...data, avatar: ImgUrl };
      const { success, error } = await updateUserProfile(updatedData);
      if (success) {
        dispatch({ type: USER_ACTIONS.SET_USER_DATA, payload: updatedData });
        toast.success("Updated Successfully", { position: "bottom-center" });
      } else {
        toast.error(error, { position: "top-center" });
      }
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <>
      <p className="text-lg font-bold text-secondary mb-4">Edit Your Profile</p>
      <div className=" flex items-center justify-between gap-5">
        <UploadImageComponent
          image={avatar}
          setImage={handleSetImage}
          imgStyle={`rounded-full ${loading && "opacity-10"}`}
          divStyle="w-[19rem] h-56 rounded-full border border-dashed border-secondary flex justify-center items-center"
        />

        <CommonForm
          onSubmit={onSubmit}
          fields={fields}
          title=""
          loading={loading}
          initialData={userData}
        />
      </div>
    </>
  );
};

export default EditProfile;
