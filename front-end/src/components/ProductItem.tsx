import { Button, Card } from "react-bootstrap"
import { ProductInfo } from "../types/ProductInfo"
import { Link } from "react-router-dom"
import Rating from "./Rating"
import { useContext } from "react"
import { Store } from "../Store"
import { CartItem } from "../types/Cart"
import { AddProductToCart } from "../utils"



const ProductItem = ({ product }: { product: ProductInfo}) => {

  const { state, dispatch } = useContext(Store)

  const {
    cart: { cartItems },
  } = state

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1

    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity},
    })
  }


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
          <Button onClick={() => addToCartHandler(AddProductToCart(product))}>Add to Cart</Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductItem;