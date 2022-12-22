import React from 'react';
import { useAppSelector } from '../../../hooks';
import { selectSelectedOffer } from '../../../slices/offers-slice';
import { GiftCard } from '../../common';
import ValueSelector from '../value-selector/value-selector';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';

import './checkout.less';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const activeOffer = useAppSelector(selectSelectedOffer);

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    <section className="checkout__brand">
                        {activeOffer && (
                            <GiftCard
                                name={activeOffer.name}
                                imgUrl={activeOffer.image_url}
                                altText={activeOffer.name}
                                className="offer"
                            />
                        )}
                    </section>
                </div>
                <div className="grid__item">
                    <section className="checkout__value">
                        <ValueSelector />
                    </section>
                </div>
                <div className="grid__item">
                    <section className="checkout__calculation">
                        <CheckoutButton />
                    </section>
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
