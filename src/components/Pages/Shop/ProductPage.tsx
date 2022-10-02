import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../Interfaces/ProductInterface';
import addToCartIcon from '../../../img/add-to-cart.png';

interface Props {
  getProducts: Product[] | undefined;
}

const ProductPage: React.FC<Props> = ({ getProducts }) => {
  const { name } = useParams<string>();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (!getProducts) return;
    for (let i = 0; i < getProducts.length; i++)
      if (getProducts[i].name === name) setProduct(getProducts[i]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='product-page-container'>
      <div className='product-page-info'>
        <h1>{product?.name}</h1>
        <p>{product?.description}</p>
        <h3>${product?.price.toFixed(2)}</h3>
        <img src={addToCartIcon} alt='Add to cart' />
        <div className='product-page-tags'>
          {product?.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className='product-page-img'>
        <img src={product?.img} alt={product?.name} />
      </div>
    </div>
  );
};

export default ProductPage;
