import React, { useEffect } from 'react';
import warningIcon from '../img/warning.png';
import closeIcon from '../img/close.png';

interface Props {
  msg: string;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
}

const WarningModal: React.FC<Props> = ({ msg, setMsg }) => {
  useEffect(() => {
    setTimeout(() => {
      setMsg('');
    }, 8000);
  });

  return (
    <div className='warning-modal'>
      <div className='warning-header'>
        <img src={warningIcon} alt='Error' className='warning-img' />
        <h3>Woah, hold on there...</h3>
      </div>
      <p>{msg}</p>
      <img
        className='close-warning-btn'
        src={closeIcon}
        alt='close'
        onClick={() => {
          setMsg('');
        }}
      />
    </div>
  );
};

export default WarningModal;
