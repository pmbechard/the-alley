import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  signIn: () => void;
}

const Navbar: React.FC<Props> = ({ signIn }) => {
  return (
    <>
      <Link to='/'>Home</Link>
      <Link to='/shop'>Shop</Link>
      <button onClick={signIn}>Sign in</button>
    </>
  );
};

export default Navbar;
