import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { delFromCart, getUserCart, resetState } from '../features/user/userSlice';

import { AiFillDelete } from 'react-icons/ai';
import { Color } from '../components/Color';

const CartPage = () => {
  const dispatch: AppDispatch = useDispatch();




  const cartState = useSelector((state: any) => state.user.cart);
  

  useEffect(() => {
    dispatch(resetState());
    dispatch(getUserCart());
  }, []);


  const handleDelete = (prodId: any) => {

    dispatch(delFromCart(prodId))
    setTimeout(() => {
      dispatch(getUserCart());
    }, 800);

  }

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
              cartState[0]?.products.map((cartProd: any, index: number) => {
                return (
                  <>
                    <div key={index} className="cart-data py-3 mb-2 d-flex  py-3 justify-content-between align-items-center">
                      <div className="w-40 align-items-center d-flex gap-3">
                        <div className="w-25">
                          <img
                            src={cartProd?.image}
                            className="img-fluid"
                            alt="product image"
                          />
                        </div>
                        <div className="w-75">
                          <p>superstore</p>
                          <p>Size: M</p>
                          <div className="d-flex align-items-center ">
                            <p className="mb-0"> Color:</p>
                            {cartProd &&
                              cartProd?.color?.map(
                                (col: any, index: number) => {
                                  return (
                                    <ul key={index} className="colors mb-0">
                                      <Color col={col} />
                                    </ul>
                                  );
                                }
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="w-10">
                        <h5 className="price">$ {cartProd?.price}</h5>
                      </div>
                      <div className="w-15 d-flex gap-3 align-items-center">
                        <div>
                          <Link
                            to={`/product/${cartProd?.product?._id}`}
                            className="text-info fs-5"
                          >
                            Edit
                          </Link>
                        </div>
                        <div>
                          <input
                            type="text"
                            name="quantity"
                            min={1}
                            max={9}
                            className="form-control text-center"
                            value={cartProd?.quantity}
                            style={{ width: '3rem', maxHeight: '2rem' }}
                            id=""
                          />
                        </div>
                        <div>
                          <button className="border-0">
                            <AiFillDelete
                              onClick={() => handleDelete(cartProd?.product?._id)}
                              className="text-danger"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="w-15">
                        <h5 className="price">
                          $ {cartProd?.quantity * cartProd?.price}
                        </h5>
                      </div>
                    </div>
                  </>
                );
              })}
          </>
        </div>
        <div className="col-12 py-2">
          <Link to="/store" className="button mt-3">
            Continue Shipping
          </Link>
        </div>
        {cartState && cartState[0]?.cartTotal > 0 && (
          <div className="col-12 cart-subtotal d-flex justify-content-between my-3 py-2">
            <Link to="/order">Order special instructions</Link>
            <div className="d-flex flex-column  align-items-end">
              <h4>
                Subtotal{' '}
                <h4 className="ms-1 d-inline fs-6">
                  $ {cartState[0]?.cartTotal}
                </h4>
              </h4>
              <h4 className="my-3">
                Taxes and shipping calculated at checkout
              </h4>
              <Link to="/checkout" className="my-3 button">
                Check Out
              </Link>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default CartPage;
