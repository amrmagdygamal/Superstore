import React, { useContext, useEffect, useState } from 'react';
import { Badge, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Container from './Container';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { getUserCart, logout } from '../features/user/userSlice';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getproduct } from '../features/product/productSlice';

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state: any) => state.user.cart);
  const productState = useSelector((state: any) => state?.product?.products);
  const deleteFromCartState = useSelector(
    (state: any) => state.user.deletFromCart
  );

  useEffect(() => {
    dispatch(getUserCart());
  }, [cartState | deleteFromCartState]);

  const userState = useSelector((state: any) => state.user);

  const [productOpt, setProductOpt] = useState([]);
  const [paginate, setPaginate] = useState(true);

  const signOutHandler = () => {
    dispatch(logout());
    localStorage.clear();
    window.location.href = '/';
  };

  useEffect(() => {
    const data: any = [];
    for (let index = 0; index < productState.length; index++) {
      const elem = productState[index];
      data.push({ id: index, prod: elem?._id, name: elem?.name });
    }
    setProductOpt(data);
  }, [productState]);

  return (
    <>
      <Container class1="header header-top-strip py-3">
        <div className="col-6">
          <p className="mb-0 text-white">
            Free Shipping Over $100 & Free Returns
          </p>
        </div>
        <div className="col-6">
          <Row>
            <div className="col-6">
              <p className="mb-0 text-white">
                Hotline :{' '}
                <a className="text-white ms-1" href="tel:+20 01095330155">
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
            <Typeahead
              id="pagination-example"
              onPaginate={() => console.log('Result Paginated')}
              onChange={(selected: any) => {
                navigate(`/product/${selected[0]?.prod}`)
                dispatch(getproduct(selected[0]?.prod))
              }}
              options={productOpt}
              paginate={paginate}
              labelKey={"name"}
              minLength={2}
              placeholder="Search For Products here..."
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
              <p className="mb-0 text-white">
                Compare <br /> Products
              </p>
            </Link>
            <Link className="nav-link d-flex gap-2" to="/wishlist">
              <img src="/images/wishlist.svg" alt="wishlist" />
              <p className="mb-0 text-white">
                Favourite <br /> Wishlist
              </p>
            </Link>

            {userState?.userInfor === null || userState?.logoutuser === true ? (
              <Link className="nav-link d-flex text-white gap-2" to="/login">
                Login <br /> My Account
              </Link>
            ) : (
              <NavDropdown
                title={
                  <>
                    <img src="/images/user.svg" alt="user" />
                    {userState?.userInfor?.username}
                  </>
                }
                id="basic-nav-dropdown"
              >
                <Link
                  className="dropdown-item"
                  to="/profile-page"
                  onClick={signOutHandler}
                >
                  My Profile
                </Link>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <Link
                  className="dropdown-item"
                  to="/signout"
                  onClick={signOutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
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
                      {cartState?.products.reduce(
                        (a: any, c: any) => a + c.quantity,
                        0
                      )}
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
        <div className="col-12 d-flex gap-5">
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
          <Nav className="align-items-center gap-3">
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
