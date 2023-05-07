
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {


  return (
    <BrowserRouter>
      <>
        <header>
          <Navbar bg="dark" expand="lg">
            <Container>
              <Navbar.Brand href="/" className='logo'>
                Super Store
              </Navbar.Brand>
            </Container>
            <Nav >
              <a href='/cart' className='text-white'>Cart</a>
              <a href='/signin' className='text-white'>Sign In</a>
            </Nav>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/product' element={<ProductPage />} />
            </Routes>


          </Container>
        </main>
        <footer className='text-center'>All right reserved.</footer>
      </>
    </BrowserRouter>
  )
}

export default App
