
import { useContext, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import {
  Container,
} from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { Store } from './Store';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import ProtectedRoute from './components/ProtectedRoute';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrdersHistory from './pages/OrdersHistory';
import Layout from './components/Layout';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const {
    state: { mode },
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);



  return (
    <BrowserRouter>
      <>
        <ToastContainer position="bottom-center" limit={1} />
        <main>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='about' element={<About />} />
                <Route path='contact' element={<Contact />} />
              </Route>
              <Route path="product/:slug" element={<ProductPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path='' element={<ProtectedRoute />}>

                <Route path="shipping" element={<ShippingPage />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="placeorder" element={<PlaceOrderPage />} />
                <Route path="/order/:id" element={<OrderPage />} />
                <Route path="/orderhistory" element={<OrdersHistory />} />
              </Route>
            </Routes>
        </main>
        <footer className="text-center">All right reserved.</footer>
      </>
    </BrowserRouter>
  );
}

export default App;
