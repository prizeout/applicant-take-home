import React, { useState } from 'react';
import { Button } from '../../common';
import { useDispatch } from 'react-redux';
import { requestCheckout } from '../../../slices/checkout-slice';
import { showModal } from '../../../slices/modal-slice';
import { AppDispatch } from '../../../store';

const CheckoutButton: React.FC = (): React.ReactElement => {
    const [buttonStatus, setButtonStatus] = useState<'disabled' | 'enabled' | 'loading'>('enabled');
    const dispatch = useDispatch<AppDispatch>();
    const buttonText = 'Prizeout Gift Card';

    const buttonHandler = async () => {
        setButtonStatus('loading');
        await dispatch(requestCheckout());
        dispatch(showModal());
        setButtonStatus('enabled');
    };

    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`primary`}
                isDisabled={buttonStatus === 'disabled'}
                isLoading={buttonStatus === 'loading'}
                onClick={buttonHandler}
                size="medium"
                text={buttonText}
                type="submit"
            />
        </>
    );
};

export default CheckoutButton;
