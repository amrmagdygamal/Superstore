import { useContext, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import {
  Badge,
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import { LinkContainer } from 'react-router-bootstrap';
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

function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const switchModelHandler = () => {
    dispatch({ type: 'SWITCH_MODE' });
  };

  const signOutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethoud');
    window.location.href = '/';
  };

  return (
    <BrowserRouter>
      <>
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="logo">Super Store</Navbar.Brand>
              </LinkContainer>
            </Container>
            <Nav>
              <Button variant={mode} onClick={switchModelHandler}>
                <i
                  className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
                ></i>
              </Button>
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.username} id="basic-nav-dropdown">
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <Link
                    className="dropdown-item l--10"
                    to="#signout"
                    onClick={signOutHandler}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link" to="/login">
                  Sign In
                </Link>
              )}
            </Nav>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
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
          </Container>
        </main>
        <footer className="text-center">All right reserved.</footer>
      </>
    </BrowserRouter>
  );
}

export default App;
