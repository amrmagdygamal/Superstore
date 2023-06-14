/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Link, useLocation } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import Rating from '../components/Rating';
import { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import ProductItem from '../components/ProductItem';
import { Color } from '../components/Color';
import { TbArrowsShuffle } from 'react-icons/tb';
import { MdFavorite } from 'react-icons/md';
import Container from '../components/Container';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { getproduct } from '../features/product/productSlice';
import { useSelector } from 'react-redux';
import { ProductInfo } from '../types/ProductInfo';
import { addToCart } from '../features/user/userSlice';

const ProductPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  const getProductId = location.pathname.split('/')[2];
  const productState = useSelector((state: any) => state.product.product);
  const cartState = useSelector((state: any) => state.user.cart);
  const [color, setColor] = useState([]);
  const [colorBorder, setColorBorder] = useState(false);

  const colors: any = [];

  useEffect(() => {
    colors.push(color);
  }, [color]);

  const [quantity, setQuantity] = useState(1);

  const handlerQuant = (e: number) => {
    setQuantity(e);
  };

  
  useEffect(() => {
    dispatch(getproduct(getProductId));
  }, []);
  
  const prodcartData = { getProductId, colors, quantity };

  const addProductToCart = (data: any) => {
    dispatch(addToCart(data));
  };

  const copyToClipboard = (text: string) => {
    console.log('text', text);
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };

  const [orderedProduct, setOrderedProduct] = useState(true);

  return (
    <>
      <Meta title="Product Name" />
      <BreadCrumb title="Product Name" />
      <Container class1="product-page py-5 home-wrapper-2">
        <div className="col-6">
          <div className="product-image-section">
            <div>
              <img src={productState?.images[0].url} alt="" />
            </div>
          </div>
          <div className="other-images d-flex flex-wrap gap-2">
            {productState?.images.map((img: any, index: number) => {
              return (
                <div key={index}>
                  <img src={img?.url} alt="" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-6">
          <div className="product-page-details">
            <div className="border-bottom">
              <h3 className="title">{productState?.name}</h3>
            </div>
            <div className="border-bottom py-3">
              <p className="price">$ {productState?.price}</p>
              <div className="d-flex align-items-center gap-1">
                <ReactStars
                  count={5}
                  size={24}
                  value={productState?.totalrating.toString()}
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
                <p className="type-detail">{productState?.category}</p>
              </div>
              <div className="d-flex gap-2 align-items-center my-2">
                <h3 className="type-title">Brand</h3>
                <p className="type-detail">{productState?.brand}</p>
              </div>
              <div className="d-flex gap-2 align-items-cente my-2r">
                <h3 className="type-title">Category:</h3>
                <p className="type-detail">{productState?.category}</p>
              </div>
              <div className="d-flex gap-2 align-items-center my-2">
                <h3 className="type-title">Tags:</h3>
                <p className="type-detail">{productState?.tags}</p>
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
                {productState &&
                  productState?.color?.map((col: any, index: number) => {
                    return (
                      <ul className="colors">
                        <Color
                          col={col}
                          key={index}
                          onClick={() => {
                            setColor(col.title);
                            setColorBorder(true);
                          }}
                          border={colorBorder}
                        />
                      </ul>
                    );
                  })}
              </div>
              <div className="d-flex gap-3 align-items-center flex-row mt-2 mb-3">
                <h3 className="type-title">Quantity :</h3>
                <div className="">
                  <input
                    type="type"
                    name="count"
                    style={{ width: '3rem', maxHeight: '2rem' }}
                    value={quantity}
                    className="form-control text-center"
                    id=""
                  />
                </div>
                <div className="d-flex gap-2 align-items-center">
                  {productState?.countInStock > quantity ? (
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="button py-1 px-3"
                    >
                      +
                    </button>
                  ) : (
                    <button
                      disabled
                      className="button bg-secondary text-white py-1 px-3"
                    >
                      +
                    </button>
                  )}
                  {quantity > 1 ? (
                    <button
                      onClick={() => setQuantity(quantity - 1)}
                      className="button py-1 px-3"
                    >
                      -
                    </button>
                  ) : (
                    <button
                      disabled
                      className="button bg-secondary py-1 px-3"
                    >
                      -
                    </button>
                  )}
                </div>
                <div className="d-flex ms-5 align-items-center gap-3">
                  <button
                    onClick={() => addProductToCart(prodcartData)}
                    className="button m-2 py-3 px-4"
                    type="submit"
                  >
                    Add To Cart
                  </button>
                  <Link
                    to="/signup"
                    className="signup button py-3 px-4"
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
                  Free shipping and returns available on all orders! <br /> We
                  ship all US domestic orders within <b>5-10 business days!</b>
                </p>
              </div>
              <div className="d-flex gap-2 align-items-center my-3">
                <h3 className="product-heading">Product Link:</h3>
                <a
                  href="javascript:void(0);"
                  onClick={() => {
                    copyToClipboard(window.location.href);
                  }}
                >
                  Copy Product Link:{' '}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description py-5 home-wrapper-2">
        <div className="col-12">
          <h4>Description</h4>
          <div className="p-2 bg-white box-shadow">
            <p
              dangerouslySetInnerHTML={{ __html: productState?.description }}
            ></p>
          </div>
        </div>
      </Container>
      <Container class1="reviews home-wrapper-2">
        <div className="col-12">
          <h3>Reviews</h3>
          <div className="reviews-inner box-shadow">
            <div className="review d-flex justify-content-between align-items-end">
              <div>
                <h4 className="mb-2">Customer Reviews</h4>
                <div className="d-flex align-items-center gap-2">
                  <Rating rating={productState?.totalrating} />
                  <p className="mb-0">Based on 2 Reviews</p>
                </div>
              </div>
              {orderedProduct && (
                <div>
                  <a className="text-dark text-decoration-underline" href="">
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
                  value={productState?.totalrating}
                  edit={true}
                  activeColor="#ffd700"
                />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
                  similique autem optio unde facilis necessitatibus, porro illo
                  dolorem aperiam accusamus aut doloribus ut? Facilis vero earum
                  culpa quasi, nesciunt ullam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="col-12">
          <h3 className="section_heading">Our Popular Products</h3>
        </div>
        {productState &&
          productState?.map((product: ProductInfo, index: number) => {
            if (product.tags === 'popular') {
              return <ProductItem product={product} key={index} />;
            }
          })}
      </Container>
    </>
  );
};

export default ProductPage;
