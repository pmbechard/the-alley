import React from 'react';
import { Product } from './Interfaces/ProductInterface';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className='product-card'>
      <div className='card-img-area'>
        <img src={product.img} alt={product.name} />
      </div>
      <div className='card-info-area'>
        <h3>{product.name}</h3>
        <p>{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
