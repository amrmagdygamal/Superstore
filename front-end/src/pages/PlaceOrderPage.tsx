import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../hooks/orderHooks';
import { getError } from '../utils';
import { ApiError } from '../types/ApiErrors';
import { toast } from 'react-toastify';
import CheckOutSteps from '../components/CheckOutSteps';
import { Helmet } from 'react-helmet-async';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import LoadingBox from '../components/LoadingBox';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const cartState = useSelector((state: any) => state.user.cart);


  const round2 = (num: number) => Number(num.toFixed(2));



  const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation();

  const PlaceOrderHandler = async () => {
    try {
      const data = await createOrder({
        orderItems: cartState?.products,
        shippingAddress: cartState?.shippingAddress,
        paymentMethod: cartState?.paymentMethod,
        itemsPrice: cartState?.itemsPrice,
        shippingPrice: cartState?.shippingPrice,
        taxPrice: cartState?.taxPrice,
        totalPrice: cartState?.totalPrice,
      });
      dispatch({ type: 'CLEAR_CART' });
      localStorage.removeItem('products');
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

  useEffect(() => {
    if (!cartState?.paymentMethod) {
      navigate('/payment');
    }
  }, [cartState, navigate])

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 ></CheckOutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className='my-3'>Preview Order</h1>

      <Row>
        <Col md={8}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {cartState?.shippingAddress.fullName} <br />
                <strong>Address:</strong> {cartState?.shippingAddress.address}
                {cartState?.shippingAddress.city}, {cartState?.shippingAddress.address},
                {cartState?.shippingAddress.country}, {cartState?.shippingAddress.postalCode},
                {cartState?.shippingAddress.country}
              </Card.Text>
              <Link to='/shipping'>Edit</Link>
            </Card.Body>
          </Card>

          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {cartState?.paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cartState?.products.map((product: any) =>(
                  <ListGroup.Item key={product?.product_id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={product?.images}
                          alt={product?.name}
                          className="img-fluid rounded thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${product?.slug}`}>{product?.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{product?.quantity}</span>
                      </Col>
                      <Col md={3}>${product?.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${cartState?.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${cartState?.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cartState?.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Order Total</Col>
                    <Col>${cartState?.totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type='button'
                      onClick={PlaceOrderHandler}
                      disabled={cartState?.products.length === 0 || isLoading}
                    >
                      Place Order
                    </Button>
                    {isLoading && <LoadingBox></LoadingBox>}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
};

export default PlaceOrderPage;
