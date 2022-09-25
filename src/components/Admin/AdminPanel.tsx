import React, { useEffect, useState } from 'react';
import closeIcon from '../../img/close.png';
import { Product } from '../Interfaces/ProductInterface';
import AdminAddProductsPage from './AdminAddProductsPage';
import AdminMainPage from './AdminMainPage';
import AdminModifyProductsPage from './AdminModifyProductsPage';
import AdminRemoveProductsPage from './AdminRemoveProductsPage';
import AdminUserPermissionsPage from './AdminUserPermissionsPage';

interface Props {
  setShowAdminPanel: React.Dispatch<React.SetStateAction<boolean>>;
  addProductToFirebase: (product: Product) => void;
  getProducts: Product[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>;
}

const AdminPanel: React.FC<Props> = ({
  setShowAdminPanel,
  addProductToFirebase,
  getProducts,
  setProducts,
}) => {
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
          <AdminAddProductsPage
            setAdminPage={setAdminPage}
            addProductToFirebase={addProductToFirebase}
            getProducts={getProducts}
          />
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
