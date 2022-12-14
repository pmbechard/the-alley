import { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import closeIcon from '../../img/close.png';
import { ModifiedProduct, Product } from '../Interfaces/ProductInterface';
import AdminAddProductsPage from './AdminAddProductsPage';
import AdminConfirmPage from './AdminConfirmPage';
import AdminMainPage from './AdminMainPage';
import AdminModifyProductsPage from './AdminModifyProductsPage';
import AdminModifySale from './AdminModifySale';
import AdminRemoveProductsPage from './AdminRemoveProductsPage';
import AdminScheduleSale from './AdminScheduleSale';
import AdminSuccessPage from './AdminSuccessPage';
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
  deleteProduct: (id: string) => Promise<void>;
  getAdmins: string[];
  addAdmin: (email: string) => Promise<void>;
  removeAdmin: (email: string) => Promise<void>;
  setWarningMsg: React.Dispatch<React.SetStateAction<string>>;
  getUserInfo: User;
}

const AdminPanel: React.FC<Props> = ({
  setShowAdminPanel,
  addProductToFirebase,
  getProducts,
  setProducts,
  getProductByName,
  updateProduct,
  deleteProduct,
  getAdmins,
  addAdmin,
  removeAdmin,
  setWarningMsg,
  getUserInfo,
}) => {
  const [getAdminPage, setAdminPage] = useState<string>('');
  const [confirmMsg, setConfirmMsg] = useState<string>('');
  const [confirmCallback, setConfirmCallback] = useState<() => Promise<void>>(
    () => Promise.resolve()
  );

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
            setConfirmMsg={setConfirmMsg}
            setConfirmCallback={setConfirmCallback}
            setWarningMsg={setWarningMsg}
          />
        )}
        {getAdminPage === 'modifyProducts' && (
          <AdminModifyProductsPage
            setAdminPage={setAdminPage}
            getProducts={getProducts}
            getProductByName={getProductByName}
            updateProduct={updateProduct}
            setConfirmMsg={setConfirmMsg}
            setConfirmCallback={setConfirmCallback}
            setWarningMsg={setWarningMsg}
          />
        )}
        {getAdminPage === 'removeProducts' && (
          <AdminRemoveProductsPage
            setAdminPage={setAdminPage}
            getProducts={getProducts}
            deleteProduct={deleteProduct}
            setConfirmMsg={setConfirmMsg}
            setConfirmCallback={setConfirmCallback}
            setWarningMsg={setWarningMsg}
          />
        )}

        {/* TODO: Add sales functionality */}
        {getAdminPage === 'scheduleSale' && (
          <AdminScheduleSale setAdminPage={setAdminPage} />
        )}
        {getAdminPage === 'modifySale' && (
          <AdminModifySale setAdminPage={setAdminPage} />
        )}

        {getAdminPage === 'userPermissions' && (
          <AdminUserPermissionsPage
            setAdminPage={setAdminPage}
            getAdmins={getAdmins}
            addAdmin={addAdmin}
            removeAdmin={removeAdmin}
            setConfirmMsg={setConfirmMsg}
            setConfirmCallback={setConfirmCallback}
            setWarningMsg={setWarningMsg}
            getUserInfo={getUserInfo}
          />
        )}
        {getAdminPage === 'confirmation' && (
          <AdminConfirmPage
            msg={confirmMsg}
            callback={confirmCallback}
            setAdminPage={setAdminPage}
          />
        )}

        {getAdminPage === 'success' && (
          <AdminSuccessPage setAdminPage={setAdminPage} />
        )}
      </div>
    </>
  );
};

export default AdminPanel;
