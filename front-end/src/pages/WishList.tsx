import { useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { getUserWishlist } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
import { addToWishList } from '../features/product/productSlice';

const WishList = () => {
  const dispatch: AppDispatch = useDispatch();

  const WishListState = useSelector((state: any) => state.user.wishlist);


  const getFavProducts = () => {
    dispatch(getUserWishlist());
  };

  const removefromlist = (id: string) => {
    dispatch(addToWishList(id))
    setTimeout(() => {
      dispatch(getUserWishlist())
    }, 300);
  }

  useEffect(() => {
    getFavProducts();
  }, []);

  return (
    <>
      <Meta title="Wishlist Page" />
      <BreadCrumb title="Wishlist Page" />
      <Container class1="wishlist home-wrapper-2 py-5">
        {WishListState?.length === 0 && <div className='text-center fs-4'><b>No Products added to Wishlist</b></div>}
        {WishListState&&
          WishListState?.map((product: any, index: string) => {
          <div key={index} className="col-3">
          <div className="wishlist-card position-relative">
            <img
              onClick={() => removefromlist(product?._id)}
              src="images/cross.svg"
              className="cross position-absolute img-fluid"
              alt="cross"
            />
            <div className="wishlist-card-image">
              <img
                src={product?.images[0].url}
                className="w-100 img-fluid"
                alt="watch"
              />
            </div>
            <div className="py-3 px-3">
              <h5 className="title">
                {product?.name}
              </h5>
              <h6 className="price">{product?.price}</h6>
            </div>
          </div>
        </div>
        })}
        
      </Container>
    </>
  );
};

export default WishList;
