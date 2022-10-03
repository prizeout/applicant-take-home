// import React, { useState } from 'react';
import React from 'react';
import { Button } from '../../common';
import { FormProps } from './checkout';

import './checkout-button.less';

interface CheckoutButtonProps {
    selected: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ selected }): React.ReactElement => {
    const buttonText = 'Prizeout Gift Card';
    const isDisabled = selected === '';
    // TODO: update buttonHandler
    const buttonHandler = () => {
        console.log('buttonHandler');
        console.log(selected);
        // onSubmit(event);
    };

    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`confirm`}
                onClick={buttonHandler}
                size="medium"
                text={buttonText}
                type="submit"
                isDisabled={isDisabled}
            />
        </>
    );
};

export default CheckoutButton;
