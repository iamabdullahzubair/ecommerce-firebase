import React from "react";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import AdminApp from "./AdminDashboard/AdminApp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetailCard from "./components/products/ProductDetailCard";
import Footer from "./components/footer/Footer";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import Protected from "./components/authComponent/Protected";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import PaymentSuccess from "./components/checkout/PaymentSuccess";
import MyOrdersPage from "./pages/MyOrdersPage";
import NotFoundPage from "./pages/NotFoundPage";

function PublicLayOut() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public/User Routes */}
          <Route path="/" element={<PublicLayOut />}>
            <Route index element={<Home />} />
            <Route path="products" element={<ProductsPage />} />
            <Route
              path="products/product-detail/:id"
              element={<ProductDetailCard />}
            />
            <Route
              path="products/product-detail/checkout/:id"
              element={
                <Protected>
                  <CheckoutPage />
                </Protected>
              }
            />
            <Route
              path="cart"
              element={
                <Protected>
                  <CartPage />
                </Protected>
              }
            />
            <Route
              path="cart/checkout"
              element={
                <Protected>
                  <CheckoutPage />
                </Protected>
              }
            />
            <Route
              path="order-success/:id"
              element={
                <Protected>
                  <PaymentSuccess />
                </Protected>
              }
            />
            <Route
              path="my-orders"
              element={
                <Protected>
                  <MyOrdersPage />
                </Protected>
              }
            />
            <Route
              path="profile"
              element={
                <Protected>
                  <ProfilePage />
                </Protected>
              }
            />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
