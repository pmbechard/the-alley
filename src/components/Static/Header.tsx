import { User } from 'firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';

import signInIcon from '../../img/signin.png';
import cartIcon from '../../img/cart.png';
import signOutIcon from '../../img/signout.png';
import AdminPanelBtn from '../Admin/AdminPanelBtn';
import { Product } from '../Interfaces/ProductInterface';

interface Props {
  signIn: () => void;
  getUserInfo: User | null;
  signUserOut: () => void;
  showAdminPanel: boolean;
  setShowAdminPanel: React.Dispatch<React.SetStateAction<boolean>>;
  getAdmins: string[];
  getProducts: Product[] | undefined;
  setProductsInView: React.Dispatch<
    React.SetStateAction<Product[] | undefined>
  >;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  getCartItems: Product[] | undefined;
}

const Header: React.FC<Props> = ({
  signIn,
  getUserInfo,
  signUserOut,
  showAdminPanel,
  setShowAdminPanel,
  getAdmins,
  getProducts,
  setProductsInView,
  setShowCart,
  getCartItems,
}) => {
  const getTotalNumberOfCartItems = (): number => {
    if (!getCartItems || getCartItems.length === 0) return 0;
    let total = 0;
    getCartItems.forEach((item) => {
      total += item.quantity || 1;
    });
    return total;
  };
  return (
    <div className='header'>
      <div className='title-area'>
        <h1>
          <Link to='/' className='link header-title'>
            The Alley
          </Link>
        </h1>
        <p>
          |&nbsp;&nbsp;&nbsp;
          <Link
            to='/shop'
            className='link'
            onClick={() => setProductsInView(getProducts)}
          >
            Shop
          </Link>
        </p>
      </div>
      {getUserInfo ? (
        <div className='signed-in-links'>
          <p className='user-greeting'>
            Hi, {getUserInfo.displayName?.split(' ')[0]}
          </p>
          <div className='header-link' onClick={() => setShowCart(true)}>
            {getCartItems && getCartItems.length > 0 && (
              <div className='cart-counter'>{getTotalNumberOfCartItems()}</div>
            )}
            <img src={cartIcon} alt='cart' />
            Cart
          </div>
          <p onClick={signUserOut} className='header-link'>
            <img src={signOutIcon} alt='sign out' />
            Sign out
          </p>
          {getAdmins.includes(getUserInfo.email || '') && (
            <AdminPanelBtn
              showAdminPanel={showAdminPanel}
              setShowAdminPanel={setShowAdminPanel}
            />
          )}
        </div>
      ) : (
        <p onClick={signIn} className='header-link'>
          <img src={signInIcon} alt='user' />
          Sign in
        </p>
      )}
    </div>
  );
};

export default Header;
