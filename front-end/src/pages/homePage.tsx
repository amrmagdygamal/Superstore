import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductInfo } from '../types/ProductInfo';
import { useEffect, useReducer } from 'react';
import { getError } from '../utils';
import { ApiError } from '../types/ApiErrors';
import axios from 'axios';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';



type State = {
  products: ProductInfo[]
  loading: boolean
  error: string
};

type Action = 
  | { type: 'FETCH_REQUEST' }
  | { 
    type: "FETCH_SUCCESS"
    payload: ProductInfo[]
    }
  | { type: "FETCH_FAIL"; payload: string }


  const initialState: State = {
    products: [],
    loading: true,
    error: '',
  }


  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'FETCH_REQUEST': 
      return { ...state, loading: true }

      case 'FETCH_SUCCESS':
        return { ...state, products: action.payload, loading: false }

      case 'FETCH_FAIL': 
      return { ...state, loading: false, error: action.payload }
    }
  }

const HomePage = () => {


  const [{ loading, error, products }, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState)

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const response = await axios.get("/api/products")
        dispatch({ type: "FETCH_SUCCESS", payload: response.data})

      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error as ApiError) })
      }
    }
    fetchData();
  }, [])

  return (

    loading ? (
      <LoadingBox />
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (

    
    <>
      <Row>
        {products.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <Link to={'/product' + product.slug}>
              <div className="photo-box">
              <img className="" src={product.image} alt={product.name} />
              </div>

              <h2>{product.name}</h2>
              <p>${product.price}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </>
    )
  );
};

export default HomePage;
