import { Button, Card } from "react-bootstrap"
import { ProductInfo } from "../types/ProductInfo"
import { Link } from "react-router-dom"
import Rating from "./Rating"



const ProductItem = ({ product }: { product: ProductInfo}) => {
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <div className="photo-box">
        <img src={product.image} alt={product.name} />
        </div>
      </Link>

      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>

        {product.countInStock === 0 ? (
          <Button variant="lignt" disabled>
            Out of stock
          </Button>
        ) : (
          <Button>Add to Cart</Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductItem