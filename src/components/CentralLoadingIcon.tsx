import React from 'react';
import loadingIcon from '../img/loading.png';

interface Props {}

const CentralLoadingIcon: React.FC<Props> = () => {
  return (
    <>
      <div className='central-loading-backdrop'>
        <img src={loadingIcon} alt='loading' className='central-loading-icon' />
      </div>
    </>
  );
};

export default CentralLoadingIcon;
