import React from 'react';
import '../../styles/modal/Modal.scss';

const Modal = ({handleClose, show, children}) => {
    const isShowClassName = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={isShowClassName}>
            <div className='modal-main'>
                {handleClose && <button onClick={handleClose}>x</button>}
                {children}
            </div>
        </div>
    )
}

export default Modal;