import { CartContext } from '../../context/CartContext';
import { useContext, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import DropdownAddOnsSize from '../DropDownsAddOns/DropDownsAddOnsSize';
import DropdownAddOnsExtras from "../DropDownsAddOns/DropDownsAddOnsExtras";
import DropdownAddOnsDrinks from '../DropDownsAddOns/DropDownsAddOnsDrinks';
import DropdownAddOnsDips from "../DropDownsAddOns/DropDownsAddOnsDips"
import DropdownAddOnsCompanions from '../DropDownsAddOns/DropDownsAddOnsCompanion';
import DropdownAddOnsDrinksforPromos from '../DropDownsAddOns/DropDownsAddOnsDrinksforPromos';
import Counter from '../Counter/Counter';
import CartButton from '../CartButton/CartButton';
import NoteToOrder from '../NotesToOrder/NotesToOrder';


import "./AddOns.css"

function AddOns(props) {

    const { title, description, picture, id, price, size, drinks, companions, dips, extras } = props


    const { addItem } = useContext(CartContext)

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(size ? size[0] : { price: 0 });
    const [selectedCompanions, setSelectedCompanions] = useState([])
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [selectedDrinks, setSelectedDrinks] = useState([]);
    const [selectedDips, setSelectedDips] = useState([])
    const [originalPrice, setOriginalPrice] = useState(price);
    const [note, setNote] = useState("")
    const [subtotal, setSubtotal] = useState(price);

    //Counter Handler to set quantity
    const updateQuantity = (newQuantity) => {
        setQuantity(newQuantity);
    };

    function handleSizeSelection(selectedOption) {
        setSelectedSize(selectedOption);
    }

    function handleCompanionSelection(selectedOption) {
        const companionIndex = selectedCompanions.findIndex(option => option.id === selectedOption.id);
        let newSelectedCompanions;
        if (companionIndex === -1) {
            newSelectedCompanions = [...selectedCompanions, selectedOption];
        } else {
            newSelectedCompanions = [...selectedCompanions];
            newSelectedCompanions.splice(companionIndex, 1);
        }
        setSelectedCompanions(newSelectedCompanions);
        const companionsTotal = newSelectedCompanions.reduce((acc, curr) => acc + curr.price, 0);
        const newSubtotal = originalPrice + (selectedSize?.price || 0) + companionsTotal + (selectedExtras.reduce((acc, curr) => acc + curr.price, 0)) + (selectedDrinks.reduce((acc, curr) => acc + curr.price, 0)) + (selectedDips.reduce((acc, curr) => acc + curr.price, 0));
        setSubtotal(newSubtotal * quantity);
    }
    function handleExtraSelection(selectedOption) {
        const extrasIndex = selectedExtras.findIndex(option => option.id === selectedOption.id);
        let newSelectedExtras;
        if (extrasIndex === -1) {
            newSelectedExtras = [...selectedExtras, selectedOption];
        } else {
            newSelectedExtras = [...selectedExtras];
            newSelectedExtras.splice(extrasIndex, 1);
        }
        setSelectedExtras(newSelectedExtras);
        const extrasTotal = newSelectedExtras.reduce((acc, curr) => acc + curr.price, 0);
        const newSubtotal = price + (selectedSize?.price || 0) + extrasTotal;
        setSubtotal(newSubtotal);
    }

    function handleDrinkSelection(selectedOption) {
        const drinkIndex = selectedDrinks.findIndex(option => option.id === selectedOption.id);
        let newSelectedDrinks;
        if (drinkIndex === -1) {
            newSelectedDrinks = [...selectedDrinks, selectedOption];
        } else {
            newSelectedDrinks = [...selectedDrinks];
            newSelectedDrinks.splice(drinkIndex, 1);
        }
        setSelectedDrinks(newSelectedDrinks);
        const drinksTotal = newSelectedDrinks.reduce((acc, curr) => acc + curr.price, 0);
        const newSubtotal = price + (selectedSize?.price || 0) + drinksTotal;
        setSubtotal(newSubtotal);
    }

    function handleDipsSelection(selectedOption) {
        const dipsIndex = selectedDips.findIndex((option) => option.id === selectedOption.id);
        let newSelectedDips;
        if (dipsIndex === -1) {
            newSelectedDips = [...selectedDips, selectedOption];
        } else {
            newSelectedDips = [...selectedDips];
            newSelectedDips.splice(dipsIndex, 1);
        }
        setSelectedDips(newSelectedDips);
        const dipsTotal = newSelectedDips.reduce((acc, curr) => acc + curr.price, 0);
        const newSubtotal = price + (selectedSize?.price || 0) + (selectedExtras.reduce((acc, curr) => acc + curr.price, 0)) + dipsTotal;
        setSubtotal(newSubtotal);
    }

    function handleNoteChange(note) {
        setNote(note);
    }



    useEffect(() => {
        let extrasTotal = 0;
        if (selectedExtras.length > 0) {
            extrasTotal = selectedExtras.reduce((acc, curr) => acc + curr.price, 0);
        }

        let drinksTotal = 0;
        if (selectedDrinks.length > 0) {
            drinksTotal = selectedDrinks.reduce((acc, curr) => acc + curr.price, 0);
        }

        let dipsTotal = 0;
        if (selectedDips.length > 0) {
            dipsTotal = selectedDips.reduce((acc, curr) => acc + curr.price, 0);
        }

        let companionsTotal = 0;
        if (selectedCompanions.length > 0) {
            companionsTotal = selectedCompanions.reduce((acc, curr) => acc + curr.price, 0);
        }

        let sizePrice = 0;
        if (selectedSize !== 0) {
            sizePrice = selectedSize.price;
        }

        const newSubtotal = originalPrice + sizePrice + extrasTotal + drinksTotal + dipsTotal + companionsTotal;
        setSubtotal(newSubtotal);
    }, [selectedExtras, selectedDrinks, selectedDips, selectedSize, selectedCompanions, originalPrice]);



    const handleClick = () => {

        addItem({
            item: {
                id: id,
                title: title,
                description: description,
                price: subtotal,
                picture: picture,
                size: selectedSize.name || "",
                extras: selectedExtras.map((extra) => extra.name),
                drinks: selectedDrinks.map((drink) => drink.name),
                dips: selectedDips.map((dip) => dip.name),
                note: note,
                companions: selectedCompanions.map((extra) => extra.name),
            },
            quantity: quantity
        });
        props.onHide();
    }

    useEffect(() => {
        size ? setSelectedSize(size[0]) : setSelectedSize(0)
        setSelectedCompanions([])
        setSelectedExtras([]);
        setSelectedDrinks([]);
        setSelectedDips([])
        setQuantity(1);
        setOriginalPrice(price);
        setNote("")
        setSubtotal(price);
    }, [props.onHide, addItem, price]);

  useEffect(() => {
    // Actualizar los efectos secundarios relacionados con el componente
    // aquí, como suscribirse a eventos, al montar y desmontar el componente.

    // Manejar el evento popstate para cerrar el componente cuando se presione
    // el botón de retroceso o se realice la acción de retroceder en el dispositivo móvil.
    const handlePopState = () => {
      props.onHide(); // Cerrar el componente
    };

    // Suscribirse al evento popstate al montar el componente
    window.addEventListener('popstate', handlePopState);

    // Reemplazar la URL actual en el historial para evitar retroceder
    const currentUrl = window.location.href;
    history.replaceState(null, null, currentUrl);

    // Limpiar el efecto y eliminar el evento popstate al desmontar el componente
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [props.onHide]);

  // Resto del código...


    return (

        <Modal
            {...props}
            fullscreen={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='add-on-header' closeButton />
            <div className='add-on-image-container'>
                {picture && <img src={picture} alt={props.title} className="add-on-image" />}
            </div>
            <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
            <Modal.Body>
                <div className='add-on-title'>{title.toUpperCase()}</div>
                <div className='add-on-description'>
                    {description}
                </div>
                <div className='drops-container'>
                    {title === "Promo Sampler" && <div className='sampler-warning'>Pasanos en notas cuáles bebidas elegis porfa!</div>}
                    {size && <DropdownAddOnsSize size={size} onSizeSelection={handleSizeSelection} />}
                    {title !== "Promo Sampler" ? extras && <DropdownAddOnsExtras extras={extras} onExtraSelection={handleExtraSelection} /> : null}
                    {companions && <DropdownAddOnsCompanions companions={companions} onCompanionSelection={handleCompanionSelection} />}
                    <Counter updateQuantity={updateQuantity} />
                    {title !== "Promo Sampler" ? <DropdownAddOnsDrinks drinks={drinks} title={title} onDrinkSelection={handleDrinkSelection} /> : null} 
                    {dips && <DropdownAddOnsDips dips={dips} onDipSelection={handleDipsSelection} />}
                    <NoteToOrder onNoteChange={handleNoteChange} note={note} />
                </div>
            </Modal.Body>
            <Modal.Footer >
                <CartButton subtotal={subtotal} quantity={quantity} handleClick={handleClick} />
            </Modal.Footer>
        </Modal>

    );
}

export default AddOns