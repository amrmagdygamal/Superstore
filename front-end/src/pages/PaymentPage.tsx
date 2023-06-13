import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';


const PaymentPage = () => {

  const navigate = useNavigate()



  const [payMethodName, setPayMethodName] = useState(paymentMethod || 'PayPal')

  useEffect(() => {
    
    if(!shippingAddress.address) {
      navigate('/shipping')
    }

  }, [shippingAddress, navigate])

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: 'CHOOSE_PAYMENT_METHOD', payload: payMethodName})
    localStorage.setItem('paymentMethod', payMethodName)
    navigate('/placeorder')
  }

  return (
    <>
      <CheckOutSteps step1 step2 step3 />
        <Container className="small-container">
          <Helmet>
            <title>Payment Method</title>
          </Helmet>

          <h1 className="my-3">
            Payment Method
          </h1>
          <Form onSubmit={submitHandler}>
            <div className="mb-3">
              <Form.Check
                type="radio"
                id="PayPal"
                label="PayPal"
                value="PayPal"
                checked={payMethodName === 'PayPal'}
                onChange={(e) => setPayMethodName(e.target.value)}
              />
            </div>
            
            <div className="mb-3">
              <Form.Check
                type="radio"
                id="Stripe"
                label="Stripe"
                value="Stripe"
                checked={payMethodName === 'Stripe'}
                onChange={(e) => setPayMethodName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <Button type="submit">Continue</Button>
            </div>
          </Form>
        </Container>
    </>
  )
}

export default PaymentPage;