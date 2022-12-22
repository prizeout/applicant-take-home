import React from 'react';
import Classnames from 'classnames';
import { GiftCard, BonusTag } from '../../../../../components/common/';
import { PrizeoutOffer, selectSelectedOfferValue } from '../../../../../slices/offers-slice';

import './offer-gift-card.less';
import { useAppSelector } from '../../../../../hooks';

interface OfferGiftCardProps {
    offer: PrizeoutOffer;
    onClickHandler: () => void;
}

export const OfferGiftCard: React.FC<OfferGiftCardProps> = ({ offer, onClickHandler }): React.ReactElement => {
    const activeOfferValue = useAppSelector(selectSelectedOfferValue);
    const activeOfferId = activeOfferValue?.checkout_value_id;

    const offerType = offer.giftcard_list[0].display_monetary_bonus ? 'monetary' : 'percentage';
    const offerValue = offer.giftcard_list[0].display_bonus;
    const classes: string = Classnames('offer-gift-card', {
        'offer-gift-card--selected': offer.giftcard_list.some((gc) => gc.checkout_value_id === activeOfferId),
    });

    const selectOfferOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            onClickHandler();
        }
    };

    return (
        <div
            className={classes}
            onClick={() => onClickHandler()}
            onKeyDown={(event) => selectOfferOnEnter(event)}
            role="button"
            tabIndex={0}
        >
            <GiftCard name={offer.name} imgUrl={offer.image_url} altText={offer.name} className="offer" />
            {offerValue > 0 && <BonusTag type={offerType} value={offerValue} size="small" />}
        </div>
    );
};
