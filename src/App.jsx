import React, { lazy, Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FallbackUI from "./components/templates/FallbackUI";

const Navbar = lazy(() => import("./components/navbar/Navbar"));
const Home = lazy(() => import("./pages/Home"));
const SignupPage = lazy(() => import("./pages/auth/SignupPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const AdminApp = lazy(() => import("./AdminDashboard/AdminApp"));
const ProductDetailCard = lazy(() => import("./components/products/ProductDetailCard"));
const Footer = lazy(() => import("./components/footer/Footer"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const Protected = lazy(() => import("./components/authComponent/Protected"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PaymentSuccess = lazy(() => import("./components/checkout/PaymentSuccess"));
const MyOrdersPage = lazy(() => import("./pages/MyOrdersPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function PublicLayOut() {
  return (
    <>
      <Suspense fallback={<FallbackUI />}>
        <Navbar />
        <Outlet />
        <Footer />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<FallbackUI />}>
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
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;