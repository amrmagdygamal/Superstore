import { Button, Card } from 'react-bootstrap';
import { ProductInfo } from '../types/ProductInfo';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Rating from './Rating';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { addToWishList } from '../features/product/productSlice';
import { addToCart } from '../features/user/userSlice';


interface ProductItemProps {
  product: ProductInfo;
  grid?: number;
}


const ProductItem = (props: ProductItemProps)=> {


  const addProductToCart = (id: string) => {
    dispatch(addToCart(id))
  }


  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { grid, product} = props;

  const location = useLocation();
  const getProductId = location.pathname.split("/")[2]

  const addWishlist = (id: string) => {
    dispatch(addToWishList(id))
  }





  return (
    <div className={`${location.pathname == "/store" ? `gr-${grid}` : "col-3"}`}>
          <Card  className="product-card mb-4 position-relative">
        <div className="wishlist-icon position-absolute">
          <button className='border-0 bg-transparent' onClick={() => {addWishlist(product?._id)}}>
              <img src="/images/wish.svg" alt="wishlist" />
          </button>
        </div>
        <div>
          <div className="product-image">
            <img onClick={() => navigate(`/product/${product?._id}`)} src={product?.images} alt={product?.name} />
            <img onClick={() => navigate(`/product/${product?._id}`)} src={product?.images} alt={product?.name} />
          </div>
        </div>

        <Card.Body>
          <Link to={`/product/${product?._id}`}>
            <h6 className="brand">{product?.brand}</h6>
            <Card.Title>{product?.name}</Card.Title>
          </Link>
          car
          <Rating rating={product?.totalrating} />

          <Card.Text>{product?.description}</Card.Text>
          <Card.Text>$ {product?.price}</Card.Text>
        </Card.Body>
        <div className="action-bar position-absolute">
          <div className="d-flex gap-2 flex-column">
            <Link to="/compare">
              <img src="/images/prodcompare.svg" alt="compare" />
            </Link>
            <Link to={`/product/${product?._id}`}>
              <img onClick={() => navigate(`/product/${product?._id}`)} src="/images/view.svg" alt="view" />
            </Link>
          </div>
        </div>
      </Card>
      
    </div>
  );
};

export default ProductItem;
