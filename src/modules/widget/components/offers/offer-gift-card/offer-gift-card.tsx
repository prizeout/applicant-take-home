import React from 'react';
import Classnames from 'classnames';
import { GiftCard, BonusTag } from '../../../../../components/common/';
import { PrizeoutOffer } from '../../../../../slices/offers-slice';
import { setGiftCard } from '../../../../../slices/checkout-slice';
import { AppDispatch } from '../../../../../store';

import { useDispatch } from 'react-redux';

import './offer-gift-card.less';

interface OfferGiftCardProps {
    offer: PrizeoutOffer;
    onClickHandler: () => void;
    style?: React.CSSProperties;
}

export const OfferGiftCard: React.FC<OfferGiftCardProps> = ({ offer, onClickHandler, style }): React.ReactElement => {
    let activeOfferId;
    const dispatch = useDispatch<AppDispatch>();

    const firstGiftCard = offer.giftcard_list[0];
    const offerType = firstGiftCard.display_monetary_bonus ? 'monetary' : 'percentage';
    const offerValue = firstGiftCard.display_bonus;
    const classes: string = Classnames('offer-gift-card', {
        'offer-gift-card--selected': activeOfferId === firstGiftCard.checkout_value_id,
    });

    const selectOfferOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            onClickHandler();
        }
    };

    const clickOffer = () => {
        console.log('HELLOOOOOOOOOO', offer, offer.name); //gift image, gift
        dispatch(setGiftCard(offer));
        onClickHandler();
    };

    return (
        <div
            className={classes}
            onClick={() => clickOffer()}
            onKeyDown={(event) => selectOfferOnEnter(event)}
            role="button"
            tabIndex={0}
            style={style}
        >
            <GiftCard name={offer.name} imgUrl={offer.image_url} altText={offer.name} className="offer" />
            {offerValue > 0 && <BonusTag type={offerType} value={offerValue} size="small" />}
        </div>
    );
};
