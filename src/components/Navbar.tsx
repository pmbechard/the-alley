import React from 'react';

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <ol className='navbar'>
      <li>Electronics</li>
      <li>Clothes</li>
      <li>Outdoor</li>
      <li>Books</li>
      <li>Music</li>
      <li>Budget</li>
    </ol>
  );
};

export default Navbar;
