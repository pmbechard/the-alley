import { Firestore } from 'firebase/firestore';
import { useEffect } from 'react';
import { Product } from '../../Interfaces/ProductInterface';
import SortByBar from './SortByBar';
import ShopProducts from './ShopProducts';
import { User } from 'firebase/auth';

interface Props {
  db: Firestore;
  productsInView: Product[] | undefined;
  setProductsInView: React.Dispatch<
    React.SetStateAction<Product[] | undefined>
  >;
  getSortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  modifyCartItem: (product: Product, quantity: number) => Promise<void>;
  getCartItems: Product[] | undefined;
  getUserInfo: User | null;
  setWarningMsg: React.Dispatch<React.SetStateAction<string>>;
  addNewToCart: (product: Product) => Promise<void>
}

const Shop: React.FC<Props> = ({
  db,
  productsInView,
  setProductsInView,
  getSortBy,
  setSortBy,
  modifyCartItem,
  getCartItems,
  getUserInfo,
  setWarningMsg,
  addNewToCart
}) => {
  useEffect(() => {
    window.scroll(0, 0);
  });

  //FIXME: rendered Products updating one step behind

  return (
    <>
      <SortByBar getSortBy={getSortBy} setSortBy={setSortBy} />
      <div className='shop-container'>
        <ShopProducts
          productsInView={productsInView}
          getCartItems={getCartItems}
          modifyCartItem={modifyCartItem}
          getUserInfo={getUserInfo}
          setWarningMsg={setWarningMsg}
          addNewToCart={addNewToCart}
        />
      </div>
    </>
  );
};

export default Shop;
