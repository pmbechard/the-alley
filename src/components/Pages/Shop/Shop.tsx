import { Firestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Product } from '../../Interfaces/ProductInterface';
import ProductCard from './ProductCard';
import SortByBar from './SortByBar';
import loadingIcon from '../../../img/loading.png';

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
          <div className='shop-loading-container'>
            <img className='loading-icon' src={loadingIcon} alt='loading' />
          </div>
        )}
      </div>
    </>
  );
};

export default Shop;
