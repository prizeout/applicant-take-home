import React from 'react';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';
import { selectOffer } from '../../../slices/common-slice';
import { useAppSelector } from '../../../hooks';
import { Button } from '../../common';
import './checkout.less';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';
import { setcheckoutValueOffer, selectCheckoutValueOffer } from '../../../slices/checkout-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const selectedOffer = useAppSelector(selectOffer);
    const selectedCheckoutOffer = useAppSelector(selectCheckoutValueOffer);
    const dispatch = useDispatch<AppDispatch>();
    const setCheckoutOfferDetails = (offer: PrizeoutOfferValueOptions) => {
        dispatch(setcheckoutValueOffer(offer));
    };

    const giftCards: PrizeoutOfferValueOptions[] | null = selectedOffer?.giftcard_list;

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    <section className="checkout__brand"></section>
                    {selectedOffer && (
                        <div className="giftcard-info">
                            <img
                                src={selectedOffer?.image_url}
                                width="100%"
                                height="10%"
                                alt={selectedOffer?.name + ' giftcard image'}
                            ></img>
                            <h3>{selectedOffer?.name}</h3>
                            <div className="costOptionButtons"></div>
                            <div className="giftCard-button-wrapper">
                                {giftCards &&
                                    giftCards.map((giftCard) => (
                                        <Button
                                            key={giftCard.checkout_value_id + 'key'}
                                            ariaLabel="giftcard-checkout-value-button"
                                            color={`primary`}
                                            size="small"
                                            onClick={async () => {
                                                setCheckoutOfferDetails(giftCard);
                                            }}
                                            text={(giftCard.cost_in_cents / 100).toLocaleString('en-US', {
                                                currency: 'USD',
                                                style: 'currency',
                                            })}
                                            type="submit"
                                        />
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="grid__item">
                    {selectedCheckoutOffer && (
                        <div className="checkout_paper">
                            <div className="checkout_line_item">
                                <h3>Redemption Amount</h3>
                                <h3>
                                    {(selectedCheckoutOffer.cost_in_cents / 100).toLocaleString('en-US', {
                                        currency: 'USD',
                                        style: 'currency',
                                    })}
                                </h3>
                            </div>
                            <div className="checkout_line_item prizeout_line_item">
                                <h3>Prizeout Bonus({selectedCheckoutOffer.display_bonus}%)</h3>
                                <h3>
                                    {(
                                        (selectedCheckoutOffer.value_in_cents - selectedCheckoutOffer.cost_in_cents) /
                                        100
                                    ).toLocaleString('en-US', {
                                        currency: 'USD',
                                        style: 'currency',
                                    })}
                                </h3>
                            </div>
                            <div className="checkout_line_item">
                                <h3>You Get</h3>
                                <h3>
                                    {(selectedCheckoutOffer.value_in_cents / 100).toLocaleString('en-US', {
                                        currency: 'USD',
                                        style: 'currency',
                                    })}
                                </h3>
                            </div>
                        </div>
                    )}
                    <section className="checkout__calculation">
                        <CheckoutButton />
                    </section>
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
