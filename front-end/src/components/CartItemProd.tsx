import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { Color } from './Color';
import { Link } from 'react-router-dom';

interface PropsTypes {
  cartProd: any;
}

const CartItemProd = (props: PropsTypes) => {
  const { cartProd } = props;

  return (
    <div className="cart-data py-3 mb-2 d-flex  py-3 justify-content-between align-items-center">
      <div className="w-40 align-items-center d-flex gap-3">
        <div className="w-25">
          <img
            src={cartProd?.image.title}
            className="img-fluid"
            alt="product image"
          />
        </div>
        <div className="w-75">
          <p>superstore</p>
          <p>Size: M</p>
          <p>
            Color:{' '}
            {cartProd &&
              cartProd?.colors?.map((col: any, index: number) => {
                return (
                  <ul key={index} className="colors">
                    <Color
                      col={col}
                    />
                  </ul>
                );
              })}
          </p>
        </div>
      </div>
      <div className="w-10">
        <h5 className="price">$ {cartProd?.price}</h5>
      </div>
      <div className="w-15 d-flex gap-3 align-items-center">
        <div><Link to={`/product/${cartProd?.product}`} className='text-info fs-5'>Edit</Link></div>
        <div>
          <input
            type="text"
            name="quantity"
            min={1}
            max={9}
            className="form-control text-center"
            value={cartProd?.quantity}
            style={{ width: '3rem', maxHeight: '2rem' }}
            id=""
          />
        </div>
        <div>
          <AiFillDelete className="text-danger" />
        </div>
      </div>
      <div className="w-15">
        <h5 className="price">$ {cartProd?.quantity * cartProd?.price}</h5>
      </div>
    </div>
  );
};

export default CartItemProd;
