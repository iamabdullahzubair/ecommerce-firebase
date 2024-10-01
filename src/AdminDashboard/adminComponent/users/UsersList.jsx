import CircularProgress from "@mui/material/CircularProgress"; // MUI Spinner
import { useState } from "react";
import UserDetailModal from "./UserDetailModal";

function UsersListComponent({ users, loading, onUpdate }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const handleGetDetails = (user) => {
    setSelectedUser(user); // Set the selected user to display details
  };

  const closeModal = () => {
    setSelectedUser(null); // Close the modal
  };

  function handleUpdate(id, updatedUser){
    setSelectedUser(updatedUser)
    onUpdate(id, updatedUser)
  }

  return (
    <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      {/* Table Header */}
      <div className="flex justify-start items-center bg-gray-300 dark:bg-gray-700 p-4 rounded-md">
        <p className="flex-1 text-center font-semibold">Sr</p>
        <p className="flex-1 text-center font-semibold">Image</p>
        <p className="flex-1 text-center font-semibold">Name</p>
        <p className="flex-1 text-center font-semibold">Status</p>
        <span className="flex-1"></span> {/* Empty space for the button */}
      </div>
      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center flex-col items-center p-4">
          <CircularProgress className="text-gray-500 dark:text-gray-400" />
          <p className="ml-2 text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      ) : users?.length === 0 ? (
        // No Users Found
        <div className="flex justify-center items-center p-4">
          <p className="text-gray-500 dark:text-gray-400">No users found.</p>
        </div>
      ) : (
        // Users List
        users &&
        users?.map((user, index) => (
          <div
            key={user.id}
            className="flex justify-start items-center p-2 border-b border-gray-300 dark:border-gray-600"
          >
            <p className="flex-1 text-center">{index + 1}</p>
            <div className="flex-1 flex justify-center">
              <img
                src={user.avatar || "https://via.placeholder.com/50"}
                alt="userimage"
                className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
              />
            </div>
            <p className="flex-1 text-center">{user.name}</p>
            <p
              className={`flex-1 text-center ${
                user.status === "Active" ? "text-green-500" : "text-red-500"
              }`}
            >
              {user.status}
            </p>
            <button
              onClick={() => handleGetDetails(user)}
              className="flex-1 text-blue-500 hover:underline"
            >
              Get Details
            </button>
          </div>
        ))
      )}
      {/* Modal to show user details */}
      {selectedUser && <UserDetailModal user={selectedUser} onClose={closeModal} onUpdate={handleUpdate} />}
    </div>
  );
}

export default UsersListComponent;
