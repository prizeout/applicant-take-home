import React from 'react';
import Classnames from 'classnames';
import { useAppSelector } from '../../../hooks';
import { PrizeoutOfferValueOptions, selectChosenOptionId } from '../../../slices/offers-slice';

import './value-option.less';

interface ValueOptionProps {
    option: PrizeoutOfferValueOptions;
    onClickHandler: () => void;
}

export const ValueOption: React.FC<ValueOptionProps> = ({ option, onClickHandler }): React.ReactElement => {
    const activeOptionId = useAppSelector(selectChosenOptionId);

    const classes: string = Classnames('value-option', {
        'value-option--selected': option.checkout_value_id === activeOptionId,
    });

    const displayAmount = (option.value_in_cents / 100).toLocaleString('en-US', {
        currency: 'USD',
        style: 'currency',
    });

    return (
        <div className={classes} onClick={() => onClickHandler()}>
            {displayAmount}
        </div>
    );
};
