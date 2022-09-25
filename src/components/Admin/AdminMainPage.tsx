import React from 'react';

interface Props {
  setAdminPage: React.Dispatch<React.SetStateAction<string>>;
}

const AdminMainPage: React.FC<Props> = ({ setAdminPage }) => {
  return (
    <>
      <h1>Admin Panel</h1>
      <h2>Manage Products</h2>
      <button onClick={() => setAdminPage('addProducts')}>Add Products</button>
      <button onClick={() => setAdminPage('modifyProducts')}>
        Modify Products
      </button>
      <button onClick={() => setAdminPage('removeProducts')}>
        Remove Products
      </button>
      <h2>Manage Users</h2>
      <button onClick={() => setAdminPage('userPermissions')}>
        Modify User Permissions
      </button>
    </>
  );
};

export default AdminMainPage;
