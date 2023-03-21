import React from 'react';
import { Button } from '../../common';
import { useAppSelector } from '../../../hooks';
import { selectOffer } from '../../../slices/common-slice';
import { selectCheckoutValueOffer } from '../../../slices/checkout-slice';

const CheckoutButton: React.FC = (): React.ReactElement => {

    const selectedCheckoutOffer = useAppSelector(selectCheckoutValueOffer);
    const selectedOffer = useAppSelector(selectOffer);

    const buttonText = 'Prizeout Gift Card';

    const [buttonColor, setButtonColor] = React.useState<string>('primary');
    interface offerDataToPost {
        checkout_value_id: string;
        cost_in_cents: number;
        name: string;
        value_in_cents: number;
    }

    const buttonHandler = async () => {
        const data: offerDataToPost = {
            checkout_value_id: selectedCheckoutOffer.checkout_value_id,
            cost_in_cents: selectedCheckoutOffer.cost_in_cents,
            name: selectedOffer.name,
            value_in_cents: selectedCheckoutOffer.value_in_cents
        };
        const response = fetch('#', {
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
            },
            method: 'PUT',
        })
            .then((data) => {
                if (data.status === 200) {
                    setButtonColor('success');
                } else {
                    setButtonColor('error');
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            {selectedCheckoutOffer && selectedOffer && (
                <Button
                    ariaLabel="Prizeout your gift card"
                    color={buttonColor}
                    onClick={buttonHandler}
                    size="medium"
                    text={buttonText}
                    type="submit"
                />
            )}
        </>
    );
};

export default CheckoutButton;
