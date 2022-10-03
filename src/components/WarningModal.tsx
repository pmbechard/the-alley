import React, { useEffect, useRef } from 'react';
import warningIcon from '../img/warning.png';
import closeIcon from '../img/close.png';

interface Props {
  msg: string;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
}

const WarningModal: React.FC<Props> = ({ msg, setMsg }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!modalRef) return;
    let modalStyle = modalRef.current?.style.display;
    modalStyle = 'block';

    setTimeout(() => {
      modalStyle = 'none';
      setMsg('');
    }, 5000);
  });

  return (
    <div className='warning-modal' ref={modalRef}>
      <div className='warning-header'>
        <img src={warningIcon} alt='Error' />
        <h3>Woah, hold on there...</h3>
      </div>
      <p>{msg}</p>
      <img src={closeIcon} alt='close' />
    </div>
  );
};

export default WarningModal;
