import React from 'react';
import Classnames from 'classnames';

/* Styles */
import './price-option-button.less';

/* UI Components */
import { Button } from '../../common';

interface PriceOptionButtonProps {
    id?: string;
    isSelected?: boolean;
    onClick?: () => void;
    priceText: string;
}

const PriceOptionButton: React.FC<PriceOptionButtonProps> = ({ id, isSelected, onClick, priceText }) => {

    const classes: string = Classnames(
        `priceOptionButton`,
        { 'priceOptionButton--isSelected': isSelected }
    );

    return (
        <Button
            ariaLabel={`price selection ${priceText}`}
            className={classes}
            id={id}
            onClick={onClick}
            size={'medium'}
            text={priceText}
            type='button'
        />
    );
};

export default PriceOptionButton;
