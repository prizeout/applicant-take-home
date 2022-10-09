import React from 'react';
import { useAppSelector } from '../../../hooks';
import { getCurrentGiftCardIndex, PrizeoutOfferValueOptions } from '../../../slices/offers-slice';
import CheckoutOptionButton from './checkout-option-button';

import './checkout.less';

interface CheckoutOptionsButtonsProps {
    giftcardList: PrizeoutOfferValueOptions[];
    onNewGiftCard: (newIndex: number) => void;
}

const CheckoutOptionsButtons: React.FC<CheckoutOptionsButtonsProps> = ({
    giftcardList,
    onNewGiftCard,
}): React.ReactElement => {
    const giftCardIndex = useAppSelector(getCurrentGiftCardIndex);

    const returnOptions = () => {
        return giftcardList.map((giftcard, index) => (
            <CheckoutOptionButton
                key={`checkout-options-${giftcard.checkout_value_id}`}
                giftcard={giftcard}
                onClick={() => onNewGiftCard(index)}
                isChecked={index === giftCardIndex}
            />
        ));
    };

    return (
        <section className="checkout-options-buttons">
            <div className="grid">{returnOptions()}</div>
        </section>
    );
};

export default CheckoutOptionsButtons;
