import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleOfferId } from '../../../slices/offers-slice';
import { formatCurrencyUSD } from '../../../utils/formaters';

const ValueOption: React.FC<{ giftcardId: string; selected: boolean; value: number }> = ({
    giftcardId,
    selected,
    value,
}): React.ReactElement => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(toggleOfferId(giftcardId));
    };

    return (
        <button
            className={classNames('value-selector__amount-option', { 'value-selector__amount-selected': selected })}
            onClick={selected ? undefined : onClick}
            disabled={selected}
        >
            {formatCurrencyUSD(value)}
        </button>
    );
};

export default ValueOption;
