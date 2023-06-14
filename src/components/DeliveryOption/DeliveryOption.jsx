import React from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import "moment/locale/es"

import './DeliveryOption.css';


const DeliveryOption = (props) => {

    moment.locale("es")

    const isDeliveryDisabled = () => {
        const currentTime = moment();
        const deliveryStartTime = moment().hour(19).minute(0).second(0);
        const deliveryEndTime = moment().hour(23).minute(45).second(0);
        return currentTime.isAfter(deliveryStartTime) && currentTime.isBefore(deliveryEndTime);
    };

    const getDeliveryLabel = () => {
        const currentTime = moment();
        const deliveryStartTime = moment().hour(19).minute(0).second(0);
        const deliveryEndTime = moment().hour(23).minute(45).second(0);

        if (currentTime.isBefore(deliveryStartTime)) {
            const remainingTime = deliveryStartTime.locale("es").fromNow();
            return `Delivery a partir de las 19 (${remainingTime})`;
        } else if (currentTime.isBetween(deliveryStartTime, deliveryEndTime)) {
            return 'Delivery';
        } else {
            return 'Horario de Delivery de 19 a 24';
        }
    };

    return (
        <>
            <div className='delivery-container'>
                <div className='delivery-label'>
                    Forma de entrega
                </div>
                <div className="fullFill-btn-container">
                    <Button
                        variant="light"
                        className={`button-place ${props.fullFillment === 'Delivery' ? 'active' : ''}`}
                        size="sm"
                        onClick={() => props.onChangeFullFillment('Delivery')}
                        disabled={!isDeliveryDisabled()}
                    >
                        {getDeliveryLabel()}
                    </Button>
                    <Button
                        variant="light"
                        className={`button-place ${props.fullFillment === 'Retiro por el salon' ? 'active' : ''}`}
                        size="sm"
                        onClick={() => props.onChangeFullFillment('Retiro por el salon')}
                    >
                        Retiro por el salon
                    </Button>
                </div>
            </div>
        </>
    );
};

export default DeliveryOption;
