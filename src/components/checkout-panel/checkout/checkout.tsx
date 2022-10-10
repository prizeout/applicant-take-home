import React from 'react';
import { useAppSelector } from '../../../hooks';
import { getActiveOffer } from '../../../slices/offers-slice';
import { GiftCard } from '../../common';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';
import CheckoutOptions from './checkout-options';

import './checkout.less';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const activeOffer = useAppSelector(getActiveOffer);

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    <section className="checkout__brand">
                        {activeOffer ? (
                            <div className="grid grid--top-bottom grid-stretch-top">
                                <div className="grid__item">
                                    <GiftCard
                                        name={activeOffer.name}
                                        imgUrl={activeOffer.image_url}
                                        altText={activeOffer.name}
                                        className="offer"
                                    />
                                </div>
                                <div className="grid__item">
                                    <CheckoutOptions offer={activeOffer} />
                                </div>
                            </div>
                        ) : null}
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
