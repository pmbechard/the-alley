import React, { useRef, useState } from 'react';
import backIcon from '../../img/back.png';

interface Props {
  setAdminPage: React.Dispatch<React.SetStateAction<string>>;
  getAdmins: string[];
  addAdmin: (email: string) => Promise<void>;
  removeAdmin: (email: string) => Promise<void>;
}

const AdminUserPermissionsPage: React.FC<Props> = ({
  setAdminPage,
  getAdmins,
  addAdmin,
  removeAdmin,
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
          <input type='text' placeholder='Email' ref={addEmailRef} />
          <button
            onClick={() => {
              addAdmin(`${addEmailRef.current?.value}`);
              setUserAction(0);
            }}
          >
            Add Admin
          </button>
          <button onClick={() => setUserAction(0)}>Back</button>
        </>
      )}
      {userAction === 2 && (
        <>
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
          <button
            onClick={() => {
              removeAdmin(removeEmailRef.current?.value || '');
              setUserAction(0);
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
