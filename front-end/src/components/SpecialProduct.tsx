import { Badge, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReachStars from 'react-rating-stars-component';

const SpecialProduct = () => {
  return (
    <div className="col-6 mb-4">
      <Card className="special-product-card">
        <div className="d-flex justify-content-between">
          <Link to="">
            <div className="">
              <img src="images/watch.jpg" className="img-fluid" alt="watch" />
            </div>
          </Link>
          <Card.Body>
            <Link to={''}>
              <h6 className="brand">Havels</h6>
              <Card.Title>
                Samsoung Galaxy Note10+
                <br />
                Mobile Phone; sim
              </Card.Title>
            </Link>
            <ReachStars
              count={5}
              size={24}
              value={3}
              edit={false}
              activeColor="#ffd700"
            />
            <Card.Text>
              <span className="red-p">$199.999</span> &nbsp; <s>$200</s>
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
              <p>Products: 5</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: '25%' }}
                  aria-valuenow={25}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
            </div>
            <Link className='button' to='/'>
              Add To Cart
            </Link>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default SpecialProduct;
