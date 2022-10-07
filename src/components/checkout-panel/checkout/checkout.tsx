import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Classnames from 'classnames';
import { PrizeoutOffer, PrizeoutOfferValueOptions } from '../../../slices/offers-slice';
import checkoutPanelViewWrapper from '../view-wrapper';
import { currencyFormatter, fetchData, PurchaseData } from '../../common';

import CheckoutButton from './checkout-button';

import './checkout.less';

interface CheckoutPanelProps {
    giftCard: PrizeoutOffer;
}

export interface FormProps {
    option: string;
}

const CheckoutPanelView: React.FC<CheckoutPanelProps> = ({ giftCard }): React.ReactElement => {
    const { name, currency_code, giftcard_list } = giftCard;

    const [selectedOption, setSelectedOption] = useState<string>('');
    const [selectedGiftCard, setSelectedGiftCard] = useState<PrizeoutOfferValueOptions>();
    const [purchaseData, setPurchaseData] = useState<PurchaseData>();

    const { register, handleSubmit } = useForm();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        setSelectedGiftCard(giftcard_list.find((item) => item.checkout_value_id == event.target.value));
    };

    const onSubmit = (data: FormProps) => {
        setPurchaseData(fetchData(name, selectedGiftCard));
    };

    const getCalculations = () => {
        const { cost_in_cents, value_in_cents, display_bonus, display_monetary_bonus } = selectedGiftCard;
        let percent = display_bonus.toString();
        if (!display_bonus) {
            percent = ((value_in_cents / cost_in_cents) * 100 - 100).toFixed(2);
        }
        let bonus = display_monetary_bonus;
        if (!display_monetary_bonus) {
            bonus = value_in_cents - cost_in_cents;
        }

        return {
            bonusMoney: currencyFormatter(currency_code, bonus),
            bonusPercent: `(+${percent}%)`,
            redemption: currencyFormatter(currency_code, cost_in_cents),
            value: currencyFormatter(currency_code, value_in_cents),
        };
    };

    const returnCalculations = () => {
        const { redemption, bonusPercent, bonusMoney, value } = getCalculations();
        return (
            <div className="calculation">
                <p>
                    <span>Redemption Amount</span>
                    <span>{redemption}</span>
                </p>
                <p className="blue">
                    <span>Prizeout Bonus {bonusPercent}</span>
                    <span>{bonusMoney}</span>
                </p>
                <p>
                    <span>You Get</span>
                    <span>{value}</span>
                </p>
            </div>
        );
    };

    const returnOptions = () => {
        return giftcard_list.map((item) => {
            const { checkout_value_id, cost_in_cents } = item;
            const isSelected = selectedOption === checkout_value_id;
            const classes: string = Classnames('offer', {
                'selected-offer': isSelected,
            });

            return (
                <label key={checkout_value_id} className={`form-button ${classes}`}>
                    <input
                        {...register('option')}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        type="radio"
                        value={checkout_value_id}
                        id={checkout_value_id}
                        checked={isSelected}
                    />
                    <div>{currencyFormatter(currency_code, cost_in_cents)}</div>
                </label>
            );
        });
    };

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid__item no-scrollbars">
                        <h3 className="checkout__brand">
                            {name} <br />
                            <br />
                            Select Redemption Amount
                        </h3>
                        <div className="flex-form">{returnOptions()}</div>
                    </div>
                    <div className="grid__item">
                        <section className="checkout__calculation">
                            {selectedOption.length !== 0 && returnCalculations()}
                            {!purchaseData && <CheckoutButton selected={selectedOption} />}
                            {purchaseData && (
                                <>
                                    {purchaseData.status == '200' && (
                                        <div className="status-200">
                                            Success! Please check your email for your receipt.
                                        </div>
                                    )}
                                    {purchaseData.status == '400' && (
                                        <div className="status-400">
                                            Something went wrong... Please try again later.
                                        </div>
                                    )}
                                </>
                            )}
                        </section>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
