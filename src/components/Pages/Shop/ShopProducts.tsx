import React from 'react';
import { Product } from '../../Interfaces/ProductInterface';
import ProductCard from './ProductCard';
import loadingIcon from '../../../img/loading.png';
import { User } from 'firebase/auth';

interface Props {
  productsInView: Product[] | undefined;
  getCartItems: Product[] | undefined;
  modifyCartItem: (product: Product, quantity: number) => Promise<void>;
  getUserInfo: User | null;
  setWarningMsg: React.Dispatch<React.SetStateAction<string>>;
  addNewToCart: (product: Product) => Promise<void>
}

const ShopProducts: React.FC<Props> = ({
  productsInView,
  modifyCartItem,
  getCartItems,
  getUserInfo,
  setWarningMsg,
  addNewToCart
}) => {
  return (
    <>
      {productsInView ? (
        productsInView.map((product) => {
          return (
            <ProductCard
              key={product.name.replaceAll(' ', '-')}
              product={product}
              getCartItems={getCartItems}
              modifyCartItem={modifyCartItem}
              getUserInfo={getUserInfo}
              setWarningMsg={setWarningMsg}
              addNewToCart={addNewToCart}
            />
          );
        })
      ) : (
        <div className='shop-loading-container'>
          <img className='loading-icon' src={loadingIcon} alt='loading' />
        </div>
      )}
    </>
  );
};

export default ShopProducts;
