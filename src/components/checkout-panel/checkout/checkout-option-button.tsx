import React from 'react';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';

import './checkout.less';

interface CheckoutOptionsButtonsProps {
    giftcard: PrizeoutOfferValueOptions;
    isChecked: boolean;
    onClick: () => void;
}

const CheckoutOptionButton: React.FC<CheckoutOptionsButtonsProps> = ({
    giftcard,
    onClick,
    isChecked,
}): React.ReactElement => {
    const buttonId = `checkout-option-button-${giftcard.checkout_value_id}`;
    const displayAmount = '$' + (giftcard.cost_in_cents / 100).toFixed(2);
    return (
        <div className="grid__item">
            <div className="checkout-radio">
                <input
                    type="radio"
                    name="giftcard-option"
                    value={giftcard.cost_in_cents}
                    id={buttonId}
                    defaultChecked={isChecked}
                />
                <label htmlFor={buttonId} onClick={onClick}>
                    {displayAmount}
                </label>
            </div>
        </div>
    );
};

export default CheckoutOptionButton;
