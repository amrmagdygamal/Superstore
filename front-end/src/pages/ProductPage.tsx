/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { AddProductToCart, getError } from '../utils';
import { ApiError } from '../types/ApiErrors';
import ReactStars from 'react-rating-stars-component';
import { Col, Container, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useContext, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsBy_idQuery,
  useGetProductsQuery,
} from '../hooks/productHooks';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import ProductItem from '../components/ProductItem';
import { Color } from '../components/Color';
import { TbArrowsShuffle } from 'react-icons/tb';
import { MdFavorite } from 'react-icons/md';

const ProductPage = () => {
  const params = useParams();
  const { data: products } = useGetProductsQuery();

  const { _id } = params;

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBy_idQuery(_id!);

  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const copyToClipboard = (text : string) => {
    console.log('text', text);
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };
  const addToCartHandler = () => {

    const existItem = cart.cartItems.find((x) => x._id === product!._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product!.countInStock < quantity) {
      toast.warn('sorry the product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...AddProductToCart(product!), quantity },
    });
    toast.success('Produt added to the cart');
    navigate('/cart');
  };

  const [orderedProduct, setOrderedProduct] = useState(true);

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <>
      <Meta title="Product Name" />
      <BreadCrumb title="Product Name" />
      <div className="product-page py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="product-image-section">
                <div>
                  <img src="/images/Apple_watch.webp" alt="" />
                </div>
              </div>
              <div className="other-images d-flex flex-wrap gap-2">
                <div>
                  <img
                    src="/images/Apple_watch.webp"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="/images/Apple_watch.webp"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="/images/Apple_watch.webp"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="/images/Apple_watch.webp"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="product-page-details">
                <div className="border-bottom">
                  <h3 className="title">
                    Kids Headphones Bulk 10 Pack Multi Colored For Students
                  </h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">$ 100</p>
                  <div className="d-flex align-items-center gap-1">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">(2 Reviews)</p>
                  </div>
                  <a href="#review" className="rev-btn">
                    Write A Review
                  </a>
                </div>
                <div className="border-bottom py-3">
                  <div className="d-flex gap-2 align-items-center my-2">
                    <h3 className="type-title">Type:</h3>
                    <p className="type-detail">Headsets</p>
                  </div>
                  <div className="d-flex gap-2 align-items-center my-2">
                    <h3 className="type-title">Brand</h3>
                    <p className="type-detail">Hevels</p>
                  </div>
                  <div className="d-flex gap-2 align-items-cente my-2r">
                    <h3 className="type-title">Category:</h3>
                    <p className="type-detail">HeadPhones</p>
                  </div>
                  <div className="d-flex gap-2 align-items-center my-2">
                    <h3 className="type-title">Tags:</h3>
                    <p className="type-detail">Watch</p>
                  </div>
                  <div className="d-flex gap-2 align-items-center my-2">
                    <h3 className="type-title">Availabilty:</h3>
                    <p className="type-detail">In Stock</p>
                  </div>
                  <div className="d-flex gap-2 flex-column mt-2 mb-3">
                    <h3 className="type-title">Availabilty:</h3>
                    <div className="d-flex flex-wrap gap-2">
                      <span className="bade border bg-white text-dark border-secondary px-1 border-1">
                        S
                      </span>
                      <span className="bade border bg-white text-dark border-secondary px-1 border-1">
                        M
                      </span>
                      <span className="bade border bg-white text-dark border-secondary px-1 border-1">
                        L
                      </span>
                      <span className="bade border bg-white text-dark border-secondary px-1 border-1">
                        XL
                      </span>
                    </div>
                  </div>
                  <div className="d-flex gap-1 flex-column mt-2 mb-3">
                    <h3 className="type-title">Color :</h3>
                    <Color />
                  </div>
                  <div className="d-flex gap-3 align-items-center flex-row mt-2 mb-3">
                    <h3 className="type-title">Quantity :</h3>
                    <div className="">
                      <input
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        style={{ width: '4rem' }}
                        className="form-control"
                        id=""
                      />
                    </div>
                    <div className="d-flex ms-5 align-items-center gap-3">
                      <button className="button border-0" type="submit">
                        Add To Cart
                      </button>
                      <Link
                        to="/signup"
                        className="signup button"
                        type="submit"
                      >
                        Buy It Now
                      </Link>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="me-3">
                      <a href="#">
                        <TbArrowsShuffle className="fs-5 me-2" />
                        Add To Compare
                      </a>
                    </div>
                    <div>
                      <a href="">
                        <MdFavorite className="fs-5 me-2" />
                        Add To Wishlist
                      </a>
                    </div>
                  </div>
                  <div className="d-flex gap-2 flex-column my-3">
                    <h3 className="type-title">Shipping & Returns:</h3>
                    <p className="type-detail">
                      Free shipping and returns available on all orders! <br />{' '}
                      We ship all US domestic orders within{' '}
                      <b>5-10 business days!</b>
                    </p>
                  </div>
                  <div className="d-flex gap-2 align-items-center my-3">
                    <h3 className="product-heading">Product Link:</h3>
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        copyToClipboard('/images/Apple_watch.webp');
                      }}
                    >Copy Product Link: </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="description py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="p-2 bg-white box-shadow">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum
                  soluta, porro cum ea modi, debitis veniam laboriosam ipsa
                  nulla architecto molestiae itaque obcaecati rerum delectus?
                  Quod molestiae sequi minus atque?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="reviews home-wrapper-2">
        <div id="review" className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3>Reviews</h3>
              <div className="reviews-inner box-shadow">
                <div className="review d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-2">
                      <Rating rating={3} />
                      <p className="mb-0">Based on 2 Reviews</p>
                    </div>
                  </div>
                  {orderedProduct && (
                    <div>
                      <a
                        className="text-dark text-decoration-underline"
                        href=""
                      >
                        Write A Review
                      </a>
                    </div>
                  )}
                </div>
                <div className="review-form py-4">
                  <h4>Write A Review</h4>
                  <form action="" className="d-flex flex-column gap-2">
                    <div>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={true}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div>
                      <textarea
                        name=""
                        id=""
                        className="w-100 form-control"
                        cols={30}
                        rows={4}
                        placeholder="Comments"
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="button mt-2">Submit Review</button>
                    </div>
                  </form>
                </div>
                <div className="reviews-comments mt-4">
                  <div className="review-item">
                    <div className="d-flex gap-1 align-items-center">
                      <h5 className="mb-0">Amr Magdy</h5>
                    </div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                    />
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quo, similique autem optio unde facilis necessitatibus,
                      porro illo dolorem aperiam accusamus aut doloribus ut?
                      Facilis vero earum culpa quasi, nesciunt ullam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="popular-wrapper py-5 home-wrapper-2">
        <Container>
          <Row>
            <Col md={12} className="">
              <h3 className="section_heading">Our Popular Products</h3>
            </Col>
            {products!.map((product) => (
              <ProductItem product={product} />
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProductPage;
