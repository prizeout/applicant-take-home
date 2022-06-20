import React from 'react';
import { useAppSelector } from '../../../hooks';
import { OfferGiftCard } from '../../../modules/widget/components/offers/offer-gift-card/offer-gift-card';
import { OfferValueSelector } from '../../../modules/widget/components/offers/offer-value-selector/offer-value-selector';
import { selectCart } from '../../../slices/checkout-slice';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';

import './checkout.less';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const cart = useAppSelector(selectCart);

    const returnCartContent = () => {
        return cart.map((offer) => {
            return offer ? (
                <React.Fragment key={`${offer.name}`}>
                    <OfferGiftCard offer={offer} />
                    <OfferValueSelector key={`${offer.name}`} offer={offer} />
                </React.Fragment>
            ) : (
                <></>
            );
        });
    };

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item no-scrollbars">
                    <section className="checkout__brand">{returnCartContent()}</section>
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
