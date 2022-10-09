import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../Interfaces/ProductInterface';
import QuantityBar from './QuantityBar';
import addToCartIcon from '../../../img/add-to-cart.png';
import { User } from 'firebase/auth';

interface Props {
  product: Product;
  getCartItems: Product[] | undefined;
  modifyCartItem: (product: Product, quantity: number) => Promise<void>;
  getUserInfo: User | null;
  setWarningMsg: React.Dispatch<React.SetStateAction<string>>;
  addNewToCart: (product: Product) => Promise<void>;
}

const ProductCard: React.FC<Props> = ({
  product,
  modifyCartItem,
  getCartItems,
  getUserInfo,
  setWarningMsg,
  addNewToCart,
}) => {
  const getQuantity = () => {
    let result = getCartItems?.filter((item) => item.name === product.name);
    if (!result || result.length === 0) return 0;
    else return result[0].quantity || 0;
  };
  return (
    <Link
      className='product-card-link'
      to={`${product.name.replaceAll(' ', '_')}`}
    >
      <div className='product-card'>
        <div className='card-img-area'>
          <img src={product.img} alt={product.name} />
        </div>
        <div className='card-info-area'>
          <h3>{product.name}</h3>
          <p>{product.price.toFixed(2)}</p>
          {getQuantity() === 0 ? (
            <img
              className='product-card-add-to-cart-icon'
              src={addToCartIcon}
              alt='Add to cart'
              onClick={() => {
                if (!getUserInfo)
                  setWarningMsg('Sign in to add products to your cart.');
                else addNewToCart(product as Product);
              }}
            />
          ) : (
            <div className='quantity-bar-container'>
              <QuantityBar
                product={product}
                quantity={getQuantity()}
                modifyCartItem={modifyCartItem}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
