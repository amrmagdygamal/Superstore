import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { useGetHistoryOrdersQuery } from "../hooks/orderHooks";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { ApiError } from "../types/ApiErrors";
import { getError } from "../utils";
import { Button } from "react-bootstrap";



const OrdersHistory = () => {

  const navigate = useNavigate();

  const { data: orders, isLoading, error } = useGetHistoryOrdersQuery();




  return (
    <>
      <Helmet>
        <title>Orders History</title>
      </Helmet>
      <h1 className="my-3">
        Orders History
      </h1>
      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders!.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'
                  }
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`)
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </>
  )
}

export default OrdersHistory