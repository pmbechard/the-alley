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

  const sortProductsInView = () => {
    if (!productsInView) return;

    if (getSortBy === 'z-a') {
      setProductsInView(
        productsInView.sort((a: Product, b: Product) => {
          return a.name.toLowerCase() >= b.name.toLowerCase() ? -1 : 1;
        })
      );
    } else if (getSortBy === 'price-l-h') {
      setProductsInView(
        productsInView.sort((a: Product, b: Product) => {
          return a.price >= b.price ? 1 : -1;
        })
      );
    } else if (getSortBy === 'price-h-l') {
      setProductsInView(
        productsInView.sort((a: Product, b: Product) => {
          return a.price >= b.price ? -1 : 1;
        })
      );
    } else {
      setProductsInView(
        productsInView.sort((a: Product, b: Product) => {
          return a.name.toLowerCase() >= b.name.toLowerCase() ? 1 : -1;
        })
      );
    }
    return () => setSortBy('');
  }

  return (
    <>
      <SortByBar
        productsInView={productsInView}
        setProductsInView={setProductsInView}
        getSortBy={getSortBy}
        setSortBy={setSortBy}
        sortProductsInView={sortProductsInView}
      />
      <div className='shop-container'>
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
      </div>
    </>
  );
};

export default Shop;
