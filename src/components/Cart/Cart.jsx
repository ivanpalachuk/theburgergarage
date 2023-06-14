import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { CardGroup, Modal } from 'react-bootstrap';
import ItemCard from '../ItemCard/ItemCard';
import UserForm from '../UserForm/UserForm';

import "./Cart.css"

function Cart({ show, onHide, emptyCart }) {
    const { itemsOnCart, total, removeItem } = useContext(CartContext)

    const handleDelete = (item) => {
        if (window.confirm('¿Estás seguro que deseas eliminar este producto?')) {
            removeItem(item);
        }
    }

    return (
        <>
            <Modal show={show && !emptyCart} fullscreen={true} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title className='checkout-title'>Finalizar pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {itemsOnCart.length === 0 ? (
                        <div className="empty-cart-message">No hay productos en el carrito.</div>
                    ) : (
                        <>
                            <CardGroup>
                                {itemsOnCart.map(({ item, quantity }, index) => {
                                    return (
                                        <div key={`item-${item.id}-${index}`}>
                                            <ItemCard
                                                title={item.title}
                                                picture={item.picture}
                                                price={item.price}
                                                id={item.id}
                                                isCart={true}
                                                quantity={quantity}
                                                subtotal={item.price * quantity}
                                                onDelete={() => handleDelete(item)}
                                                size={item.size}
                                                extras={item.extras}
                                                drinksToCart={item.drinks}
                                                dipsToCart={item.dips}
                                                note={item.note}
                                                companions={item.companions}
                                            />
                                        </div>
                                    )
                                })}
                            </CardGroup>
                            <div className="checkout-quantity">Total: $ {total}</div>
                            <UserForm />
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Cart;
