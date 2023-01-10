import React from 'react';
import './modal.less';
import { Button } from '../form-components';
import { hideModal, selectIsHidden } from '../../../slices/modal-slice';
import { useAppSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

interface ModalProps {
    onOk?: () => void;
    title: string;
}

const Modal: React.FC<ModalProps> = ({ children, onOk, title }): React.ReactElement => {
    const dispatch = useDispatch<AppDispatch>();
    const isHidden = useAppSelector(selectIsHidden);

    const handleOkClick = () => {
        dispatch(hideModal());
        if (onOk) {
            onOk();
        }
    };

    if (isHidden) {
        return null;
    }

    return (
        <div className="modal-wrapper z-index-modal" onClick={handleOkClick}>
            <div className="modal">
                <div className="modal__inner">
                    <div className="modal__content">
                        <h2>{title}</h2>
                        {children}
                    </div>
                    <div className="modal__buttons">
                        <div className="button">
                            <Button
                                ariaLabel="okay"
                                color="primary"
                                onClick={handleOkClick}
                                size="medium"
                                text="Okay"
                                type="submit"
                            ></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
