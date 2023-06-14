import { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { CartContext } from "../../context/CartContext";
import DeliveryOption from "../DeliveryOption/DeliveryOption";
import PayOptions from "../PayOptions/PayOptions";
import * as amplitude from '@amplitude/analytics-browser';

import "./UserForm.css";

const UserForm = () => {

    const { itemsOnCart, total, place } = useContext(CartContext);
    const [name, setName] = useState(localStorage.getItem("name") || "");
    const [address, setAddress] = useState(localStorage.getItem("address") || "");
    const [fullFillment, setFullFillment] = useState("Retiro por el salon");
    const [selectedPay, setSelectedPay] = useState("Efectivo");
    const [phoneNumber, setPhoneNumber] = useState()

    useEffect(() => {
        let phone = '';
        switch (place) {
            case 'EDISON':
                phone = '542235950092';
                break;
            case 'CONSTITUCION':
                phone = '542235058817';
                break;
            case 'CENTRO':
                phone = '542236749602';
                break;
            default:
                phone = '5492233470798';
                break;
        }
        setPhoneNumber(phone);
    }, [place]);


    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem("name", name);
        localStorage.setItem("address", address);

        amplitude.track('Complete Purchase', {
            amount: total,
            paymentMethod: selectedPay,
            fulfillmentMethod: fullFillment,
            storeName: place
        });

        itemsOnCart.map(({ item, quantity }) => {
            amplitude.track('Purchase Item', {
                name: item.title,
                price: item.price,
                quantity: quantity,
                amount: item.price * quantity,
                paymentMethod: selectedPay,
                fulfillmentMethod: fullFillment,
                storeName: place
            });         
        });

        const message =
            `¡Hola Chicos!, me gustaría hacer un pedido, te lo detallo a continuación, espero confirmación para realizar el pago:
        
Nombre: *${name}*
Dirección: *${address}*
Modo:*${fullFillment}*
Forma de Pago:*${selectedPay}*

${itemsOnCart.map(({ item, quantity }) => (
                `*${quantity}* x *${item.title}*,
    Tamaño: *${item.size}*
    ${`Extras: *${item.extras}*` || ''}
    ${`Acompañamiento: *${item.companions}*` || ''}
    ${`Bebidas: *${item.drinks}*` || ''}
    ${`Dips: *${item.dips}*` || ''}
    ${`Notas: *${item.note}*` || ''}
    Subtotal: $${item.price * quantity}`

            )).join("\n")}
----------------------------------

Total: *$${total}* mas envío a confirmar`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    useEffect(() => {
        localStorage.setItem("name", name);
        localStorage.setItem("address", address);
    }, [name, address]);


    return (
        <>
            <DeliveryOption fullFillment={fullFillment} onChangeFullFillment={setFullFillment} />
            <PayOptions selectedPay={selectedPay} onChangeSelectedPay={setSelectedPay} />
            <Form className="form-container" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingresa tu nombre" value={name} onChange={(event) => setName(event.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" placeholder="Dirección" value={address} onChange={(event) => setAddress(event.target.value)} required />
                </Form.Group>
                <Button variant="success" type="submit" style={{ background: "#25D366" }}>
                    Pedir
                </Button>
            </Form>
        </>


    );
};

export default UserForm;
