import React from 'react';
import backIcon from '../../img/back.png';

interface Props {
  msg: string;
  callback: () => Promise<void>;
  setAdminPage: React.Dispatch<React.SetStateAction<string>>;
}

const AdminConfirmPage: React.FC<Props> = ({ msg, callback, setAdminPage }) => {
  const runCallback = async () => {
    (async () => {
      return await callback;
    })();
    setAdminPage('success');
  };

  return (
    <>
      <img
        className='back-btn panel-btn'
        src={backIcon}
        alt='back'
        onClick={() => setAdminPage('main')}
      />
      <h1>Confirm</h1>
      <p className='admin-confirm-msg'>{msg}</p>
      <button onClick={runCallback}>Confirm</button>
      <button onClick={() => setAdminPage('main')}>Cancel</button>
    </>
  );
};

export default AdminConfirmPage;
