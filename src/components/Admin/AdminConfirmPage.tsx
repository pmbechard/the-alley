import React from 'react';
import backIcon from '../../img/back.png';

interface Props {
  msg: string;
  callback: any;
  setAdminPage: React.Dispatch<React.SetStateAction<string>>;
}

const AdminConfirmPage: React.FC<Props> = ({ msg, callback, setAdminPage }) => {
  return (
    <>
      <img
        className='back-btn panel-btn'
        src={backIcon}
        alt='back'
        onClick={() => setAdminPage('main')}
      />
      <h1>Confirm</h1>
      <p>{msg}</p>
      <button onClick={callback}>Confirm</button>
      <button onClick={() => setAdminPage('main')}>Cancel</button>
    </>
  );
};

export default AdminConfirmPage;
