import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { Store } from './Store';

function App() {
  const {
    state: { mode },
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
        <header>
          <Navbar bg="dark" expand="lg">
            <Container>
              <Navbar.Brand href="/" className="logo">
                Super Store
              </Navbar.Brand>
            </Container>
            <Nav>
              <Button variant={mode} onClick={switchModelHandler}>
                <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
              </Button>
              <a href="/cart" className="text-white">
                Cart
              </a>
              <a href="/signin" className="text-white">
                Sign In
              </a>
            </Nav>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="product/:slug" element={<ProductPage />} />
            </Routes>
          </Container>
        </main>
        <footer className="text-center">All right reserved.</footer>
      </>
    </BrowserRouter>
  );
}

export default App;
