import { Badge, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReachStars from 'react-rating-stars-component';
import { ProductInfo } from '../types/ProductInfo';

interface propsTypes {
  product: ProductInfo
}


const SpecialProduct = (props: propsTypes) => {

  const {
    product
  } = props;

  return (
    <div className="col-6 mb-4">
      <Card className="special-product-card">
        <div className="d-flex justify-content-between">
          <Link to={`/product/${product?._id}`}>
            <div className="">
              <img src="images/watch.jpg" className="img-fluid" alt="watch" />
            </div>
          </Link>
          <Card.Body>
            <Link to={''} onClick={(e) => e.preventDefault()}>
              <h6 className="brand">{product?.brand}</h6>
              <Card.Title>
                {product?.name}
                <br />
                Mobile Phone; sim
              </Card.Title>
            </Link>
            <ReachStars
              count={5}
              size={24}
              value={product?.totalrating}
              edit={false}
              activeColor="#ffd700"
            />
            <Card.Text>
              <span className="red-p">{product?.price}</span>
               {/* &nbsp; <s>$200</s> */}
            </Card.Text>
            <div className="discount-till d-flex align-items-center gap-1">
              <p className="mb-0">
                <b>5</b> days
              </p>
              <div className="d-flex gap-2 align-items-center">
                <Badge className="p-3 rounded-circle bg-danger">1</Badge>:
                <Badge className="p-3 rounded-circle bg-danger">1</Badge>:
                <Badge className="p-3 rounded-circle bg-danger">1</Badge>
              </div>
            </div>
            <div className="prod-count my-3">
              <p>Products: {product?.countInStock}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: product?.countInStock / product?.countInStock + product?.sold * 100 + "%" }}
                  aria-valuenow={product?.countInStock / product?.countInStock + product?.sold * 100}
                  aria-valuemin={0}
                  aria-valuemax={product?.sold+product?.countInStock}
                ></div>
              </div>
            </div>
            <Link className='button' to={`/product/${product?._id}`}>
              View
            </Link>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default SpecialProduct;
