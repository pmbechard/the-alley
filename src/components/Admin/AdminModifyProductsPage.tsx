import React from 'react';
import backIcon from '../../img/back.png';

interface Props {
  setAdminPage: React.Dispatch<React.SetStateAction<string>>;
}

const AdminModifyProductsPage: React.FC<Props> = ({ setAdminPage }) => {
  return (
    <>
      <img
        className='back-btn panel-btn'
        src={backIcon}
        alt='back'
        onClick={() => setAdminPage('main')}
      />
      <h1>Modify Products</h1>
    </>
  );
};

export default AdminModifyProductsPage;
