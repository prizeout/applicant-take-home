import React from 'react';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';

import './checkout-redemption.less';

interface CheckoutRedemptionProps {
    selectedValue?: PrizeoutOfferValueOptions;
}

const formatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
});

export const CheckoutRedemption: React.FC<CheckoutRedemptionProps> = ({ selectedValue }): React.ReactElement => {
    if (selectedValue) {
        return (
            <div className="gift-card-redemption-container">
                <div className="row">
                    <div className="label">Redemption Amount</div>
                    <div className="amount">{formatter.format(selectedValue.cost_in_cents / 100)}</div>
                </div>
                <div className="row">
                    <div className="prizeout-bonus-label">
                        Prizeout Bonus {'(+' + selectedValue.display_bonus + '%)'}
                    </div>
                    <div className="prizeout-bonus-value">
                        {formatter.format((selectedValue.cost_in_cents * selectedValue.display_bonus) / 10000)}
                    </div>
                </div>
                <div className="row">
                    <div className="label">You Get</div>
                    <div className="total">{formatter.format(selectedValue.value_in_cents / 100)}</div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};
