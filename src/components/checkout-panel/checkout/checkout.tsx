import React, { useState } from 'react';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';
import { GiftCardImage } from '../../common/ui-widgets/gift-card-image';

import './checkout.less';

interface checkoutView {
    selectedGiftCard?: any;
}

const formatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
});

const CheckoutPanelView: React.FC<checkoutView> = ({ selectedGiftCard }): React.ReactElement => {
    const [selectedButton, setSelectedButton] = useState<number | null>(null);
    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    <section className="checkout__brand">Giftcard Checkout</section>
                    <div className="gift-card-checkout">
                        <GiftCardImage imgUrl={selectedGiftCard.image_url} altText="dynamic" />
                        <div className="gift-card__row">
                            <p className="gift-card__name">
                                <strong>{selectedGiftCard.name}</strong>
                            </p>
                        </div>
                        <div className="gift-card-values">
                            {selectedGiftCard.giftcard_list
                                ? selectedGiftCard.giftcard_list.map((values: any, index: number) => {
                                      return (
                                          <button className= { index === selectedButton ? "gift-card-value active" : "gift-card-value"} 
                                                key={index}
                                                onClick={() => setSelectedButton(index)}>
                                              {formatter.format(values['cost_in_cents'] / 100)}
                                          </button>
                                      );
                                  })
                                : ''}
                        </div>
                    </div>
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
