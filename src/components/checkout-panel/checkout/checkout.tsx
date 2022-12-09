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

/* Utitlities */
import { useAppSelector } from '../../../hooks';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const activeOffer = useAppSelector(selectActiveOffer);
    const { image_url, name } = activeOffer || {};
    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    <section className="checkout__brand">Display Gift Card Here</section>
                    <GiftCard altText={name} imgUrl={image_url} name={name} />
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
