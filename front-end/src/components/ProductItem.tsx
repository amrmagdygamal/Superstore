import { Card } from 'react-bootstrap';
import { ProductInfo } from '../types/ProductInfo';
import { Link, useNavigate } from 'react-router-dom';
import ReachStars from 'react-rating-stars-component';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../app/store';
// import { addToWishList } from '../features/product/productSlice';


interface ProductItemProps {
  product: ProductInfo;
  grid?: number;
}


const ProductItem = (props: ProductItemProps)=> {





  // const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { grid, product} = props;


  // const addWishlist = (id: string) => {
  //   dispatch(addToWishList(id))
  // }





  return (
    <div className={`${location.pathname == "/store" ? `gr-${grid}` : "col-3"}`}>
          <Card  className="product-card mb-4 position-relative d-flex gap-4" style={{height: grid ==12 ? "20rem" : ""}}>
        <div className="wishlist-icon position-absolute">
          <button className='border-0 bg-transparent'>
              <img src="/images/wish.svg" alt="wishlist" />
          </button>
        </div>
        <div>
          <div className="product-image">
            <img onClick={() => navigate(`/product/${product?._id}`)} src={product?.images[0].url} alt={product?.name} className='img-fluid mb-3 bg-white w-75'/>
            <img onClick={() => navigate(`/product/${product?._id}`)} src={product?.images[0].url} alt={product?.name} className='img-fluid mb-3 bg-white w-75'/>
          </div>
        </div>

        <Card.Body>
          <Link to={`/product/${product?._id}`}>
            <h6 className="brand">{product?.brand}</h6>
            <Card.Title>{product?.name}</Card.Title>
          </Link>
          car
          <ReachStars
              count={5}
              size={24}
              value={product?.totalrating}
              edit={false}
              activeColor="#ffd700"
            />

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
