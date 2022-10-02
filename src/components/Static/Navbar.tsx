import React from 'react';
import { Link } from 'react-router-dom';
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
      <Link to='./shop' className='filter-link'>
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
      </Link>
      <Link to='./shop' className='filter-link'>
        <li
          onClick={() =>
            setProductsInView(
              getProducts?.filter((product) => product.tags.includes('clothes'))
            )
          }
        >
          Clothes
        </li>
      </Link>
      <Link to='./shop' className='filter-link'>
        <li
          onClick={() =>
            setProductsInView(
              getProducts?.filter((product) => product.tags.includes('outdoor'))
            )
          }
        >
          Outdoor
        </li>
      </Link>
      <Link to='./shop' className='filter-link'>
        <li
          onClick={() =>
            setProductsInView(
              getProducts?.filter((product) => product.tags.includes('books'))
            )
          }
        >
          Books
        </li>
      </Link>
      <Link to='./shop' className='filter-link'>
        <li
          onClick={() =>
            setProductsInView(
              getProducts?.filter((product) => product.tags.includes('music'))
            )
          }
        >
          Music
        </li>
      </Link>
      <Link to='./shop' className='filter-link'>
        <li onClick={() => setProductsInView(getProducts)}>All</li>
      </Link>
    </ol>
  );
};

export default Navbar;
