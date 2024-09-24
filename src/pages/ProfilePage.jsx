import React, { useState } from "react";
import { useGlobalState } from "../reducers/global/GlobalContext";
import BreadCrumb from "../AdminDashboard/adminComponent/sidebar/BreadCrumb";

import EditProfile from "../components/user/EditProfile";
import { ProgressBar } from "react-loader-spinner";
import AddressBook from "../components/user/AddressBook";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const {
    state: {
      user: { userData, loading },
    },
    dispatch,
  } = useGlobalState();


  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("profile")



  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <ProgressBar
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <p className="text-lg font-semibold text-gray-400">Please wait I am getting Your Profile</p>
      </div>
    );
  }
  
  return (
    <div className="px-32 py-10 min-h-screen">
      <div className="flex justify-between">
        <BreadCrumb />
        <p className="text-base tracking-wider">
          Welcome!{" "}
          <span className="text-secondary">
            {userData?.firstName && userData?.lastName
              ? `${userData.firstName} ${userData.lastName}`
              : userData?.name || "User"}
          </span>
        </p>
      </div>
      <div className="mt-14 flex ">
        {/* Links */}
        <div className="min-w-40">
          <p className="text-base font-bold mb-2">Manage My Account</p>
          <div className="flex flex-col justify-start items-start ml-5 text-gray-500 gap-2">
            <button onClick={() => setActiveTab("profile")}>My Profile</button>
            <button onClick={() => setActiveTab("address")}>Address Book</button>
            <button onClick={() => setActiveTab("")}>Change Password</button>
          </div>
          <p className="text-base font-bold mb-2 mt-2">Managae My Orders</p>
          <div className="flex flex-col justify-start items-start ml-5 text-gray-500 gap-2">
            <button onClick={() => navigate("/my-orders")}>My Orders</button>
            <button onClick={() => setActiveTab("return")}>My Returns</button>
            <button onClick={() => setActiveTab("cancel")}>My Cancellations</button>
          </div>
        </div>
        <div className="ml-20 border-gray-50 border-2  rounded shadow-md px-10 py-5 w-full">
          { activeTab == 'profile' && <EditProfile /> }
          {activeTab == 'address' && <AddressBook />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
