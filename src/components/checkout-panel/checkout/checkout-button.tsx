import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks';
import { getCurrentOfferRequest, setActiveOffer } from '../../../slices/offers-slice';
import { AppDispatch } from '../../../store';
import { Button } from '../../common';

async function fakeFetcher(url: any, options: any) {
    console.log(url, options);
    return { msg: 'Okay' };
}

const CheckoutButton: React.FC = (): React.ReactElement => {
    const offerRequest = useAppSelector(getCurrentOfferRequest);
    const dispatch = useDispatch<AppDispatch>();

    const buttonText = 'Prizeout Gift Card';
    const buttonHandler = async () => {
        if (offerRequest == null) {
            return;
        }

        await fakeFetcher('fake_host/checkout', {
            body: JSON.stringify(offerRequest),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
        });

        dispatch(setActiveOffer(null));
    };

    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`primary`}
                onClick={buttonHandler}
                size="medium"
                text={buttonText}
                type="submit"
            />
        </>
    );
};

export default CheckoutButton;
