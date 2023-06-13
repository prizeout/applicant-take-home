import React from 'react';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';
import { useAppSelector } from '../../../hooks';
import { selectActiveOffer } from '../../../slices/offers-slice';
import { OfferGiftCard } from '../../../modules/widget/components/offers/offer-gift-card/offer-gift-card';
import { CheckoutSelector } from './checkout-selector';
import './checkout.less';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const offer = useAppSelector(selectActiveOffer);
    console.log(offer);
    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    <section className="checkout__brand">
                        {!offer && <h3>Select Offer</h3>}
                        {offer && <OfferGiftCard offer={offer} onClickHandler={() => null} inCheckout={true} />}
                    </section>
                    <section>{offer && <CheckoutSelector offer={offer} />}</section>
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
