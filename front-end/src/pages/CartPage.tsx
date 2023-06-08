import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import MessageBox from '../components/MessageBox';
import { CartItem } from '../types/Cart';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { AiFillDelete } from 'react-icons/ai';
import Container from '../components/Container';

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
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  return (
    <>
      <Meta title="Cart" />
      <BreadCrumb title="Cart" />
      <Container class1="cart home-wrapper-2 py-5">
        <div className='col-12'>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <>
              <div className="cart-head d-flex  py-3 justify-content-between align-content-center">
                <h4 className="w-40">Product</h4>
                <h4 className="w-10">Price</h4>
                <h4 className="w-15">Quantity</h4>
                <h4 className="w-15">Total</h4>
              </div>
              <div className="cart-data py-3 mb-2 d-flex  py-3 justify-content-between align-items-center">
                <div className="w-40 align-items-center d-flex gap-3">
                  <div className="w-25">
                    <img
                      src="/images/Apple_watch.webp"
                      className="img-fluid"
                      alt="product image"
                    />
                  </div>
                  <div className="w-75">
                    <p>GDffdhg</p>
                    <p>Size: hgf</p>
                    <p>Color: gfd</p>
                  </div>
                </div>
                <div className="w-10">
                  <h5 className="price">$100</h5>
                </div>
                <div className="w-15 d-flex gap-3 align-items-center">
                  <div>
                    <input
                      type="number"
                      name=""
                      min={1}
                      max={9}
                      className="form-control"
                      id=""
                    />
                  </div>
                  <div>
                    <AiFillDelete className="text-danger" />
                  </div>
                </div>
                <div className="w-15">
                  <h5 className="price">$100</h5>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="col-12 py-2">
          <Link to="/cart" className="button mt-3">
            Continue Shipping
          </Link>
        </div>
        <div className="col-12 cart-subtotal d-flex justify-content-between my-3 py-2">
          <Link to="/order">Order special instructions</Link>
          <div className="d-flex flex-column  align-items-end">
            <h4>
              Subtotal <h4 className="ms-1 d-inline fs-6">$100.00</h4>
            </h4>
            <h4 className="my-3">Taxes and shipping calculated at checkout</h4>
            <Link to="/checkout" className="my-3 button">
              Check Out
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CartPage;
