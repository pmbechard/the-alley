import React, { useEffect } from 'react';
import checkIcon from '../../img/check.png';

interface Props {
  setAdminPage: React.Dispatch<React.SetStateAction<string>>;
}

const AdminSuccessPage: React.FC<Props> = ({ setAdminPage }) => {
  useEffect(() => {
    setTimeout(() => {
      setAdminPage('main');
    }, 3000);
  });

  return (
    <>
      <h1>Success</h1>
      <img className='success-icon' src={checkIcon} alt='success' />
    </>
  );
};

export default AdminSuccessPage;
