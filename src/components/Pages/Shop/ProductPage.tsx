import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../Interfaces/ProductInterface';

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
  });

  return <div>{product?.name}</div>;
};

export default ProductPage;
