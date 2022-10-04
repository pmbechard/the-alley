import React, { useEffect } from 'react';
import { Product } from '../../Interfaces/ProductInterface';

interface Props {
  productsInView: Product[] | undefined;
  setProductsInView: React.Dispatch<
    React.SetStateAction<Product[] | undefined>
  >;
  getSortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

const SortByBar: React.FC<Props> = ({
  productsInView,
  setProductsInView,
  getSortBy,
  setSortBy,
}) => {
  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSortBy]);

  return (
    <div className='sort-by-bar-container'>
      <select
        name='sort-by-bar'
        id='sort-by-bar'
        onInput={(e) => setSortBy(e.currentTarget.value)}
      >
        <option value='a-z'>A-Z</option>
        <option value='z-a'>Z-A</option>
        <option value='price-l-h'>Price (low-high)</option>
        <option value='price-h-l'>Price (high-low)</option>
      </select>
    </div>
  );
};

export default SortByBar;
