import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PaymentPage from './pages/PaymentPage';
import ProtectedRoute from './components/ProtectedRoute';
import PlaceOrderPage from './pages/PlaceOrderPage';
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
import Profile from './pages/profile';

function App() {
  return (
    <BrowserRouter>
      <>
        <main>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="blogs" element={<Blog />} />
              <Route path="compare" element={<CompareProduct />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
              <Route path="product/:id" element={<ProductPage />} />
              <Route path="blog/:id" element={<BlogPage />} />
              <Route path="store" element={<OurStore />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="refund-policy" element={<RefundPolicy />} />
              <Route path="term-conditions" element={<TermsAndConditions />} />
              <Route path="shipping-policy" element={<ShippingPolicy />} />
              <Route path="" element={<ProtectedRoute />}>
                <Route path='profile-page' element={<Profile />} />
                <Route path="wishlist" element={<WishList />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="placeorder" element={<PlaceOrderPage />} />
                <Route path="/order/:id" element={<OrderPage />} />
                <Route path="/orderhistory" element={<OrdersHistory />} />
              </Route>
            </Route>
          </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
