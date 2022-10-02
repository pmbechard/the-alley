import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../Interfaces/ProductInterface';

interface Props {
  getProducts: Product[] | undefined;
  setProductsInView: React.Dispatch<
    React.SetStateAction<Product[] | undefined>
  >;
}

const Home: React.FC<Props> = ({ getProducts, setProductsInView }) => {
  return (
    <div className='home-container'>
      <Link to='shop' className='suggested-area-link'>
        <div
          className='hot-items suggested-area'
          onClick={() =>
            setProductsInView(
              getProducts?.filter((product) => product.tags.includes('hot'))
            )
          }
        >
          <div className='suggested-img-area'></div>
          <div className='suggested-text-area'>What's hot?</div>
        </div>
      </Link>

      <Link to='shop' className='suggested-area-link'>
        <div
          className='budget-items suggested-area'
          onClick={() =>
            setProductsInView(
              getProducts?.filter((product) => product.tags.includes('budget'))
            )
          }
        >
          <div className='suggested-img-area'></div>
          <div className='suggested-text-area'>On a budget</div>
        </div>
      </Link>

      <Link to='/shop' className='link'>
        <div
          className='all-items suggested-area'
          onClick={() => setProductsInView(getProducts)}
        >
          <div className='suggested-img-area'></div>
          <div className='suggested-text-area'>View all</div>
        </div>
      </Link>
    </div>
  );
};

export default Home;
