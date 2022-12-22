import classNames from 'classnames';
import React from 'react';
import { formatCurrencyUSD } from '../../../utils/formaters';

const ValueOption: React.FC<{ value: number; selected: boolean }> = ({ value, selected }): React.ReactElement => {
    return (
        <button
            className={classNames('value-selector__amount-option', { 'value-selector__amount-selected': selected })}
        >
            {formatCurrencyUSD(value)}
        </button>
    );
};

export default ValueOption;
