import React from 'react';
import Classnames from 'classnames';

/* Styles */
import './price-option-button.less';

/* UI Components */
import { Button } from '../../common';

interface PriceOptionButtonProps {
    isSelected?: boolean;
    onClick?: () => void;
    priceText: string;
}

const PriceOptionButton: React.FC<PriceOptionButtonProps> = ({ isSelected, onClick, priceText }) => {
    const classes: string = Classnames(`priceOptionButton`, { 'priceOptionButton--isSelected': isSelected });

    return (
        <Button
            ariaLabel={`price selection ${priceText}`}
            className={classes}
            onClick={onClick}
            size="small"
            text={priceText}
            type="button"
        />
    );
};

export default PriceOptionButton;
