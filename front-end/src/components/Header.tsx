import React, { useContext } from 'react';
import {
  Badge,
  Button,
  Col,
  Container,
  ListGroup,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from '../Store';
import Rating from './Rating';
import { Helmet } from 'react-helmet-async';
import { BsSearch } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);

  const switchModelHandler = () => {
    dispatch({ type: 'SWITCH_MODE' });
  };

  const signOutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethoud');
    window.location.href = '/';
  };

  return (
    <>
      <header className="header-top-strip py-3">
        <Container>
          <Row>
            <Col md={6}>
              <p className="mb-0">Free Shipping Over $100 & Free Returns</p>
            </Col>
            <Col md={6}>
              <Row>
                <Col md={6}>
                  <p className="mb-0">
                    Hotline:{' '}
                    <a className="text-white" href="tel:+20 01095330155">
                      +20 01095330155
                    </a>
                  </p>
                </Col>
                <Col md={3}>
                  <NavDropdown title="English">
                    <NavDropdown.Item className="mb-0">Arabic</NavDropdown.Item>
                    <NavDropdown.Item className="mb-0">
                      English
                    </NavDropdown.Item>
                  </NavDropdown>
                </Col>
                <Col md={3}>
                  <NavDropdown title="usd $">
                    <NavDropdown.Item>Usd $</NavDropdown.Item>
                  </NavDropdown>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </header>
      <header className="header-upper">
        <Container>
          <Row className="align-items-center">
            <Col md={2}>
              <LinkContainer to="/">
                <Navbar.Brand className="text-white fs-3">
                  Super Store
                </Navbar.Brand>
              </LinkContainer>
            </Col>
            <Col md={5}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Product Here...."
                  aria-label="Search Product Here...."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  <BsSearch className="fs-5" />
                </span>
              </div>
            </Col>
            <Col md={5}>
              <Nav className="align-items-center justify-content-between">
                <Link className="nav-link d-flex gap-2" to="/compare">
                  <img src="/images/compare.svg" alt="compare" />
                  <p className="mb-0">
                    Compare <br /> Products
                  </p>
                </Link>
                <Link className="nav-link d-flex gap-2" to="/wishlist">
                  <img src="/images/wishlist.svg" alt="wishlist" />
                  <p className="mb-0">
                    Favourite <br /> Wishlist
                  </p>
                </Link>

                {userInfo ? (
                  <NavDropdown
                    title={
                      <>
                        <img src="/images/user.svg" alt="user" />
                        {userInfo.username}
                      </>
                    }
                    id="basic-nav-dropdown"
                  >
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <Link
                      className="dropdown-item l--10"
                      to="#signout"
                      onClick={signOutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link d-flex gap-2" to="/login">
                    Login <br /> My Account
                  </Link>
                )}

                <Link
                  className="nav-link gap-1 d-flex align-items-center"
                  to="/cart"
                >
                  <img src="/images/cart.svg" alt="cart" />
                  {cart.cartItems.length > 0 && (
                    <div className="d-flex flex-column gap-1">
                      <span>
                        <Badge pill bg="white" text="dark">
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      </span>
                      <p className="mb-0">${cart.totalPrice}</p>
                    </div>
                  )}
                </Link>
              </Nav>
            </Col>
          </Row>
        </Container>
      </header>
      <header className="header-bottom py-2">
        <Container>
          <Row className="align-items-center">
            <Col md={12} className="d-flex justify-content-between">
              <NavDropdown
                className="shop-categories-menu bg-transparent"
                title={
                  <>
                    <img src="/images/menu.svg" alt="menu" />{"   "}
                    <span className="me-5 d-inline-block"> Shop Categories</span>
                  </>
                }
              >
                <NavDropdown.Item>;lka;lk;l</NavDropdown.Item>
                <NavDropdown.Item>;lka;lk;l</NavDropdown.Item>
                <NavDropdown.Item>;lka;lk;l</NavDropdown.Item>
                <NavDropdown.Item>;lka;lk;l</NavDropdown.Item>
              </NavDropdown>
              <Nav className="align-items-center gap-2">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/store">Our Store</NavLink>
                <NavLink to="/blogs">Blogs</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </Nav>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default Header;

/*
<Button variant={mode} className='h-50' onClick={switchModelHandler}>
                  <i
                    className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
                  ></i>
                </Button>
*/
