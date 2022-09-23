import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <Link to='/'>Home</Link>
      <Link to='/shop'>shop</Link>
    </>
  );
};

export default Navbar;
