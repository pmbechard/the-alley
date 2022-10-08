import React from 'react';
import adminIcon from '../../img/settings.png';

interface Props {
  showAdminPanel: boolean;
  setShowAdminPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminPanelBtn: React.FC<Props> = ({
  showAdminPanel,
  setShowAdminPanel,
}) => {
  return (
    <>
      <img
        id='admin-panel-btn'
        onClick={() => setShowAdminPanel(true)}
        src={adminIcon}
        alt='admin'
      />
    </>
  );
};

export default AdminPanelBtn;
