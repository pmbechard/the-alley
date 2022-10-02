import React from 'react';
import errorIcon from '../../img/error.png';

const PageNotFound = () => {
  return (
    <div className='page-not-found'>
      <img src={errorIcon} alt='error' />
      <h3>Oops... Looks like there's nothing here.</h3>
    </div>
  );
};

export default PageNotFound;
