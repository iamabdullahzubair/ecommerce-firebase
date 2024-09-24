import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdminHome from "./adminPages/AdminHome";
import Sidebar from "./adminComponent/sidebar/Sidebar";
import AdminProducts from "./adminPages/AdminProducts";
import AddProduct from "./adminComponent/products/AddProduct";
import AdminProductDetail from "./adminPages/AdminProductDetail";
import { auth } from "../firebase";
import { useGlobalState } from "../reducers/global/GlobalContext";
import Protected from "../components/authComponent/Protected";

function AdminLayout() {
  const {
    state: {
      user: { userData },
    },
  } = useGlobalState();

  if (userData.role !== "admin") {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="flex min-h-screen dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}

const AdminApp = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <AdminLayout />
            </Protected>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="products" element={<AdminProducts />} />
          <Route
            path="products/product-detail/:id"
            element={<AdminProductDetail />}
          />
          <Route path="products/add-product/" element={<AddProduct />} />
          <Route path="products/add-product/:id" element={<AddProduct />} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminApp;
