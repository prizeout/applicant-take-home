import React from 'react';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';
import { GiftCardImage } from '../../common/ui-widgets/gift-card-image';

import './checkout.less';

interface checkoutView {
    selectedGiftCard?: any;
}

const CheckoutPanelView: React.FC<checkoutView> = ({ selectedGiftCard }): React.ReactElement => {
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
                                          <button className="gift-card-value" key={index}>
                                              {' '}
                                              {values['cost_in_cents']}{' '}
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
