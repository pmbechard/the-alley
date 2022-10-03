import { User } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import backIcon from '../../img/back.png';

interface Props {
  setAdminPage: React.Dispatch<React.SetStateAction<string>>;
  getAdmins: string[];
  addAdmin: (email: string) => Promise<void>;
  removeAdmin: (email: string) => Promise<void>;
  setConfirmMsg: React.Dispatch<React.SetStateAction<string>>;
  setConfirmCallback: React.Dispatch<() => Promise<void>>;
  setWarningMsg: React.Dispatch<React.SetStateAction<string>>;
  getUserInfo: User;
}

const AdminUserPermissionsPage: React.FC<Props> = ({
  setAdminPage,
  getAdmins,
  addAdmin,
  removeAdmin,
  setConfirmMsg,
  setConfirmCallback,
  setWarningMsg,
  getUserInfo,
}) => {
  const [userAction, setUserAction] = useState<number>(0);
  const addEmailRef = useRef<HTMLInputElement>(null);
  const removeEmailRef = useRef<HTMLSelectElement>(null);

  return (
    <>
      <img
        className='back-btn panel-btn'
        src={backIcon}
        alt='back'
        onClick={() => setAdminPage('main')}
      />
      <h1>User Permissions</h1>
      {userAction === 0 && (
        <>
          <button onClick={() => setUserAction(1)}>Add Admin</button>{' '}
          <button onClick={() => setUserAction(2)}>Remove Admin</button>
        </>
      )}
      {userAction === 1 && (
        <>
          <form className='admin-panel-form'>
            <input type='text' placeholder='Email' ref={addEmailRef} />
          </form>
          <button
            onClick={() => {
              if (!addEmailRef.current?.value) {
                setWarningMsg('Enter a valid email address to continue.');
              } else {
                setConfirmMsg(
                  `Are you sure you want to add ${addEmailRef.current?.value} as a site administrator?`
                );
                setConfirmCallback(async function () {
                  await addAdmin(`${addEmailRef.current?.value}`);
                  setUserAction(0);
                });
                setAdminPage('confirmation');
              }
            }}
          >
            Add Admin
          </button>
          <button onClick={() => setUserAction(0)}>Back</button>
        </>
      )}
      {userAction === 2 && (
        <>
          <form className='admin-panel-form'>
            <select
              ref={removeEmailRef}
              defaultValue='Choose an admin to remove:'
            >
              {getAdmins.map((admin) => {
                return (
                  <option value={admin} key={admin}>
                    {admin}
                  </option>
                );
              })}
            </select>
          </form>
          <button
            onClick={() => {
              if (removeEmailRef.current?.value === getUserInfo.email) {
                setWarningMsg('Cannot remove privileges while logged in.');
              } else {
                setConfirmMsg(
                  `Are you sure you want to remove ${removeEmailRef.current?.value} as a site administrator?`
                );
                setConfirmCallback(async function () {
                  await removeAdmin(`${removeEmailRef.current?.value}`);
                  setUserAction(0);
                });
                setAdminPage('confirmation');
              }
            }}
          >
            Remove Admin
          </button>
          <button onClick={() => setUserAction(0)}>Back</button>
        </>
      )}
    </>
  );
};

export default AdminUserPermissionsPage;
