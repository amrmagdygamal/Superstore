import { Col, Row } from 'react-bootstrap';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import ProductItem from '../components/ProductItem';
import { Helmet } from 'react-helmet-async';
import { useGetProductsQuery } from '../hooks/productHooks';
import { ApiError } from '../types/ApiErrors';
import { getError } from '../utils';



const HomePage = () => {

  const { data: products, isLoading, error } = useGetProductsQuery();

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <>
      <Row>
        <Helmet>
          <title>Super Store</title>
        </Helmet>
        {products!.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
