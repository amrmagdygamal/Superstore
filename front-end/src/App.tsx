import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
// import PaymentPage from './pages/PaymentPage';
// import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrdersHistory from './pages/OrdersHistory';
import Layout from './components/Layout';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from './pages/OurStore';
import Blog from './pages/Blog';
import CompareProduct from './pages/CompareProduct';
import WishList from './pages/WishList';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import BlogPage from './pages/BlogPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import Checkout from './pages/Checkout';

import Profile from './pages/Profile';
import { ProtectedRoute } from './components/ProtectedRoute';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <>
        <main>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="home" element={<HomePage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="blogs" element={<Blog />} />
              <Route path="compare" element={<CompareProduct />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
              <Route path="product/:id" element={<ProductPage />} />
              <Route path="blog/:id" element={<BlogPage />} />
              <Route path="store" element={<OurStore />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="refund-policy" element={<RefundPolicy />} />
              <Route path="term-conditions" element={<TermsAndConditions />} />
              <Route path="shipping-policy" element={<ShippingPolicy />} />
              <Route path="profile-page" element={<ProtectedRoute><Profile  /></ProtectedRoute>} />
              <Route path="wishlist" element={<ProtectedRoute><WishList  /></ProtectedRoute>} />
              <Route path="cart" element={<ProtectedRoute><CartPage  /></ProtectedRoute>} />
              <Route path="checkout" element={<ProtectedRoute><Checkout  /></ProtectedRoute>} />
              {/* <Route path="payment" element={<ProtectedRoute><PaymentPage  /></ProtectedRoute>} /> */}
              {/* <Route path="placeorder" element={<ProtectedRoute><PlaceOrderPage  /></ProtectedRoute>} /> */}
              <Route path="/order/:id" element={<ProtectedRoute><OrderPage  /></ProtectedRoute>} />
              <Route path="/orderhistory" element={<ProtectedRoute><OrdersHistory  /></ProtectedRoute>} />
            </Route>
          </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
