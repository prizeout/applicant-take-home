import React from 'react';
import './checkout-selector.less';
import { PrizeoutOffer, setSelectedOption } from '../../../slices/offers-slice';
import { ValueOption } from '../value-options/value-option';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

interface CheckoutSelectorProps {
    offer: PrizeoutOffer;
}

export const CheckoutSelector: React.FC<CheckoutSelectorProps> = ({ offer }): React.ReactElement => {
    const dispatch = useDispatch<AppDispatch>();

    const optionClickHandler = (option: any) => {
        console.log(option);
        dispatch(setSelectedOption(option));
    };

    const valueOptions = () => {
        return offer.giftcard_list.map((option) => (
            <ValueOption
                key={`available-option-${option.checkout_value_id}`}
                option={option}
                onClickHandler={() => optionClickHandler(option)}
            />
        ));
    };

    return (
        <section className="checkout-selector">
            <h5>Select Redemption Amount</h5>
            <div className="checkout-selector__options">{valueOptions()}</div>
        </section>
    );
};
