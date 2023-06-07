import { Button, Card } from 'react-bootstrap';
import { ProductInfo } from '../types/ProductInfo';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';
import { AddProductToCart } from '../utils';
import { toast } from 'react-toastify';
import Rating from './Rating';


interface ProductItemProps {
  product: ProductInfo;
  grid: number;
}


const ProductItem = ({ product, grid }: ProductItemProps)=> {
  const location = useLocation();
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = () => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...AddProductToCart(product), quantity },
    });
    toast.success('Item added to the cart');
  };

  return (
    <div className={`${location.pathname == "/store" ? `gr-${grid}` : "col-3"}`}>
      <Card className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <Link to="">
              <img src="images/wish.svg" alt="wishlist" />
          </Link>
        </div>
        <Link to={`/product/${product._id}`}>
          <div className="product-image">
            <img src='images/watch.jpg' alt={product.name} />
            <img src='images/watch-1.avif' alt={product.name} />
          </div>
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <h6 className="brand">Havels</h6>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text>${product.price}</Card.Text>

          {product.countInStock === 0 ? (
            <Button variant="lignt" disabled>
              Out of stock
            </Button>
          ) : (
            <Button onClick={addToCartHandler}>Add to Cart</Button>
          )}
        </Card.Body>
        <div className="action-bar position-absolute">
          <div className="d-flex gap-2 flex-column">
            <Link to="">
              <img src="images/prodcompare.svg" alt="compare" />
            </Link>
            <Link to="">
              <img src="images/view.svg" alt="view" />
            </Link>
            <Link to="">
              <img src="images/add-cart.svg" alt="addcart" />
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductItem;
