import React, { useState } from 'react';
import './modal.less';
import { Button } from '../form-components';

interface ModalProps {
    onOk?: () => void;
    title: string;
}

const Modal: React.FC<ModalProps> = ({ children, onOk, title }): React.ReactElement => {
    const [isHidden, setIsHidden] = useState(false);

    const handleOkClick = () => {
        setIsHidden(true);
        if (onOk) {
            onOk();
        }
    };

    if (isHidden) {
        return null;
    }

    return (
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
    );
};

export default Modal;
