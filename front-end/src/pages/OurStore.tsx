import { useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import ReactStars from 'react-rating-stars-component';
import Meta from '../components/Meta';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import ProductItem from '../components/ProductItem';
import { useGetProductsQuery } from '../hooks/productHooks';

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const { data: products } = useGetProductsQuery();

  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <Container>
          <Row>
            <Col md={3}>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>Watch</li>
                    <li>TV</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By</h3>
                <div>
                  <h5 className="sub-title">Availablity</h5>
                  <div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id=""
                        value=""
                        className="form-check-input"
                      />
                      <label htmlFor="" className="form-check-label">
                        In Stock(1)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id=""
                        value=""
                        className="form-check-input"
                      />
                      <label htmlFor="" className="form-check-label">
                        Out of Stock(0)
                      </label>
                    </div>
                  </div>
                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex align-items-center gap-2">
                    <div className="form-floating d-flex align-items-center justify-content-center">
                      $
                      <input
                        type="number"
                        style={{ height: '2.7rem', width: '7rem' }}
                        className="form-control"
                        id="floatingInput"
                        placeholder="From"
                      />
                      <label
                        style={{ height: '1.8rem', fontSize: '.8rem' }}
                        htmlFor="floatingInput"
                      >
                        From
                      </label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="number"
                        style={{ height: '2.7rem', width: '7rem' }}
                        className="form-control"
                        id="floatingInput"
                        placeholder="To"
                      />
                      <label
                        style={{ height: '1.8rem', fontSize: '.8rem' }}
                        htmlFor="floatingInput"
                      >
                        To
                      </label>
                    </div>
                  </div>
                  <h5 className="sub-title">Colors</h5>
                  <div>
                    <div className="d-flex flex-wrap">
                      <ul className="colors">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                  </div>
                  <h5 className="sub-title">Size</h5>
                  <div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="color-1"
                        value=""
                        className="form-check-input"
                      />
                      <label htmlFor="color-1" className="form-check-label">
                        s (2)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="color-2"
                        value=""
                        className="form-check-input"
                      />
                      <label htmlFor="color-2" className="form-check-label">
                        M (2)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id=""
                        value=""
                        className="form-check-input"
                      />
                      <label htmlFor="" className="form-check-label">
                        In Stock(1)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id=""
                        value=""
                        className="form-check-input"
                      />
                      <label htmlFor="" className="form-check-label">
                        In Stock(1)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Product Tages</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-2">
                    <Badge className="bg-light rounded-3 px-3 py-2">
                      Headphone
                    </Badge>
                    <Badge className="bg-light rounded-3 px-3 py-2">
                      Laptop
                    </Badge>
                    <Badge className="bg-light rounded-3 px-3 py-2">
                      Mobile
                    </Badge>
                    <Badge className="bg-light rounded-3 px-3 py-2">Wire</Badge>
                    <Badge className="bg-light rounded-3 px-3 py-2">
                      Speaker
                    </Badge>
                    <Badge className="bg-light rounded-3 px-3 py-2">
                      Headphone
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Random Product</h3>
                <div>
                  <div className="random-products mb-3 d-flex">
                    <div className="w-50">
                      <img
                        src="images/watch.jpg"
                        className="img-fluid"
                        alt="watch"
                      />
                    </div>
                    <div className="w-50">
                      <h5>
                        Kids headphones bulk 10 pack multi colored for students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>$ 300</b>
                    </div>
                  </div>
                  <div className="random-products d-flex">
                    <div className="w-50">
                      <img
                        src="images/watch.jpg"
                        className="img-fluid"
                        alt="watch"
                      />
                    </div>
                    <div className="w-50">
                      <h5>
                        Kids headphones bulk 10 pack multi colored for students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>$ 300</b>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={9}>
              <div className="filter-sort-grid mb-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <p className="mb-0">Sort By:</p>
                    <select name="" id="" className="form-control form-select">
                      <option value="best-selling" selected>
                        Best Selling
                      </option>
                      <option value="best-selling" selected>
                        Alphabetically, A-Z
                      </option>
                      <option value="title-ascending" selected>
                        Alphabetically, Z-A
                      </option>
                      <option value="best-selling" selected>
                        Best Selling
                      </option>
                      <option value="best-selling" selected>
                        Best Selling
                      </option>
                      <option value="best-selling" selected>
                        Best Selling
                      </option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <p className="mb-0 totalproducts">21 Products</p>
                    <div className="d-flex grid gap-1 align-items-center">
                      <img
                        onClick={() => {
                          setGrid(3);
                        }}
                        src="images/gr4.svg"
                        alt="grid"
                        className="d-block img-fluid"
                      />
                      <img
                        onClick={() => {
                          setGrid(4);
                        }}
                        src="images/gr3.svg"
                        alt="grid"
                        className="d-block img-fluid"
                      />
                      <img
                        onClick={() => {
                          setGrid(6);
                        }}
                        src="images/gr2.svg"
                        alt="grid"
                        className="d-block img-fluid"
                      />
                      <img
                        onClick={() => {
                          setGrid(12);
                        }}
                        src="images/gr.svg"
                        alt="grid"
                        className="d-block img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="products-list pb-5">
                <div className="d-flex flex-wrap gap-2">
                  {products!.map((product) => (
                    <ProductItem product={product} grid={grid} />
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default OurStore;
