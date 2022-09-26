import React, { useEffect, useState } from 'react';
import closeIcon from '../../img/close.png';
import { ModifiedProduct, Product } from '../Interfaces/ProductInterface';
import AdminAddProductsPage from './AdminAddProductsPage';
import AdminMainPage from './AdminMainPage';
import AdminModifyProductsPage from './AdminModifyProductsPage';
import AdminModifySale from './AdminModifySale';
import AdminRemoveProductsPage from './AdminRemoveProductsPage';
import AdminScheduleSale from './AdminScheduleSale';
import AdminUserPermissionsPage from './AdminUserPermissionsPage';

interface Props {
  setShowAdminPanel: React.Dispatch<React.SetStateAction<boolean>>;
  addProductToFirebase: (product: Product) => void;
  getProducts: Product[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>;
  getProductByName: (name: string) => Promise<Product | null>;
  updateProduct: (
    modifiedProduct: ModifiedProduct,
    name: string
  ) => Promise<void>;
}

const AdminPanel: React.FC<Props> = ({
  setShowAdminPanel,
  addProductToFirebase,
  getProducts,
  setProducts,
  getProductByName,
  updateProduct,
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
          <AdminModifyProductsPage
            setAdminPage={setAdminPage}
            getProducts={getProducts}
            getProductByName={getProductByName}
            updateProduct={updateProduct}
          />
        )}
        {getAdminPage === 'removeProducts' && (
          <AdminRemoveProductsPage setAdminPage={setAdminPage} />
        )}

        {getAdminPage === 'scheduleSale' && (
          <AdminScheduleSale setAdminPage={setAdminPage} />
        )}
        {getAdminPage === 'modifySale' && (
          <AdminModifySale setAdminPage={setAdminPage} />
        )}

        {getAdminPage === 'userPermissions' && (
          <AdminUserPermissionsPage setAdminPage={setAdminPage} />
        )}
      </div>
    </>
  );
};

export default AdminPanel;
