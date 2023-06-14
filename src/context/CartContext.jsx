import { createContext, useState } from "react";

//Creo el contexto

export const CartContext = createContext();

//Creo el componente

export function CartProvider({ children }) {
    const [itemsOnCart, setItemsOnCart] = useState([]);
    const [place,setPlace] = useState(localStorage.getItem("selected"))

    const isInCart = (item) => {
        const existingItem = itemsOnCart.find(
            (product) =>
                product.item.id === item.item.id &&
                JSON.stringify(product.item) === JSON.stringify(item.item)
        );
        return existingItem ? true : false;
    };

    const addItem = (item) => {
        let items = [...itemsOnCart];
        const existingItemIndex = items.findIndex(
          (product) =>
            product.item.id === item.item.id &&
            JSON.stringify(product.item) === JSON.stringify(item.item)
        );
        if (existingItemIndex !== -1) {
            items[existingItemIndex].quantity += item.quantity;
        } else {
            items.push(item);
        }
        setItemsOnCart(items);
    };
    

    const removeItem = (item) => {
        // Buscar el producto con el id y tamaño coincidentes
        const existingItem = itemsOnCart.find(
            (product) =>
                product.item.id === item.id &&
                product.item.size === item.size &&
                JSON.stringify(product.item.extras) === JSON.stringify(item.extras) &&
                JSON.stringify(product.item.drinks) === JSON.stringify(item.drinks) &&
                JSON.stringify(product.item.dips) === JSON.stringify(item.dips)
        );

        // Si se encontró el producto, eliminarlo
        if (existingItem) {
            setItemsOnCart(itemsOnCart.filter((product) => product !== existingItem));
        }
    };

    const changeQuantity = (item) => {
        const existingItem = itemsOnCart.find(
            (product) =>
                product.item.id === item.item.id &&
                JSON.stringify(product.item) === JSON.stringify(item.item)
        );
        existingItem.quantity = item.quantity;
        setItemsOnCart([...itemsOnCart]);
    };

    const clear = () => {
        setItemsOnCart([]);
    };

    const total = itemsOnCart.reduce(
        (previous, current) => previous + current.item.price * current.quantity,
        0
    );

const selectPlace = (place) =>{
    setPlace(place)
}

    return (
        <CartContext.Provider
            value={{ itemsOnCart, addItem, removeItem, clear, changeQuantity, total,selectPlace,place }}
        >
            {children}
        </CartContext.Provider>
    );
}
