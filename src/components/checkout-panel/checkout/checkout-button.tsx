// import React, { useState } from 'react';
import React from 'react';
import { Button } from '../../common';

import './checkout-button.less';

interface CheckoutButtonProps {
    selected: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ selected }): React.ReactElement => {
    const buttonText = 'Prizeout Gift Card';
    const isDisabled = selected === '';

    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`confirm`}
                size="medium"
                text={buttonText}
                type="submit"
                isDisabled={isDisabled}
            />
        </>
    );
};

export default CheckoutButton;
