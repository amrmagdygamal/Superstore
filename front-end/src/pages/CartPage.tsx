import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import MessageBox from '../components/MessageBox';
import { CartItem } from '../types/Cart';

const CartPage = () => {
  const navigate = useNavigate();

  const {
    state: {
      cart: { cartItems },
      mode,
    },
    dispatch,
  } = useContext(Store);

  const updateCartHandler = (item: CartItem, quantity: number) => {
    if (item.countInStock < quantity) {
      toast.warn('Sorry Product is out of stock');
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
    toast.success('Item Added to the Cart');
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  const removeitemHandler = (item: CartItem) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item})
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item: CartItem) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded thumbnail"
                      ></img>
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant={mode}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      {'  '}
                      <span>{item.quantity}</span>
                      {'  '}
                      <Button
                        variant={mode}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>

                    <Col md={3}>
                      <span>{item.price}</span>
                    </Col>
                    <Col md={2}>
                      <Button 
                        onClick={() => removeitemHandler(item)}
                        variant={mode}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                      <span>{item.price}</span>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    {'  '}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
