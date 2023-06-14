import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PlaceCard from '../PlaceCard/PlaceCard';
import moment from 'moment';
import 'moment-timezone/builds/moment-timezone-with-data-1970-2030'; // importar archivos necesarios de moment-timezone


import "./Welcome.css"

function Welcome() {

    const { selectPlace } = useContext(CartContext)

    const [show, setShow] = useState(false);
    const [place, setPlace] = useState(localStorage.getItem("selected"));

    useEffect(() => {
        if (!place) {
            setShow(true);
        }
    }, [place]);

    const handleClose = (e) => {
        setPlace(e.target.innerHTML);
        localStorage.setItem("selected", e.target.innerHTML);
        selectPlace(e.target.innerHTML)
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    const isMondayInArgentina = () => {
        const argentina = moment.tz("America/Argentina/Buenos_Aires");
        return argentina.day() === 1; // 0 = domingo, 1 = lunes, etc.
    }

    return (
        <>
            {show &&
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered >
                    <Modal.Header className="welcome-header">
                        <Modal.Title className="welcome-title">¿A qué sucursal vas a pedir?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="welcome-body d-flex justify-content-center">
                        <Button onClick={handleClose} variant="dark" className="btn-welcome">
                            EDISON
                        </Button>
                        {!isMondayInArgentina() &&
                            <Button onClick={handleClose} variant="dark" className="btn-welcome">
                                CONSTITUCION
                            </Button>
                        }
                        <Button onClick={handleClose} variant="dark" className="btn-welcome">
                            CENTRO
                        </Button>
                    </Modal.Body>
                </Modal>
            }
            <PlaceCard place={place} onShow={handleShow} />
        </>
    );
}
export default Welcome;
