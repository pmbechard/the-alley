import { collection, Firestore, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Product } from '../ProductInterface';

interface Props {
  db: Firestore;
}

const Shop: React.FC<Props> = ({ db }) => {
  const [getProducts, setProducts] = useState<Product[]>();

  useEffect(() => {
    fetchProducts();
  });

  const fetchProducts = async () => {
    let products = await getDocs(collection(db, 'products'));
    let productsList: Product[] = [];
    products.forEach((product) => {
      let id = product.id;
      productsList.push({ id, ...product.data() } as Product);
    });
    setProducts(productsList);
  };

  return (
    <div className='shop-container'>
      {getProducts?.map((product) => {
        return <p key={product.id}>{product.name}</p>;
      })}
    </div>
  );
};

export default Shop;
