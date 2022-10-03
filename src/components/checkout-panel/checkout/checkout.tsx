import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Classnames from 'classnames';
import { PrizeoutOffer } from '../../../slices/offers-slice';
import checkoutPanelViewWrapper from '../view-wrapper';
import { currencyFormatter } from '../../common';

import CheckoutButton from './checkout-button';

import './checkout.less';

interface CheckoutPanelProps {
    giftCard: PrizeoutOffer;
}

export interface FormProps {
    option: string;
}

// TODO: display gift card offers
// TODO: include value selection
const CheckoutPanelView: React.FC<CheckoutPanelProps> = ({ giftCard }): React.ReactElement => {
    const { name, currency_code, giftcard_list } = giftCard;

    const [selectedOption, setSelectedOption] = useState<string>('');

    const { register, handleSubmit } = useForm();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };
    const onSubmit = (data: FormProps) => console.log(data);

    const returnOptions = () => {
        return giftcard_list.map((item) => {
            const { checkout_value_id, cost_in_cents, value_in_cents } = item;
            const isSelected = selectedOption === checkout_value_id;
            const classes: string = Classnames('offer', {
                'selected-offer': isSelected,
            });

            return (
                <label key={checkout_value_id} className={classes}>
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
                    <div>
                        <div>{`Cost: ${currencyFormatter(currency_code, cost_in_cents)}`}</div>
                        <div>{`Value: ${currencyFormatter(currency_code, value_in_cents)}`}</div>
                    </div>
                </label>
            );
        });
    };

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid__item no-scrollbars">
                        <h2 className="checkout__brand">{name}</h2>
                        {returnOptions()}
                    </div>
                    <div className="grid__item">
                        <section className="checkout__calculation">
                            <CheckoutButton selected={selectedOption} />
                        </section>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
