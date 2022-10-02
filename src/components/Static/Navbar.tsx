import React from 'react';
import { Product } from '../Interfaces/ProductInterface';

interface Props {
  getProducts: Product[] | undefined;
  setProductsInView: React.Dispatch<
    React.SetStateAction<Product[] | undefined>
  >;
}

const Navbar: React.FC<Props> = ({ getProducts, setProductsInView }) => {
  return (
    <ol className='navbar'>
      <li
        onClick={() =>
          setProductsInView(
            getProducts?.filter((product) =>
              product.tags.includes('electronics')
            )
          )
        }
      >
        Electronics
      </li>
      <li
        onClick={() =>
          setProductsInView(
            getProducts?.filter((product) => product.tags.includes('clothes'))
          )
        }
      >
        Clothes
      </li>
      <li
        onClick={() =>
          setProductsInView(
            getProducts?.filter((product) => product.tags.includes('outdoor'))
          )
        }
      >
        Outdoor
      </li>
      <li
        onClick={() =>
          setProductsInView(
            getProducts?.filter((product) => product.tags.includes('books'))
          )
        }
      >
        Books
      </li>
      <li
        onClick={() =>
          setProductsInView(
            getProducts?.filter((product) => product.tags.includes('music'))
          )
        }
      >
        Music
      </li>
      <li onClick={() => setProductsInView(getProducts)}>All</li>
    </ol>
  );
};

export default Navbar;
