import React, { useEffect, useState } from 'react';
import closeIcon from '../../img/close.png';
import AdminAddProductsPage from './AdminAddProductsPage';
import AdminMainPage from './AdminMainPage';
import AdminModifyProductsPage from './AdminModifyProductsPage';
import AdminRemoveProductsPage from './AdminRemoveProductsPage';
import AdminUserPermissionsPage from './AdminUserPermissionsPage';

interface Props {
  setShowAdminPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminPanel: React.FC<Props> = ({ setShowAdminPanel }) => {
  const [getAdminPage, setAdminPage] = useState<string>('');

  useEffect(() => {
    setAdminPage('main');
  }, []);

  return (
    <>
      <div
        className='admin-panel-backdrop'
        onClick={() => setShowAdminPanel(false)}
      ></div>
      <div className='admin-panel'>
        <img
          onClick={() => setShowAdminPanel(false)}
          className='panel-btn'
          src={closeIcon}
          alt='exit'
        />
        {getAdminPage === 'main' && (
          <AdminMainPage setAdminPage={setAdminPage} />
        )}
        {getAdminPage === 'addProducts' && (
          <AdminAddProductsPage setAdminPage={setAdminPage} />
        )}
        {getAdminPage === 'modifyProducts' && (
          <AdminModifyProductsPage setAdminPage={setAdminPage} />
        )}
        {getAdminPage === 'removeProducts' && (
          <AdminRemoveProductsPage setAdminPage={setAdminPage} />
        )}
        {getAdminPage === 'userPermissions' && (
          <AdminUserPermissionsPage setAdminPage={setAdminPage} />
        )}
      </div>
    </>
  );
};

export default AdminPanel;
