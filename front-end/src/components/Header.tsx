import React, { useContext, useEffect } from 'react';
import { Badge, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';
import Container from './Container';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { getUserCart, logout } from '../features/user/userSlice';

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartState = useSelector((state: any) => state.user.cart);
  const deleteFromCartState = useSelector(
    (state: any) => state.user.deletFromCart
  );

  
  useEffect(() => {
    dispatch(getUserCart());
  }, [cartState | deleteFromCartState]);

  const userState = useSelector((state: any) => state.user);


    const information = JSON.parse(localStorage.getItem("userInfo"))
    console.log(information)

  const signOutHandler = () => {
    dispatch(logout())
    localStorage.removeItem('userInfo');
    localStorage.removeItem('paymentMethoud');
    window.location.href = '/';
  };

  return (
    <>
      <Container class1="header header-top-strip py-3">
        <div className="col-6">
          <p className="mb-0">Free Shipping Over $100 & Free Returns</p>
        </div>
        <div className="col-6">
          <Row>
            <div className="col-6">
              <p className="mb-0">
                Hotline:{' '}
                <a className="text-white" href="tel:+20 01095330155">
                  +20 01095330155
                </a>
              </p>
            </div>
            <div className="col-3">
              <NavDropdown title="English">
                <NavDropdown.Item className="mb-0">Arabic</NavDropdown.Item>
                <NavDropdown.Item className="mb-0">English</NavDropdown.Item>
              </NavDropdown>
            </div>
            <div className="col-3">
              <NavDropdown title="usd $">
                <NavDropdown.Item>Usd $</NavDropdown.Item>
              </NavDropdown>
            </div>
          </Row>
        </div>
      </Container>
      <Container class1="header header-upper" class2="align-items-center">
        <div className="col-2">
          <LinkContainer to="/">
            <Navbar.Brand className="text-white fs-3">Super Store</Navbar.Brand>
          </LinkContainer>
        </div>
        <div className="col-5">
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
        </div>
        <div className="col-5">
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

            {information ? (
              <NavDropdown
                title={
                  <>
                    <img src="/images/user.svg" alt="user" />
                    {information.username}
                  </>
                }
                id="basic-nav-dropdown"
              >
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <Link
                  className="dropdown-item"
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
              {cartState?.products.length > 0 && (
                <div className="d-flex flex-column gap-1">
                  <span>
                    <Badge pill bg="white" text="dark">
                      {cartState?.products.reduce((a: any, c: any) => a + c.quantity, 0)}
                    </Badge>
                  </span>
                  <p className="mb-0">${cartState?.cartTotal}</p>
                </div>
              )}
            </Link>
          </Nav>
        </div>
      </Container>
      <Container class1="header-bottom py-2" class2="align-items-center">
        <div className="col-12 d-flex justify-content-between">
          <NavDropdown
            className="shop-categories-menu bg-transparent"
            title={
              <>
                <img src="/images/menu.svg" alt="menu" />
                {'   '}
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
        </div>
      </Container>
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
