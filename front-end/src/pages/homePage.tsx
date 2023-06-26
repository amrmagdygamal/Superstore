import { useEffect } from 'react';
import { Row } from 'react-bootstrap';

import ProductItem from '../components/ProductItem';

import { Link} from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import BlogCard from '../components/BlogCard';
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container';
import Meta from '../components/Meta';
import Contain from '../components/Contain';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { getproducts } from '../features/product/productSlice';
import { getBlogs } from '../features/blog/blogSlice';
import moment from 'moment';
import { ProductInfo } from '../types/ProductInfo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();


  const productState = useSelector((state: any) => state.product.products);
  const blogState = useSelector((state: any) => state.blog.blogs);

  const getAllProducts = () => {
    dispatch(getproducts({}));
  };

  const getAllBlogs = () => {
    dispatch(getBlogs());
  };

  useEffect(() => {
    getAllProducts();
    getAllBlogs();
  }, []);

  function createSlide1() {
    return (
      <SwiperSlide>
        <div className="main-banner position-relative">
          <img
            src="/images/catbanner-03.jpg"
            alt="main banner"
            className="main-banner rounded-4"
          />
          <div className="main-banner-content position-absolute">
            <h4>SuperCharged For Pros</h4>
            <h2>iPad S13+ Pro</h2>
            <p>From $999.00 or $41.62/mo</p>
            <p>For 24 mo. Footnote*</p>
            <Link className="button" to={''}>
              Buy Now
            </Link>
          </div>
        </div>
      </SwiperSlide>
    );
  }
  function createSlide2() {
    return (
      <SwiperSlide className="rounded-4">
        <div className="main-banner position-relative">
          <img
            src="/images/20220912applewatchsefull.jpg"
            alt="main banner"
            className="main-banner rounded-4"
          />
          <div className="main-banner-content position-absolute">
            <h4>SuperCharged</h4>

            <p>Apple</p>
            <p>Smart </p>
            <p>Watch </p>
            <Link className="button mt-4" to={''}>
              Buy Now
            </Link>
          </div>
        </div>
      </SwiperSlide>
    );
  }
  function createSlide4() {
    return (
      <SwiperSlide className="rounded-4">
        <div className="main-banner position-relative">
          <img
            src="/images/apple-watch-ultra-og-202209_GEO_IN.jpeg"
            alt="main banner"
            className="main-banner rounded-4"
          />
          <div className="main-banner-content position-absolute">
            <h4>SuperCharged</h4>

            <p>Apple</p>
            <p>Smart </p>
            <p>Watch </p>
            <Link className="button mt-4" to={''}>
              Buy Now
            </Link>
          </div>
        </div>
      </SwiperSlide>
    );
  }
  function createSlide3() {
    return (
      <SwiperSlide>
        <div className="main-banner position-relative">
          <img
            src="/images/latest-iphones-you-can-buy-on-emi.webp"
            alt="main banner"
            className="main-banner rounded-4"
          />
          <div className="main-banner-content position-absolute">
            <h4 className="text-black">SuperCharged For Pros</h4>
            <h2 className="text-black">iPad S13+ Pro</h2>
            <p className="text-black">From $999.00 or $41.62/mo</p>
            <p className="text-black">For 24 mo. Footnote*</p>
            <Link className="button" to={''}>
              Buy Now
            </Link>
          </div>
        </div>
      </SwiperSlide>
    );
  }

  return (
    <>
      <Container class1="home-wrapper-2 py-5">
        <Meta title="Super Store" />
        <div className="col-6">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            pagination={{ clickable: true }}
          >
            {createSlide1()}
            {createSlide2()}
            {createSlide3()}
            {createSlide4()}
          </Swiper>
        </div>
        <div className="col-6">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
            <div className="small-banner position-relative">
              <img
                src="/images/catbanner-01.jpg"
                alt="main banner"
                className="img-fluid rounded-4"
              />
              <div className="small-banner-content position-absolute">
                <h4>best sale</h4>
                <h2>Laptops Max</h2>
                <p>From $1699.00 or</p>
                <p> $64.62/mo</p>
              </div>
            </div>
            <div className="small-banner position-relative">
              <img
                src="/images/catbanner-03.jpg"
                alt="main banner"
                className="img-fluid rounded-4"
              />
              <div className="small-banner-content position-absolute">
                <h4>New Arrival</h4>
                <h2>Buy Ipad Air</h2>
                <p>From $599 or</p>
                <p> $49.62/mo For 12 mo.</p>
              </div>
            </div>
            <div className="small-banner position-relative">
              <img
                src="/images/catbanner-02.jpg"
                alt="main banner"
                className="img-fluid rounded-4"
              />
              <div className="small-banner-content position-absolute">
                <h4>15% OFF</h4>
                <h2>Smartwatch 7</h2>
                <p>Shop the Latest band</p>
                <p> styes and colors</p>
              </div>
            </div>
            <div className="small-banner position-relative">
              <img
                src="/images/catbanner-04.jpg"
                alt="main banner"
                className="img-fluid rounded-4"
              />
              <div className="small-banner-content position-absolute">
                <h4>Free Engraving</h4>
                <h2>AirPods Max</h2>
                <p>High-fidelity playback &</p>
                <p> Ultra-low destortion</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="col-12">
          <div className="services d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <img src="/images/service.png" alt="services" />
              <div>
                <h6>Free Shipping</h6>
                <p className="mb-0">From all orders over $5</p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <img src="/images/service-02.png" alt="services" />
              <div>
                <h6>Daily Surprise Offers</h6>
                <p className="mb-0">Save up to 25% off</p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <img src="/images/service-03.png" alt="services" />
              <div>
                <h6>Suppport 24/7</h6>
                <p className="mb-0">Shop with an expert</p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <img src="/images/service-04.png" alt="services" />
              <div>
                <h6>Affordable Prices</h6>
                <p className="mb-0">Get Factory Default Prise</p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <img src="/images/service-05.png" alt="services" />
              <div>
                <h6>Secure Payments</h6>
                <p className="mb-0">100% Protected Payment</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="col-12">
          <div className="categories d-flex justify-content-between flex-wrap align-items center">
            <div className="d-flex justify-content-around align-items-center">
              <div>
                <h6>Cameras</h6>
                <p>10 Items</p>
              </div>
              <img src="/images/camera.jpg" alt="camera" />
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <div>
                <h6>Smart TV</h6>
                <p>10 Items</p>
              </div>
              <img src="/images/tv.jpg" alt="camera" />
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <div>
                <h6>Smart Watches</h6>
                <p>10 Items</p>
              </div>
              <img src="/images/watch.jpg" className="w-50" alt="camera" />
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <div>
                <h6>Home Appliances</h6>
                <p>10 Items</p>
              </div>
              <img src="/images/homeapp.jpg" className="img" alt="camera" />
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <div>
                <h6>Mobiles & Tablets</h6>
                <p>5 Items</p>
              </div>
              <img
                src="/images/iPhone-15-2-600x600.jpg"
                alt="camera"
                className="img"
              />
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <div>
                <h6>Proffessional Watches</h6>
                <p>9 Items</p>
              </div>
              <img
                src="/images/Apple_watch.webp"
                alt="camera"
                className="img"
              />
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <div>
                <h6>AirBods</h6>
                <p>13 Items</p>
              </div>
              <img src="/images/acc.jpg" alt="camera" />
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <div>
                <h6>Music & Gaming</h6>
                <p>10 Items</p>
              </div>
              <img src="/images/1.jpg" className="img" alt="camera" />
            </div>
          </div>
        </div>
      </Container>
      <Container class1="features-wrapper py-5 home-wrapper-2">
        <div className="col-12">
          <h3 className="section_heading">Features Colections</h3>
        </div>
        {productState &&
          productState?.map((product: ProductInfo, index: number) => {
            if (product?.tag === 'features') {
              return <ProductItem product={product} key={index} />;
            }
          })}
      </Container>
      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="col-3">
          <div className="famous-card position-relative">
            <img
              src="/images/famous-1.webp"
              className="img-fluid box-shadow "
              alt="famous"
            />
            <div className="famous-content position-absolute">
              <h5>Big Screen</h5>
              <h6>Smart Watch series 7</h6>
              <p>From $399 or 16.62/mo. for 24 mo.*</p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="famous-card position-relative">
            <img
              src="/images/famous-2.webp"
              className="img-fluid box-shadow "
              alt="famous"
            />
            <div className="famous-content position-absolute">
              <h5 className="text-dark">Studio Display</h5>
              <h6 className="text-dark">600 nits of brightness</h6>
              <p className="text-dark">27-inc 5k retina display</p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="famous-card position-relative">
            <img
              src="/images/famous-3.webp"
              className="img-fluid box-shadow "
              alt="famous"
            />
            <div className="famous-content position-absolute">
              <h5 className="text-dark">Studio Display</h5>
              <h6 className="text-dark">600 nits of brightness</h6>
              <p className="text-dark">27-inc 5k retina display</p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="famous-card position-relative">
            <img
              src="/images/famous-4.webp"
              className="img-fluid box-shadow "
              alt="famous"
            />
            <div className="famous-content position-absolute">
              <h5 className="text-dark">Studio Display</h5>
              <h6 className="text-dark">600 nits of brightness</h6>
              <p className="text-dark">27-inc 5k retina display</p>
            </div>
          </div>
        </div>
      </Container>
      <Contain class1="special-wrapper py-5 home-wrapper-2">
        <Row>
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </Row>
        <Row>
          {productState &&
            productState?.map((product: any, index: number) => {
              if (product?.tag === 'special') {
                return <SpecialProduct product={product} key={index} />;
              }
            })}
        </Row>
      </Contain>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="col-12">
          <h3 className="section_heading">Our Popular Products</h3>
        </div>
        {productState &&
          productState?.map((product: ProductInfo, index: number) => {
            if (product.tag === 'popular') {
              return <ProductItem product={product} key={index} />;
            }
          })}
      </Container>
      <Container class1="marque-wrapper home-wrapper py-5">
        <div className="col-12">
          <div className="marquee-inner-wrapper card-wrapper">
            <Marquee className="d-flex">
              <div className="mx-4 w-25">
                <img src="/images/brand-01.png" alt="brand" />
              </div>
              <div className="mx-4 w-25">
                <img src="/images/brand-02.png" alt="brand" />
              </div>
              <div className="mx-4 w-25">
                <img src="/images/brand-03.png" alt="brand" />
              </div>
              <div className="mx-4 w-25">
                <img src="/images/brand-04.png" alt="brand" />
              </div>
              <div className="mx-4 w-25">
                <img src="/images/brand-05.png" alt="brand" />
              </div>
              <div className="mx-4 w-25">
                <img src="/images/brand-06.png" alt="brand" />
              </div>
              <div className="mx-4 w-25">
                <img src="/images/brand-07.png" alt="brand" />
              </div>
              <div className="mx-4 w-25">
                <img src="/images/brand-08.png" alt="brand" />
              </div>
            </Marquee>
          </div>
        </div>
      </Container>
      <Contain class1="blog-wrapper py-5 home-wrapper-">
        <Row>
          <div className="col-12">
            <h3 className="section_heading">Our Latest Blogs</h3>
          </div>
        </Row>
        <Row>
          {blogState &&
            blogState?.map((blog: any, index: number) => {
              if (index < 3) {
                return (
                  <div className="col-3" key={index}>
                    <BlogCard
                      id={blog?._id}
                      title={blog?.title}
                      description={blog?.description}
                      image={blog.images[0].url}
                      author={blog.author}
                      date={moment(blog.createdAt).format('MMMM Do YYYY, h:mm')}
                    />
                  </div>
                );
              }
            })}
        </Row>
      </Contain>
      <div className="container-xxl">
        <Row></Row>
      </div>
    </>
  );
};

export default HomePage;
