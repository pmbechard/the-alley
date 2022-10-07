import React from 'react';
import { Product } from '../../Interfaces/ProductInterface';

interface Props {
  getCartItems: Product[] | undefined;
  setCartItems: React.Dispatch<React.SetStateAction<Product[] | undefined>>;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal: React.FC<Props> = ({
  getCartItems,
  setCartItems,
  setShowCart,
}) => {
  return (
    <div className='cart-container'>
      <div className='cart-backdrop' onClick={() => setShowCart(false)}></div>
      <div className='cart-modal'>
        {getCartItems && getCartItems.length > 0 ? (
          getCartItems.map((item) => {
            return (
              <div key={item.name.replace(' ', '-')} className='cart-item'>
                {item.name}
              </div>
            );
          })
        ) : (
          <p>Cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartModal;
