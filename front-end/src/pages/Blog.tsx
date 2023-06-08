import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Col, Container, Row } from 'react-bootstrap';
import BlogCard from '../components/BlogCard';

const Blog = () => {
  return (
    <>
      <Meta title="Blogs" />
      <BreadCrumb title="Blogs" />
      <div className="blog-wrapper box-shadow home-wrapper-2 py-5">
        <Container>
          <Row>
            <Col md={3}>
              <div className="filter-card box-shadow mb-3">
                <h3 className="filter-title">Find By Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>Watch</li>
                    <li>TV</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md={9}>
              <Row>
                <div className="col-6 mb-3">

                <BlogCard />
                </div>
                <div className="col-6 mb-3">

                <BlogCard />
                </div>
                <div className="col-6 mb-3">

                <BlogCard />
                </div>
                <div className="col-6 mb-3">

                <BlogCard />
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Blog;
