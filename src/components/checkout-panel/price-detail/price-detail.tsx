import React from 'react';

/* Slices */
import {
    selectGiftCardCost,
    selectGiftCardDisplayBonus,
    selectGiftCardPrizoutBonus,
    selectGiftCardValue,
    selectSelectedGiftCard,
} from '../../../slices/checkout-slice';

/* Styles */
import './price-detail.less';

/* Utilities */
import { useAppSelector } from '../../../hooks';

const PriceDetail: React.FC = (): React.ReactElement => {
    const giftCardCost = useAppSelector(selectGiftCardCost);
    const giftCardDisplayBonus = useAppSelector(selectGiftCardDisplayBonus);
    const giftCardPrizoutBonus = useAppSelector(selectGiftCardPrizoutBonus);
    const giftCardValue = useAppSelector(selectGiftCardValue);
    const selectedGiftCard = useAppSelector(selectSelectedGiftCard);

    if (!selectedGiftCard) {
        return null;
    }

    return (
        <div className="price-detail" data-testid="price-detail">
            <div className="row">
                <h4>Redemption Amount</h4>
                <h4>{giftCardCost}</h4>
            </div>
            <div className="row blue-letters">
                <h4>Prizeout Bonus (+{giftCardDisplayBonus}%)</h4>
                <h4>{giftCardPrizoutBonus}</h4>
            </div>
            <div className="row">
                <h4>You Get</h4>
                <h4>{giftCardValue}</h4>
            </div>
        </div>
    );
};

export default PriceDetail;
