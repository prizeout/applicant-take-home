import React from 'react';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';

import './checkout.less';

interface CheckoutCostSummaryProps {
    giftcard: PrizeoutOfferValueOptions;
}

const CheckoutCostSummary: React.FC<CheckoutCostSummaryProps> = ({ giftcard }): React.ReactElement => {
    const redemptionAmount = (giftcard.cost_in_cents / 100).toFixed(2);

    function bonuses() {
        let displayPercent = '';
        let bonus = null;
        let finalCost = giftcard.cost_in_cents.toString();
        if (giftcard.display_bonus == null && giftcard.display_monetary_bonus == null) {
            return ['', finalCost];
        }
        if (giftcard.display_bonus == null) {
            bonus = giftcard.display_monetary_bonus;
        } else {
            const bonusPercent = giftcard.display_bonus / 10;
            displayPercent = `(${giftcard.display_bonus}%)`;
            bonus = Math.round(giftcard.cost_in_cents * bonusPercent) / 100;
        }

        finalCost = (giftcard.cost_in_cents / 100 + bonus).toFixed(2);
        const bonusLine = (
            <>
                <label className="bonus-line">{`Prizeout Bonus${displayPercent}`}</label>
                <div className="value bonus-line">${bonus.toFixed(2)}</div>
            </>
        );
        return [bonusLine, finalCost];
    }

    const [bonusLine, finalCost] = bonuses();

    return (
        <section className="checkout-cost-summary">
            <div className="grid">
                <label>Redemption Amount</label>
                <div className="value">${redemptionAmount}</div>
                {bonusLine}
                <label>You Get</label>
                <div className="value">${finalCost}</div>
            </div>
        </section>
    );
};

export default CheckoutCostSummary;
