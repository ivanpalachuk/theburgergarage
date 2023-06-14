import { CartContext } from "../../context/CartContext";
import { useContext, useEffect, useState } from "react";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cart from "../Cart/Cart";

import { Button } from "react-bootstrap";
import "./CartModal.css";

const CartModal = () => {
    const [show, setShow] = useState(false);
    const [cartIsEmpty, setCartIsEmpty] = useState(true);
    const { itemsOnCart } = useContext(CartContext);

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        setCartIsEmpty(itemsOnCart.length === 0);
    }, [itemsOnCart]);


    const totalQuantity = itemsOnCart.map(item => item.quantity).reduce((a, b) => a + b, 0);

    return (
        <>
            {!cartIsEmpty &&
                <div className="checkout-container">
                    <Button className="checkout-btn w-100 " onClick={handleShow} variant='dark' >
                        Revisar pedido y enviar
                        <FontAwesomeIcon icon={faWhatsapp} className="ml-2 checkout-btn-whatsapp" />
                        <span className='items-added'>( {totalQuantity} )</span>
                    </Button>
                </div>
            }
            <Cart show={show} onHide={handleClose} emptyCart={cartIsEmpty} />
        </>
    );
};

export default CartModal;
