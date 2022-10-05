import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product } from '../../Interfaces/ProductInterface';
import addToCartIcon from '../../../img/add-to-cart.png';
import backIcon from '../../../img/back-2.png';
import { User } from 'firebase/auth';
import loadingIcon from '../../../img/loading.png';
import QuantityBar from './QuantityBar';

interface Props {
  getProducts: Product[] | undefined;
  getUserInfo: User | null;
  setWarningMsg: React.Dispatch<React.SetStateAction<string>>;
  addNewToCart: (product: Product) => Promise<void>;
  getCartItems: Product[] | undefined;
  modifyCartItem: (product: Product, quantity: number) => Promise<void>;
}

const ProductPage: React.FC<Props> = ({
  getProducts,
  getUserInfo,
  setWarningMsg,
  addNewToCart,
  getCartItems,
  modifyCartItem,
}) => {
  const { name } = useParams<string>();
  const [product, setProduct] = useState<Product>();
  const [inCart, setInCart] = useState<boolean>(false);

  useEffect(() => {
    if (!getProducts) return;
    for (let i = 0; i < getProducts.length; i++)
      if (getProducts[i].name === name?.replaceAll('_', ' '))
        setProduct(getProducts[i]);

    const checkInCart = async () => {
      setInCart(false);
      if (!getCartItems) return;
      for (let i = 0; i < getCartItems.length; i++) {
        if (getCartItems[i].name === product?.name) {
          setInCart(true);
          setProduct(getCartItems[i]);
          return;
        }
      }
    };
    checkInCart();
  }, [getCartItems, getProducts, name, product]);

  const processAddToCart = () => {
    addNewToCart(product as Product);
  };

  return (
    <>
      {product ? (
        <>
          <div className='product-page-container'>
            <div className='product-page-info'>
              <h1>{product?.name}</h1>
              <p>{product?.description}</p>
              <h3>${product?.price.toFixed(2)}</h3>
              {inCart ? (
                <QuantityBar
                  product={product}
                  quantity={product.quantity || 1}
                  modifyCartItem={modifyCartItem}
                />
              ) : (
                <img
                  src={addToCartIcon}
                  alt='Add to cart'
                  onClick={() => {
                    if (!getUserInfo)
                      setWarningMsg('Sign in to add products to your cart.');
                    else processAddToCart();
                  }}
                />
              )}
              <div className='product-page-tags'>
                {product?.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className='product-page-img'>
              <img src={product?.img} alt={product?.name} />
            </div>
          </div>
          <Link to='../shop'>
            <div className='product-page-back-btn'>
              <img src={backIcon} alt='back' />
            </div>
          </Link>
        </>
      ) : (
        <div className='product-loading-container'>
          <img className='loading-icon' src={loadingIcon} alt='loading' />
        </div>
      )}
    </>
  );
};

export default ProductPage;
