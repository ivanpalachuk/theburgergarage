import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

import './CartButton.css';

function CartButton({ subtotal, quantity, handleClick }) {
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        if (addedToCart) {
            const timeoutId = setTimeout(() => {
                setAddedToCart(false);
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [addedToCart]);

    useEffect(() => {
        if (subtotal !== 0 || quantity !== 0) {
            setAddedToCart(true);
        }
    }, [subtotal, quantity]);

    return (
        <Button className={`add-to-cart-btn ${addedToCart ? 'added-to-cart' : ''}`} onClick={handleClick}>
            <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '10px' }} size="sm" />
            Agregar al carrito por $ {subtotal * quantity}
        </Button>
    );
}

export default CartButton;
