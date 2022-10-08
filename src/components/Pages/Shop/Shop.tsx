import { Firestore } from 'firebase/firestore';
import { useEffect } from 'react';
import { Product } from '../../Interfaces/ProductInterface';
import SortByBar from './SortByBar';
import ShopProducts from './ShopProducts';

interface Props {
  db: Firestore;
  productsInView: Product[] | undefined;
  setProductsInView: React.Dispatch<
    React.SetStateAction<Product[] | undefined>
  >;
  getSortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

const Shop: React.FC<Props> = ({
  db,
  productsInView,
  setProductsInView,
  getSortBy,
  setSortBy,
}) => {
  useEffect(() => {
    window.scroll(0, 0);
  });

  //FIXME: rendered Products updating one step behind

  return (
    <>
      <SortByBar getSortBy={getSortBy} setSortBy={setSortBy} />
      <div className='shop-container'>
        <ShopProducts productsInView={productsInView} />
      </div>
    </>
  );
};

export default Shop;
