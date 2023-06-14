import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUserCart } from '../features/user/userSlice';
import CartItemProd from '../components/CartItemProd';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  const cartState = useSelector((state: any) => state.user.cart);
  const deleteFromCartState = useSelector((state: any) => state.user.deletFromCart);

  const { isLoading , isError, isSuccess, deletFromCartState} = deleteFromCartState;

  useEffect(() => {
    dispatch(getUserCart());
  }, [deletFromCartState]);

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <>
      <Meta title="Cart" />
      <BreadCrumb title="Cart" />
      <Container class1="cart home-wrapper-2 py-5">
        <div className="col-12">
          <>
            <div className="cart-head d-flex  py-3 justify-content-between align-content-center">
              <h4 className="w-40">Product</h4>
              <h4 className="w-10">Price</h4>
              <h4 className="w-15">Quantity</h4>
              <h4 className="w-15">Total</h4>
            </div>
            {cartState &&
              cartState?.products.map((cartProd: any, index: number) => {
                return (
                  <>
                    <CartItemProd key={index} cartProd={cartProd} />
                  </>
                );
              })}
          </>
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
