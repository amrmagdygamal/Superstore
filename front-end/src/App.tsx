import { useContext, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import { LinkContainer } from 'react-router-bootstrap';
import ProductPage from './pages/ProductPage';
import { Store } from './Store';
import CartPage from './pages/CartPage';

function App() {
  const {
    state: { mode, cart },
    dispatch,
  } = useContext(Store);


  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const switchModelHandler = () => {
    dispatch({ type: 'SWITCH_MODE'})
  }

  return (
    <BrowserRouter>
      <>
      <ToastContainer position='bottom-center' limit={1} />
        <header>
          <Navbar bg="dark" expand="lg">
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand className="logo">
                  Super Store
                </Navbar.Brand>
              </LinkContainer>
            </Container>
            <Nav>
              <Button variant={mode} onClick={switchModelHandler}>
                <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
              </Button>
              <Link to="/cart" className="text-white">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a,c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
              <Link to="/signin" className="text-white">
                Sign In
              </Link>
            </Nav>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="product/:slug" element={<ProductPage />} />
              <Route path="cart" element={<CartPage />} />
            </Routes>
          </Container>
        </main>
        <footer className="text-center">All right reserved.</footer>
      </>
    </BrowserRouter>
  );
}

export default App;
