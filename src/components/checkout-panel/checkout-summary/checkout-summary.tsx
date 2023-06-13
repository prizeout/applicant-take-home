import React from 'react';
import { useAppSelector } from '../../../hooks';
import { selectChosenOption } from '../../../slices/offers-slice';
import { convertToUSD } from '../../../utils/conversions/currency';

import './checkout-summary.less';

export const CheckoutSummary: React.FC = (): React.ReactElement => {
    const option = useAppSelector(selectChosenOption);
    const bonus = 0.25;
    const bonusString = `+${bonus * 100}%`;
    const amountInDollars = option?.value_in_cents / 100;
    const bonusAmount = amountInDollars * bonus;
    const total = amountInDollars + bonusAmount;

    return (
        option && (
            <div className="checkout-summary">
                <div className="summary-line">
                    <h5>Redemption Amount </h5>
                    <h5>{convertToUSD(amountInDollars)}</h5>
                </div>
                <div className="summary-line bonus">
                    <h5>Prizeout Bonus ({bonusString})</h5>
                    <h5>{convertToUSD(bonusAmount)}</h5>
                </div>
                <div className="summary-line">
                    <h5>You Get</h5>
                    <h5>{convertToUSD(total)}</h5>
                </div>
            </div>
        )
    );
};
