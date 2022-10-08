import React from 'react';
import { Product } from '../../Interfaces/ProductInterface';
import ProductCard from './ProductCard';
import loadingIcon from '../../../img/loading.png';

interface Props {
  productsInView: Product[] | undefined;
}

const ShopProducts: React.FC<Props> = ({ productsInView }) => {
  return (
    <>
      {productsInView ? (
        productsInView.map((product) => {
          return (
            <ProductCard
              key={product.name.replaceAll(' ', '-')}
              product={product}
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
