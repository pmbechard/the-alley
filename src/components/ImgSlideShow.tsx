import React, { useEffect, useState } from 'react';
import { Product } from './Interfaces/ProductInterface';
import loadingIcon from '../img/loading.png';

interface Props {
  products: Product[] | undefined;
  timer: number;
  tag: string;
}

const ImgSlideShow: React.FC<Props> = ({ products, timer, tag }) => {
  const [imgCounter, setImgCounter] = useState<number>(0);
  const [currentImg, setCurrentImg] = useState<string>();

  useEffect(() => {
    const slide = setInterval(() => {
      if (!products) return;
      setCurrentImg(products[imgCounter].img);
      setImgCounter(imgCounter + 1);
      if (imgCounter === products.length - 1) setImgCounter(0);
    }, timer);
    return () => clearInterval(slide);
  }, [imgCounter, products, timer]);

  return (
    <>
      {currentImg ? (
        <img className={`${tag}-slideshow-img`} src={currentImg} alt='' />
      ) : (
        <img className='loading-icon' src={loadingIcon} alt='loading' />
      )}
    </>
  );
};

export default ImgSlideShow;
