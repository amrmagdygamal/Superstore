

import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BreadCrumb = (props: any) => {
  const {title} = props;
  return (
    <div className="breadcrumb mb-0 py-4">
      <Container>
        <Row>
          <Col md={12}>
            <p className='text-center mb-0'>
              <Link to="/" className='text-dark'>
                Home 
              </Link> / {title}
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default BreadCrumb;