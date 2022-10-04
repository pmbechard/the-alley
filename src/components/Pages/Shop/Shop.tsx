import { Firestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Product } from '../../Interfaces/ProductInterface';
import ProductCard from './ProductCard';
import SortByBar from './SortByBar';

interface Props {
  db: Firestore;
  productsInView: Product[] | undefined;
  setProductsInView: React.Dispatch<
    React.SetStateAction<Product[] | undefined>
  >;
}

const Shop: React.FC<Props> = ({ db, productsInView, setProductsInView }) => {
  const [getSortBy, setSortBy] = useState<string>('');

  useEffect(() => {
    window.scroll(0, 0);
  });

  useEffect(() => {}, [productsInView]);

  return (
    <>
      <SortByBar
        productsInView={productsInView}
        setProductsInView={setProductsInView}
        getSortBy={getSortBy}
        setSortBy={setSortBy}
      />
      <div className='shop-container'>
        {productsInView ? (
          productsInView.map((product) => {
            return (
              <ProductCard
                key={product.name.replace(' ', '-')}
                product={product}
              />
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </>
  );
};

export default Shop;
