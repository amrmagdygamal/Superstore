import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';

const WishList = () => {
  return (
    <>
      <Meta title="Wishlist Page" />
      <BreadCrumb title="Wishlist Page" />
      <div className="wishlist home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="wishlist-card position-relative">
                  <img
                    src="images/cross.svg"
                    className="cross position-absolute img-fluid"
                    alt="cross"
                  />
                <div className="wishlist-card-image">
                  <img src="images/watch.jpg" className='w-100 img-fluid' alt="watch" />
                </div>
                <div className="py-3 px-3">
                  <h5 className="title">Honor T1 7 .0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet</h5>
                  <h6 className="price">$ 100</h6>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="wishlist-card position-relative">
                  <img
                    src="images/cross.svg"
                    className="cross position-absolute img-fluid"
                    alt="cross"
                  />
                <div className="wishlist-card-image">
                  <img src="images/watch.jpg" className='w-100 img-fluid' alt="watch" />
                </div>
                <div className="py-3 px-3">
                  <h5 className="title">Honor T1 7 .0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet</h5>
                  <h6 className="price">$ 100</h6>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="wishlist-card position-relative">
                  <img
                    src="images/cross.svg"
                    className="cross position-absolute img-fluid"
                    alt="cross"
                  />
                <div className="wishlist-card-image">
                  <img src="images/watch.jpg" className='w-100 img-fluid' alt="watch" />
                </div>
                <div className="py-3 px-3">
                  <h5 className="title">Honor T1 7 .0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet</h5>
                  <h6 className="price">$ 100</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
