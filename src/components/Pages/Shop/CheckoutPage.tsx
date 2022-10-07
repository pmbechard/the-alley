import React from 'react';
import { Product } from '../../Interfaces/ProductInterface';
import backIcon from '../../../img/back.png';

interface Props {
  getCartItems: Product[] | undefined;
  setShowCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckoutPage: React.FC<Props> = ({ getCartItems, setShowCheckout }) => {
  return (
    <div className='checkout-container'>
      <img
        src={backIcon}
        alt='back'
        className='checkout-back-btn'
        onClick={() => {
          setShowCheckout(false);
        }}
      />
      {getCartItems?.map((item) => {
        return <p key={item.name.replaceAll(' ', '-')}>{item.name}</p>;
      })}
    </div>
  );
};

export default CheckoutPage;
