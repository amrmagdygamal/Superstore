/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import Rating from '../components/Rating';
import { useEffect, useRef, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import ProductItem from '../components/ProductItem';
import { TbArrowsShuffle } from 'react-icons/tb';
import ReactImageMagnify from 'react-image-magnify';
import { MdFavorite } from 'react-icons/md';
import Container from '../components/Container';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import {
  getproduct,
  getproducts,
  rateProduct,
} from '../features/product/productSlice';
import { useSelector } from 'react-redux';
import { addToCart, getUserCart } from '../features/user/userSlice';
import { toast } from 'react-toastify';

const ProductPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split('/')[2];
  const [img, setImg] = useState("");
  useEffect(() => {
    dispatch(getproduct(getProductId));
    if (productState?.isSuccess == true) {
      setImg(productState?.images[0]?.url)
    }
    setTimeout(() => {
      dispatch(getproducts({tag: "popular"}));
    }, 1000);
  }, []);
  const productState = useSelector((state: any) => state.product.product);


  const addCartState = useSelector((state: any) => state.user);
  const allProductsState = useSelector((state: any) => state.product.products);
  const cartState = useSelector((state: any) => state.user.cart);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState('');

  const {  isSuccess, addCart } = addCartState;
  const [quantity, setQuantity] = useState(1);
  const [colors, setColors] = useState<any[]>([]);


  const handleSetCol = (item: any) => {
    const itemIndex = colors.findIndex((color: any) => color._id === item._id);

    let newColors = [];
    if (itemIndex >= 0) {
      newColors = colors.filter((color: any) => color._id !== item._id);
    } else {
      newColors = [...colors, item];
    }

    if (newColors.length > quantity) {
      setQuantity(newColors.length);
    }

    setColors(newColors);
  };


  useEffect(() => {
    dispatch(getUserCart());
  }, [addCart, isSuccess]);

  useEffect(() => {
    for (let index = 0; index < cartState && cartState[0]?.products?.length; index++) {
      if (getProductId == cartState[0]?.products[index]?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  const prodData = { prodId: getProductId, colors: colors, quantity: quantity };
  const addProductToCart = (data: any) => {
    if (colors.length == 0) {
      if (productState?.color.length == 1) {
        colors.push(productState.color[0]);
      } else {
        toast.error('Please Choose Color');
      }
    } else {
      dispatch(addToCart(data));
    }
  };

  const addRatingToProd = () => {
    if (star === 0) {
      toast.warning("You can't give zero star");
      return false;
    } else if (comment == '') {
      toast.warning('Please Write Review About the Product');
      return false;
    } else {
      dispatch(
        rateProduct({ star: star, prodId: getProductId, comment: comment })
      );
      setTimeout(() => {
        dispatch(getproduct(getProductId));
      }, 400);
    }
  };


  const hoverHandler = (image: any, i: number) => {
    setImg(image?.url);
    refs.current[i].classList.add('active');
    for (let j = 0; j < productState?.images?.length; j++) {
      if (i !== j) {
        refs.current[j].classList.remove('active');
      }
    }
  };
  const refs: any = useRef([]);
  refs.current = [];

  const copyToClipboard = (text: string) => {
    console.log('text', text);
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };

  const [orderedProduct] = useState(true);

  return (
    <>
      <Meta title="Product Page" />
      <BreadCrumb title={productState?.name} />
      <Container class1="product-page py-5 home-wrapper-2">
        <div className="col-6">
          <div className="product-image-section">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: 'product',
                  isFluidWidth: true,
                  src: img,
                  
                },
                largeImage: {
                  src: img,
                  width: 1400,
                  height: 2100,
                },
                enlargedImagePosition: 'over',
                enlargedImageContainerDimensions: {
                  width: '200%',
                  height: '200%',
                },
                enlargedImageStyle: {
                  position: 'absolute',
                  left: '50%',
                  width: 3900,
                  height: 4800,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                },
              }}
            />
          </div>
          <div className="other-images d-flex flex-wrap gap-2">
            {productState?.images?.map((imag: any, index: number) => {
              return (
                <div
                  className={index == 0 ? 'active' : ''}
                  key={index}
                  onMouseOver={() => hoverHandler(imag, index)}
                >
                  <img src={imag?.url} className="w-75" alt="" />
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
                  value={productState?.totalrating}
                  edit={true}
                  activeColor="#ffd700"
                />
                <p className="mb-0">
                  ({productState?.ratings?.length} Reviews)
                </p>
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
                <p className="type-detail">
                  {productState?.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </p>
              </div>
              <div className="d-flex gap-2 flex-column mt-2 mb-3">
                <h3 className="type-title">Availabilty: </h3>
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
                      <ul className="colors" key={index}>
                        <div
                          style={{
                            border: colors.includes(col)
                              ? `4px solid ${col.title}`
                              : 'none',
                          }}
                          className="p-1 text-center rounded-circle"
                        >
                          <button
                            className="p-3 border-0 rounded-circle"
                            style={{ backgroundColor: col.title }}
                            onClick={() => handleSetCol(col)}
                          ></button>
                        </div>
                      </ul>
                    );
                  })}
              </div>
              <div className="d-flex gap-3 align-items-center flex-row mt-2 mb-3">
                {alreadyAdded === false ? (
                  <>
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
                      {quantity < 10 ? (
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
                  </>
                ) : (
                  <>
                    <h3 className="title text-success mb-0">
                      Already Added to Cart :
                    </h3>
                  </>
                )}

                <div className="d-flex ms-5 align-items-center gap-3">
                  {alreadyAdded === false ? (
                    <>
                      <button
                        onClick={() => addProductToCart(prodData)}
                        className="button m-2 py-3 px-4"
                        type="submit"
                      >
                        Add To Cart
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate('/cart')}
                        className="button m-2 py-3 px-4"
                        type="submit"
                      >
                        Go Cart
                      </button>
                    </>
                  )}

                  <Link
                    to="/checkout"
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
          <div className="p-4 bg-white box-shadow d-flex align-items-center ">
            <p
              className="mb-0"
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
                  <p className="mb-0">
                    Based on {productState?.ratings?.length} Reviews
                  </p>
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
              <div>
                <ReactStars
                  count={5}
                  size={24}
                  value={4}
                  edit={true}
                  onChange={(e: number) => setStar(e)}
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
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex justify-content-end">
                <button onClick={addRatingToProd} className="button mt-2">
                  Submit Review
                </button>
              </div>
            </div>
            <div className="reviews-comments mt-4">
              {productState &&
                productState?.ratings?.map((item: any, index: number) => {
                  <div key={index} className="review-item">
                    <div className="d-flex gap-1 align-items-center">
                      <h5 className="mb-0">{item?.postedBy}</h5>
                    </div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={item?.star}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p>{item?.comment}</p>
                  </div>;
                })}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="col-12">
          <h3 className="section_heading">Our Popular Products</h3>
        </div>
        {allProductsState &&
          allProductsState.map((product: any, index: number) => {
            if (product.tag === 'popular') {
              return <ProductItem product={product} key={index} />;
            }
          })}
      </Container>
    </>
  );
};

export default ProductPage;
