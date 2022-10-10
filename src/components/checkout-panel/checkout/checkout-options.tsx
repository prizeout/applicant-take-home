import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks';
import { getCurrentGiftCardIndex, PrizeoutOffer, setGiftCardIndex } from '../../../slices/offers-slice';
import { AppDispatch } from '../../../store';
import CheckoutCostSummary from './checkout-cost-summary';
import CheckoutOptionsButtons from './checkout-options-buttons';

import './checkout.less';

interface CheckoutOptions {
    offer: PrizeoutOffer;
}

const CheckoutOptions: React.FC<CheckoutOptions> = ({ offer }): React.ReactElement => {
    const giftCardIndex = useAppSelector(getCurrentGiftCardIndex);
    const dispatch = useDispatch<AppDispatch>();

    const newGiftCardIndex = (newIndex: number) => {
        dispatch(setGiftCardIndex(newIndex));
    };

    return (
        <section className="checkout-options">
            <div className="grid grid--top-bottom grid-stretch-top">
                <div className="grid__item">
                    <header>Select Redemption Amount</header>
                </div>
                <div className="grid__item">
                    <section className="options-list">
                        <CheckoutOptionsButtons giftcardList={offer.giftcard_list} onNewGiftCard={newGiftCardIndex} />
                    </section>
                </div>
                <div className="grid__item">
                    <CheckoutCostSummary giftcard={offer.giftcard_list[giftCardIndex]} />
                </div>
            </div>
        </section>
    );
};

export default CheckoutOptions;
