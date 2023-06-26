
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';

const OrdersHistory = () => {



  return (
    <>
      <Meta title="Orders Page" />
      <BreadCrumb title="Orders Page" />
      <h1 className="my-3">Orders History</h1>
      <Container class1="py-5 home-wrapper-2">
      
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
            {/* {orderState &&
              
              <>
                orderState?.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                    <td>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : 'No'}
                    </td>
                    <td>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => {
                          navigate(`/order/${order._id}`);
                        }}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </>
              
            } */}
          </tbody>
        </table>
      </Container>
    </>
  );
};

export default OrdersHistory;
