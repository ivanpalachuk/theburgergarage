import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import AddOns from "../AddOns/AddOns";
import "./ItemCard.css";

function ItemCard(props) {

  const { id, picture, title, description, price, isCart, quantity, subtotal, onDelete, drinks, size, companions, extras, drinksToCart, dips, dipsToCart, note, } = props;
  const [modalShow, setModalShow] = useState(false);

  //quantity check if card its already inCart

  const handleClick = () => setModalShow(true);
  return (
    <>
      <div onClick={!quantity ? handleClick : null}>
        <Card className="item-card" key={id}>
          <div style={{ flex: 1 }}>
            <Card.Title className="item-card-title">{title.toUpperCase()}</Card.Title>

            {quantity ?
              <>
                <Card className="item-card-text">
                  <div>Cantidad: {quantity}</div>
                  <div>Tamaño: {size}</div>
                  {extras.length > 0 && <div>Extras: {extras.join(", ")}</div>}
                  {companions.length > 0 && <div>Acompañamiento: {companions.join(", ")}</div>}
                  {drinksToCart.length > 0 && <div>Bebidas: {drinksToCart.join(", ")}</div>}
                  {dipsToCart.length > 0 && <div>Dips: {dipsToCart.join(", ")}</div>}
                  {note && <div>Notas: <span style={{ color: "red" }}>{note}</span></div>}
                  <div>Subtotal: ${subtotal}</div>
                </Card>

              </>
              :
              <Card.Text className="item-card-text">{description}</Card.Text>
            }

            <div style={{ display: "flex", alignItems: "center" }}>
              {!isCart && (
                <Button onClick={handleClick} variant="dark">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    style={{ marginRight: "10px" }}
                    size="sm"
                  />
                  ${price}
                </Button>

              )}
            </div>
          </div>
          {picture ?
            <div className="item-card-img-container">
              <Card.Img
                variant="top"
                src={picture}
                className="item-card-img"
              />
              {quantity && <Button onClick={onDelete} variant='danger' className="btn-delete">X</Button>}
            </div>
            :
            <div className="item-nopicture"></div>}
        </Card>
      </div>

      <AddOns
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={title}
        description={description}
        picture={picture}
        id={id}
        price={price}
        drinks={drinks}
        size={size}
        companions={companions}
        dips={dips}
        extras={extras}
      />
    </>
  );
}

export default ItemCard;
