import React from 'react';
import Classnames from 'classnames';
import {
    PrizeoutOffer,
    PrizeoutOfferSettings,
    setActiveOfferId,
    selectActiveOfferId,
    setSelectedOption,
} from '../../../../../slices/offers-slice';
import { OfferGiftCard } from '../offer-gift-card/offer-gift-card';
import { useAppSelector } from '../../../../../hooks';
import { selectIsCheckoutPanelCollapsed } from '../../../../../slices/common-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import { toggleIsCollapsedCheckoutPanelOpen } from '../../../../../slices/checkout-slice';

import './vertical-offers.less';

interface OfferView {
    offers: PrizeoutOffer[];
    viewSettings?: PrizeoutOfferSettings;
}

const VerticalOffers: React.FC<OfferView> = ({ offers, viewSettings }): React.ReactElement => {
    const isCheckoutPanelCollapsedView = useAppSelector(selectIsCheckoutPanelCollapsed);
    const activeOfferId = useAppSelector(selectActiveOfferId);
    const heading = viewSettings.title || 'Recommended for you';
    const classes: string = Classnames('vertical-offers');
    const dispatch = useDispatch<AppDispatch>();

    const offerClickHandler = (offer: PrizeoutOffer) => {
        // reset selected option
        dispatch(setSelectedOption(null));
        if (offer.giftcard_list[0].checkout_value_id !== activeOfferId) {
            dispatch(setActiveOfferId(offer.giftcard_list[0].checkout_value_id));
            // Wrap checkout panel toggle in offer conditional to prevent checkout panel
            // from opening when deselecting card
            if (isCheckoutPanelCollapsedView) {
                dispatch(toggleIsCollapsedCheckoutPanelOpen());
            }
            // Unselect if already selected
        } else {
            dispatch(setActiveOfferId(null));
        }
    };

    const returnOffers = () => {
        return offers.map((offer) => (
            <OfferGiftCard
                key={`${heading}-${offer.name}`}
                offer={offer}
                onClickHandler={() => offerClickHandler(offer)}
            />
        ));
    };

    return (
        <div className={classes}>
            <h2>{heading}</h2>
            {offers && <div className="vertical-offers__gift-cards">{returnOffers()}</div>}
        </div>
    );
};

export default VerticalOffers;
