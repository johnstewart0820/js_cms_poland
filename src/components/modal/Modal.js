import React from 'react';
import '../../styles/modal/Modal.scss';

const Modal = ({handleClose, show, children, extraClasses}) => {
    const isShowClassName = show ? 'modal display-block' : 'modal display-none';
    return (
        <div className={isShowClassName}>
            <div className={`modal-main ${extraClasses}`}>
                {handleClose &&
                <button onClick={handleClose} >X</button>}
                {children}
            </div>
        </div>
    )
}

export default Modal;