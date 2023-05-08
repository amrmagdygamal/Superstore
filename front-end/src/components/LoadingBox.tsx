import { Spinner } from "react-bootstrap"



const LoadingBox = () => {
  return (
    <Spinner animation="border">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default LoadingBox;