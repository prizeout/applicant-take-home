import React from 'react';

/* HOC */
import checkoutPanelViewWrapper from '../view-wrapper';

/* Slices */
import { selectActiveOffer } from '../../../slices/offers-slice';

/* Styles */
import './checkout.less';

/* UI Components */
import CheckoutButton from './checkout-button';
import { GiftCard } from '../../common';
import PriceDetail from './price-detail';
import PriceOptionGrid from './price-option-grid';

/* Utitlities */
import { useAppSelector } from '../../../hooks';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const activeOffer = useAppSelector(selectActiveOffer);
    if (!activeOffer) {
        return (
            <section className="checkout">
                <h3>Please Select a Gift Card</h3>
            </section>
        );
    }

    const { image_url, name } = activeOffer;

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item column-gap">
                    <h3>{name}</h3>
                    <GiftCard altText={name} imgUrl={image_url} />
                    <PriceOptionGrid />
                    <PriceDetail />
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
