import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home-container'>
      <div className='hot-items suggested-area'>
        <div className='suggested-img-area'></div>
        <div className='suggested-text-area'>What's hot?</div>
      </div>
      <div className='budget-items suggested-area'>
        <div className='suggested-img-area'></div>
        <div className='suggested-text-area'>On a budget</div>
      </div>

      <Link to='/shop' className='link'>
        <div className='all-items suggested-area'>
          <div className='suggested-img-area'></div>
          <div className='suggested-text-area'>View all</div>
        </div>
      </Link>
    </div>
  );
};

export default Home;
