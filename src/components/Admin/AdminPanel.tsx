import React from 'react';
import closeIcon from '../../img/close.png';

interface Props {
  setShowAdminPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminPanel: React.FC<Props> = ({ setShowAdminPanel }) => {
  return (
    <>
      <div
        className='admin-panel-backdrop'
        onClick={() => setShowAdminPanel(false)}
      ></div>
      <div className='admin-panel'>
        <img
          onClick={() => setShowAdminPanel(false)}
          className='close-panel-btn'
          src={closeIcon}
          alt='exit'
        />
        <h1>Admin Panel</h1>
        <h2>Manage Products</h2>
        <button>Add Products</button>
        <button>Modify Products</button>
        <button>Remove Products</button>
        <h2>Manage Users</h2>
        <button>Modify User Permissions</button>
      </div>
    </>
  );
};

export default AdminPanel;
