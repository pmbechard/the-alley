import { User } from 'firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  signIn: () => void;
  getUserInfo: User | null;
  signUserOut: () => void;
}

const MenuBar: React.FC<Props> = ({ signIn, getUserInfo, signUserOut }) => {
  return (
    <div className='navbar'>
      <h1>
        <Link to='/' className='header-title'>
          The Alley
        </Link>
      </h1>
      {getUserInfo ? (
        <div className='signed-in-links'>
          <p className='user-greeting'>Hello, {getUserInfo.displayName}</p>
          <p className='header-link'>Cart</p>
          <p onClick={signUserOut} className='header-link'>
            Sign out
          </p>
        </div>
      ) : (
        <p onClick={signIn} className='header-link'>
          Sign in
        </p>
      )}
    </div>
  );
};

export default MenuBar;
