import React, { useEffect, useState } from "react";
import UserService from "../../firebaseServices/userServices";
import { useGlobalState } from "../../reducers/global/GlobalContext";
import UsersListComponent from "../adminComponent/users/UsersList";

const AdminUsersPage = () => {
  const {
    state: {
      user: { userData },
    },
    dispatch,
  } = useGlobalState();

  const UserFirebaseService = new UserService(userData.id);

  const [usersList, setUsersList] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAllUserDetails = async () => {
    setLoading(true);
    try {
      const { success, data, error } = await UserFirebaseService.getAllUsers();
      if (success) {
        setUsersList(data);
        // console.log(data);
      }
      if(error){
        console.log(error)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUserDetails()
  }, []);

  function handleUpdateUser(id, updatedData){
    const newUsersList = usersList.map(user => user.id == id ? updatedData : user)
    setUsersList(newUsersList)
  }

  return (
    <div className="">
      <div className=" dark:text-slate-300 flex justify-between items-center border-b border-slate-700 pb-3 px-40 mt-12">
        <p className="text-2xl  font-bold tracking-wider">All Users List</p>
      </div>
      <div className="mt-10 px-20">
        <UsersListComponent users={usersList} loading={loading} onUpdate={handleUpdateUser} />
      </div>
    </div>
  );
};

export default AdminUsersPage;
