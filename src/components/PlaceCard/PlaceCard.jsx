import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "./PlaceCard.css"

function PlaceCard({ place, onShow }) {

    let address;
    switch (place) {
        case "EDISON":
            address = "EDISON 2876";
            break;
        case "CONSTITUCION":
            address = "BOX TRUCK";
            break;
        case "CENTRO":
            address = "ENTRE RIOS 2233";
            break;
        default:
            address = "Dirección por confirmar";
    }

    return (
        <div className="overlay">
            <Card className="text-center m-3 bg-black place-container">
                <Card.Header className="title-custom-font">
                    VAS A PEDIR EN:{" "}
                    {
                        <Button
                            className='button-welcome border border-warning'
                            variant="light"
                            onClick={onShow}
                        >
                            {place}
                        </Button>
                    }
                </Card.Header>
                <Card.Footer className="text-muted" size="sm">
                    {address}<br />
                    Horario de atención de 12 a 00
                </Card.Footer>
            </Card>
        </div>
    );
}

export default PlaceCard;