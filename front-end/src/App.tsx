
import { Products } from './data'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'

function App() {


  return (
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

          <Row>
            {Products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3}>
                <img
                  className='imgP'
                  src={product.image}
                  alt={product.name}
                />

                <h2>{product.name}</h2>
                <p>${product.price}</p>
              </Col>

            ))}
          </Row>
        </Container>
      </main>
      <footer className='text-center'>All right reserved.</footer>
    </>
  )
}

export default App
