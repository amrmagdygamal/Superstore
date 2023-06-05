import { Button, Card } from "react-bootstrap"
import { ProductInfo } from "../types/ProductInfo"
import { Link } from "react-router-dom"
import Rating from "./Rating"
import { useContext } from "react"
import { Store } from "../Store"
import { AddProductToCart } from "../utils"
import { toast } from "react-toastify"



const ProductItem = ({ product }: { product: ProductInfo}) => {

  const { state, dispatch } = useContext(Store)

  const {
    cart: { cartItems },
  } = state

  const addToCartHandler = () => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1

    if (product.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...AddProductToCart(product), quantity},
    })
    toast.success('Item added to the cart')
  }


  return (
    <Card>
      <Link to={`/product/${product._id}`}>
        <div className="photo-box">
          <img src={product.image} alt={product.name} />
        </div>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
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
    </Card>
  )
}

export default ProductItem;