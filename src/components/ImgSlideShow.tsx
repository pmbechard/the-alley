import React from 'react';
import { Product } from './Interfaces/ProductInterface';
import loadingIcon from '../img/loading.png';

interface Props {
  products: Product[] | undefined;
}

const ImgSlideShow: React.FC<Props> = ({ products }) => {
  return (
    <>
      {products ? (
        <img className='slideshow-img' src='' alt='' />
      ) : (
        <img className='loading-icon' src={loadingIcon} alt='loading' />
      )}
    </>
  );
};

export default ImgSlideShow;
