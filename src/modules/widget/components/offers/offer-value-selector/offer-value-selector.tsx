import React from 'react';
import { PrizeoutOffer } from '../../../../../slices/offers-slice';

interface OfferValueSelectorProps {
    offer: PrizeoutOffer;
}

export const OfferValueSelector: React.FC<OfferValueSelectorProps> = ({ offer }): React.ReactElement => {
    const returnOfferValue = () => {
        return offer.giftcard_list.map((giftCard) => {
            return (
                <option key={giftCard.checkout_value_id} value={giftCard.cost_in_cents}>
                    {giftCard.cost_in_cents}
                </option>
            );
        });
    };

    return (
        <form>
            <select id="pet-select">
                <option value="">--Please choose an option--</option>
                {returnOfferValue()}
            </select>
        </form>
    );
};
