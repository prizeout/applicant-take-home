import React from 'react';
import { useAppSelector } from '../../../hooks';
import { selectSelectedOffer, selectSelectedOfferValue } from '../../../slices/offers-slice';
import RedemptionReport from './redemption-report';
import ValueOption from './value-option';

import './value-selector.less';

const ValueSelector: React.FC = (): React.ReactElement => {
    const selectedOffer = useAppSelector(selectSelectedOffer);
    const selectedOfferValue = useAppSelector(selectSelectedOfferValue);

    if (!selectedOffer || !selectedOfferValue) {
        return null;
    }

    return (
        <>
            <h3 className="value-selector__title">Select Redemption Amount</h3>
            <div className="value-selector__option-container">
                {selectedOffer.giftcard_list.map((gc) => (
                    <ValueOption
                        giftcardId={gc.checkout_value_id}
                        key={gc.cost_in_cents}
                        selected={gc.checkout_value_id === selectedOfferValue.checkout_value_id}
                        value={gc.cost_in_cents}
                    />
                ))}
            </div>
            <RedemptionReport offer={selectedOfferValue} />
        </>
    );
};

export default ValueSelector;
