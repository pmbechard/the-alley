import React from 'react';
import { Product } from '../../Interfaces/ProductInterface';
import errorIcon from '../../../img/error.png';
import cartIcon from '../../../img/cart.png';
import backIcon from '../../../img/back.png';
import QuantityBar from './QuantityBar';

interface Props {
  getCartItems: Product[] | undefined;
  setCartItems: React.Dispatch<React.SetStateAction<Product[] | undefined>>;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  modifyCartItem: (product: Product, quantity: number) => Promise<void>;
  setShowCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal: React.FC<Props> = ({
  getCartItems,
  setCartItems,
  setShowCart,
  modifyCartItem,
  setShowCheckout,
}) => {
  const getTotal = (): number => {
    let total = 0;
    getCartItems?.forEach((item) => {
      total += item.price * (item.quantity || 1);
    });
    return total;
  };

  return (
    <div className='cart-container'>
      <div className='cart-backdrop' onClick={() => setShowCart(false)}></div>
      <div className='cart-modal'>
        <img
          src={backIcon}
          alt='back'
          className='cart-back-btn'
          onClick={() => {
            setShowCart(false);
          }}
        />
        <img src={cartIcon} alt='cart' />
        <h1>Your Items:</h1>
        {getCartItems && getCartItems.length > 0 ? (
          getCartItems.map((item) => {
            return (
              <div key={item.name.replace(' ', '-')} className='cart-item'>
                <div className='cart-product-img-container'>
                  <img
                    src={item.img}
                    alt={item.name}
                    className='cart-product-img'
                  />
                </div>
                <div className='cart-product-info'>
                  <p>{item.name}</p>
                  <QuantityBar
                    product={
                      getCartItems.filter(
                        (product) => product.name === item.name
                      )[0]
                    }
                    quantity={
                      getCartItems.filter(
                        (product) => product.name === item.name
                      )[0].quantity || 1
                    }
                    modifyCartItem={modifyCartItem}
                  />
                </div>
                <div className='cart-product-subtotal'>
                  {(item.price * (item.quantity || 1)).toFixed(2)}
                </div>
              </div>
            );
          })
        ) : (
          <div className='empty-cart-msg'>
            <img src={errorIcon} alt='error' />
            <h3>Your cart is empty.</h3>
          </div>
        )}

        {getCartItems && getCartItems.length > 0 && (
          <>
            <div className='cart-subtotal-area'>
              <h2>Subtotal:</h2>
              <h2>${getTotal().toFixed(2)}</h2>
            </div>
            <button
              className='checkout-btn'
              onClick={() => {
                setShowCart(false);
                setShowCheckout(true);
              }}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
