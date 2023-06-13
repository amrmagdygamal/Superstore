import { Button, Card } from 'react-bootstrap';
import { ProductInfo } from '../types/ProductInfo';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Rating from './Rating';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { addToWishList } from '../features/product/productSlice';


interface ProductItemProps {
  product: ProductInfo;
  grid?: number;
}


const ProductItem = (props: ProductItemProps)=> {


  const dispatch: AppDispatch = useDispatch();

  const { grid, product} = props;

  const location = useLocation();

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
        <Link to={`/product/${product?._id}`}>
          <div className="product-image">
            <img src={product?.images[0]} alt={product?.name} />
            <img src={product?.images[0]} alt={product?.name} />
          </div>
        </Link>

        <Card.Body>
          <Link to={`/product/${product?._id}`}>
            <h6 className="brand">{product?.brand}</h6>
            <Card.Title>{product?.name}</Card.Title>
          </Link>
          car
          <Rating rating={product?.totalrating} />

          <Card.Text>{product?.description}</Card.Text>
          <Card.Text>$ {product?.price}</Card.Text>

          {product?.countInStock === 0 ? (
            <Button variant="lignt" disabled>
              Out of stock
            </Button>
          ) : (
            <Button>Add to Cart</Button>
          )}
        </Card.Body>
        <div className="action-bar position-absolute">
          <div className="d-flex gap-2 flex-column">
            <Link to="">
              <img src="/images/prodcompare.svg" alt="compare" />
            </Link>
            <Link to="">
              <img src="/images/view.svg" alt="view" />
            </Link>
            <Link to="">
              <img src="/images/add-cart.svg" alt="addcart" />
            </Link>
          </div>
        </div>
      </Card>
      
    </div>
  );
};

export default ProductItem;
