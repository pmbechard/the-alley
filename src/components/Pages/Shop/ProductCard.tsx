import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../Interfaces/ProductInterface';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link className='product-card-link' to={`${product.name}`}>
      <div className='product-card'>
        <div className='card-img-area'>
          <img src={product.img} alt={product.name} />
        </div>
        <div className='card-info-area'>
          <h3>{product.name}</h3>
          <p>{product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
