import { useState } from "react";
import { updateUsersProfile } from "../../../reducers/user/userAPI";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChangeUserRoleModal from "./ChangeUserRoleModal";

const UserDetailModal = ({ user, onUpdate, onClose }) => {
  const {
    firstName,
    lastName,
    name,
    phoneNumber,
    address,
    role,
    avatar,
    email,
  } = user;


  const [openModal, setOpenModal] = useState(null)
    const [loading, setLoading] = useState(false)

  function handleOpenMoadal(){
    setOpenModal(true)
  }
  function handleCloseModal(){
    setOpenModal(null)
  }

  async function handleChangeUserRole(selectedRole) {
      if(selectedRole != role){
        setLoading(true)
        try {
           const updatedUser = {...user, role: selectedRole} 
           const {success} = await updateUsersProfile(updatedUser,user.id)
           if(success){
            onUpdate(user.id, updatedUser)
            handleCloseModal()
           }
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }
    else {
        handleCloseModal()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-96 p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-400"
        >
          &times;
        </button>

        {/* User Avatar */}
        <div className="flex justify-center mb-6">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <AccountCircleIcon fontSize="large" className="w-24 h-24  text-gray-400" />
          )}
        </div>

        {/* User Name */}
        <h2 className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {name}
        </h2>

        {/* User Email */}
        <p className="text-center text-gray-600 dark:text-gray-300">{email}</p>

        {/* User Status */}
        <div className="flex justify-center items-center mt-4">
          <p
            className={`text-sm font-medium ${
              user?.status === "Active" ? "text-green-500" : "text-red-500"
            }`}
          >
            {user?.status}
          </p>
        </div>

        {/* Additional Information */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <p className="font-semibold text-gray-600 dark:text-gray-300">
              First Name:
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {firstName || "Not Available"}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold text-gray-600 dark:text-gray-300">
              Last Name:
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {lastName || "Not Available"}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold text-gray-600 dark:text-gray-300">
              Phone:
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {phoneNumber || "Not Available"}
            </p>
          </div>
          <UserAddress address={address} />
          <div className="flex justify-between">
            <p className="font-semibold text-gray-600 dark:text-gray-300">
              Role:
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span>{role || "Not Available"} </span>
              <button onClick={handleOpenMoadal} className="bg-secondary px-2 py-1.5  rounded text-sm font-semibold">{loading ? "Updating" : "Update"}</button>
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      {openModal && <ChangeUserRoleModal role={role} onClose={handleCloseModal} onConfirm={handleChangeUserRole} loading={loading} />}
    </div>
  );
};

export default UserDetailModal;

function UserAddress({ address }) {
    if (address) {
      const { apartmentDetails, pincode, streetAddress, town } = address
    return (
      <>
        <div className="flex justify-between">
          <p className="font-semibold text-gray-600 dark:text-gray-300">
            Apartment:
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {apartmentDetails || "Not Available"}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="font-semibold text-gray-600 dark:text-gray-300">
            Street Address:
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {streetAddress || "Not Available"}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="font-semibold text-gray-600 dark:text-gray-300">
            Town:
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {town || "Not Available"}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="font-semibold text-gray-600 dark:text-gray-300">
            Pin Code:
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {pincode || "Not Available"}
          </p>
        </div>
      </>
    );
  }
}

