import { User } from 'firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';

import signInIcon from '../../img/signin.png';
import cartIcon from '../../img/cart.png';
import signOutIcon from '../../img/signout.png';

interface Props {
  signIn: () => void;
  getUserInfo: User | null;
  signUserOut: () => void;
}

const Header: React.FC<Props> = ({ signIn, getUserInfo, signUserOut }) => {
  return (
    <div className='header'>
      <div className='title-area'>
        <h1>
          <Link to='/' className='link header-title'>
            The Alley
          </Link>
        </h1>
        <p>
          |&nbsp;&nbsp;&nbsp;<Link to='/store'>Shop</Link>
        </p>
      </div>
      {getUserInfo ? (
        <div className='signed-in-links'>
          <p className='user-greeting'>
            Hi, {getUserInfo.displayName?.split(' ')[0]}
          </p>
          <p className='header-link'>
            <img src={cartIcon} alt='cart' />
            Cart
          </p>
          <p onClick={signUserOut} className='header-link'>
            <img src={signOutIcon} alt='sign out' />
            Sign out
          </p>
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
