import { Col, Container, Row } from 'react-bootstrap';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import ProductItem from '../components/ProductItem';
import { Helmet } from 'react-helmet-async';
import { useGetProductsQuery } from '../hooks/productHooks';
import { ApiError } from '../types/ApiErrors';
import { getError } from '../utils';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import BlogCard from '../components/BlogCard';
import SpecialProduct from '../components/SpecialProduct';

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <>
      <section className="home-wrapper-1 py-5">
        <Container>
          <Row className="">
            <Helmet>
              <title>Super Store</title>
            </Helmet>

            <Col md={6}>
              <div className="main-banner position-relative">
                <img
                  src="images/main-banner-1.jpg"
                  alt="main banner"
                  className="img-fluid rounded-4"
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
            </Col>
            <Col md={6}>
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <div className="small-banner position-relative">
                  <img
                    src="images/catbanner-01.jpg"
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
                    src="images/catbanner-03.jpg"
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
                    src="images/catbanner-02.jpg"
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
                    src="images/catbanner-04.jpg"
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
            </Col>
          </Row>
        </Container>
      </section>
      <section className="home-wrapper-2 py-5">
        <Container>
          <Row>
            <Col md={12}>
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <img src="images/service.png" alt="services" />
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">From all orders over $5</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <img src="images/service-02.png" alt="services" />
                  <div>
                    <h6>Daily Surprise Offers</h6>
                    <p className="mb-0">Save up to 25% off</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <img src="images/service-03.png" alt="services" />
                  <div>
                    <h6>Suppport 24/7</h6>
                    <p className="mb-0">Shop with an expert</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <img src="images/service-04.png" alt="services" />
                  <div>
                    <h6>Affordable Prices</h6>
                    <p className="mb-0">Get Factory Default Prise</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <img src="images/service-05.png" alt="services" />
                  <div>
                    <h6>Secure Payments</h6>
                    <p className="mb-0">100% Protected Payment</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="home-wrapper-2 py-5">
        <Container>
          <Row>
            <Col md={12}>
              <div className="categories d-flex justify-content-between flex-wrap align-items center">
                <div className="d-flex justify-content-around align-items-center">
                  <div>
                    <h6>Cameras</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className="d-flex justify-content-around align-items-center">
                  <div>
                    <h6>Smart TV</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="camera" />
                </div>
                <div className="d-flex justify-content-around align-items-center">
                  <div>
                    <h6>Smart Watches</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/watch.jpg" className="w-50" alt="camera" />
                </div>
                <div className="d-flex justify-content-around align-items-center">
                  <div>
                    <h6>Home Appliances</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/homeapp.jpg" className="img" alt="camera" />
                </div>
                <div className="d-flex justify-content-around align-items-center">
                  <div>
                    <h6>Mobiles & Tablets</h6>
                    <p>5 Items</p>
                  </div>
                  <img
                    src="images/iPhone-15-2-600x600.jpg"
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
                    src="images/Apple_watch.webp"
                    alt="camera"
                    className="img"
                  />
                </div>
                <div className="d-flex justify-content-around align-items-center">
                  <div>
                    <h6>AirBods</h6>
                    <p>13 Items</p>
                  </div>
                  <img src="images/acc.jpg" alt="camera" />
                </div>
                <div className="d-flex justify-content-around align-items-center">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/1.jpg" className="img" alt="camera" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="features-wrapper py-5 home-wrapper-2">
        <Container>
          <Row>
            <Col md={12} className="">
              <h3 className="section_heading">Features Colections</h3>
            </Col>
            {products!.map((product) => (
              <ProductItem product={product} />
            ))}
          </Row>
        </Container>
      </section>
      <section className="famous-wrapper py-5 home-wrapper-2">
        <Container>
          <Row>
            <Col md={3}>
              <div className="famous-card position-relative">
                <img src="images/famous-1.webp" className="img-fluid" alt="famous" />
                <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch series 7</h6>
                <p>From $399 or 16.62/mo. for 24 mo.*</p>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="famous-card position-relative">
                <img src="images/famous-2.webp" className="img-fluid" alt="famous" />
                <div className="famous-content position-absolute">
                <h5 className='text-dark'>Studio Display</h5>
                <h6 className='text-dark'>600 nits of brightness</h6>
                <p className='text-dark'>27-inc 5k retina display</p>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="famous-card position-relative">
                <img src="images/famous-3.webp" className="img-fluid" alt="famous" />
                <div className="famous-content position-absolute">
                <h5 className='text-dark'>Studio Display</h5>
                <h6 className='text-dark'>600 nits of brightness</h6>
                <p className='text-dark'>27-inc 5k retina display</p>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="famous-card position-relative">
                <img src="images/famous-4.webp" className="img-fluid" alt="famous" />
                <div className="famous-content position-absolute">
                <h5 className='text-dark'>Studio Display</h5>
                <h6 className='text-dark'>600 nits of brightness</h6>
                <p className='text-dark'>27-inc 5k retina display</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="special-wrapper py-5 home-wrapper-2">
        <Container>
          <Row>
            <Col md={12}>
              <h3 className="section-heading">Special Products</h3>
            </Col>
          </Row>
          <Row>
            <SpecialProduct />
            <SpecialProduct />
            <SpecialProduct />
          </Row>
        </Container>
      </section>
      <section className="features-wrapper py-5 home-wrapper-2">
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
      <section className="marque-wrapper home-wrapper py-5">
        <Container>
          <Row>
            <Col md={12}>
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
            </Col>
          </Row>
        </Container>
      </section>
      <section className="blog-wrapper py-5 home-wrapper-">
        <Container>
          <Row>
            <Col md={12} className="">
              <h3 className="section_heading">Our Latest Blogs</h3>
            </Col>
          </Row>
          <Row>
            <div className="col-3">
            <BlogCard />
            </div>
            <div className="col-3">
            <BlogCard />
            </div>
            <div className="col-3">
            <BlogCard />
            </div>
            <div className="col-3">
            <BlogCard />
            </div>
          </Row>
        </Container>
      </section>
      <Container>
        <Row></Row>
      </Container>
    </>
  );
};

export default HomePage;
