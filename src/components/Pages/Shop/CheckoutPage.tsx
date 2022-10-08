import React from 'react';
import { Product } from '../../Interfaces/ProductInterface';
import backIcon from '../../../img/back.png';
import { Link } from 'react-router-dom';

interface Props {
  getCartItems: Product[] | undefined;
  setShowCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckoutPage: React.FC<Props> = ({ getCartItems, setShowCheckout }) => {
  const getTotal = (): number => {
    let total = 0;
    getCartItems?.forEach((item) => {
      total += item.price * (item.quantity || 1);
    });
    return total;
  };

  return (
    <div className='checkout-container'>
      <Link to='/'>
        <img
          src={backIcon}
          alt='back'
          className='checkout-back-btn'
          onClick={() => {
            setShowCheckout(false);
          }}
        />
      </Link>
      <h1>Checkout</h1>
      <div className='checkout-area'>
        {getCartItems?.map((item) => {
          return (
            <div className='checkout-item' key={item.name.replaceAll(' ', '-')}>
              <div className='checkout-img-container'>
                <img src={item.img} alt='' />
              </div>
              <h3>{item.name}</h3>
              <p>
                {item.quantity} x {item.price}
              </p>
            </div>
          );
        })}
        <div className='checkout-subtotal-area'>
          <h2>Subtotal:</h2>
          <h2>${getTotal().toFixed(2)}</h2>
        </div>
        <button>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
