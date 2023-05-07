import { Col, Row } from 'react-bootstrap';
import { Products } from '../data';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <Row>
        {Products.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <Link to={'/product' + product.slug}>
              <img className="imgP" src={product.image} alt={product.name} />

              <h2>{product.name}</h2>
              <p>${product.price}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
