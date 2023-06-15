import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  useGetOrderQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from '../hooks/orderHooks';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { ApiError } from '../types/ApiErrors';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

const OrderPage = () => {
  const navigate = useNavigate();


  const params = useParams();

  const { id: orderId } = params;

  const { data: order, isLoading, error, refetch } = useGetOrderQuery(orderId!);

  const { mutateAsync: payOrder, isLoading: loadingPay } =
    usePayOrderMutation();

  const testPayHandler = async () => {
    await payOrder({ orderId: orderId! });
    refetch();
    toast.success('Order is Paid');
  };

  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();

  const { data: paypalConfig } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (paypalConfig && paypalConfig.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypalConfig!.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({
          type: 'setLoadingStatus',
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      loadPaypalScript();
    }
  }, [paypalConfig]);

  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: 'vertical' },
    createOrder(data, actions) {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: {
                value: order!.totalPrice.toString(),
              },
            },
          ],
        })
        .then((orderID: string) => {
          return orderID;
        });
    },
    onApprove(data, actions) {
      return actions.order!.capture().then(async (details) => {
        try {
          await payOrder({ orderId: orderId!, ...details });
          refetch();
          toast.success('Order is paid successfully');
        } catch (error) {
          toast.error(getError(error as ApiError));
        }
      });
    },
    onError: (err) => {
      toast.error(getError(err as ApiError));
    },
  };

  return (
    <>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-3">Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> <br />
                <strong>Address:</strong>

              </Card.Text>
            
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong>
              </Card.Text>
              
                <MessageBox variant="warning">Not Paid</MessageBox>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                  <ListGroup.Item >
                    <Row className="align-items-center">
                      <Col mb={6}>
                        <img
                          src=''
                          alt=''
                          className="img-fluid rounded thumbnail"
                        ></img>{' '}
                        <Link to={`/product`}></Link>
                      </Col>
                      <Col md={3}>
                        <span></span>
                      </Col>
                      <Col md={3}>
                        <span>$</span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>$</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>$</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>$</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>$</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                  <ListGroup.Item>
                      <LoadingBox />
                      <MessageBox variant="danger">
                        Error in connecting to paypal
                      </MessageBox>
                        <PayPalButtons
                          {...paypalbuttonTransactionProps}
                        ></PayPalButtons>
                        <Button onClick={testPayHandler}>Test Pay</Button> <LoadingBox></LoadingBox>
                  </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );

  return <div>OrderPage</div>;
};

export default OrderPage;
