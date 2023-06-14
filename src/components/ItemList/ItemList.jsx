import { CardGroup, Spinner } from "react-bootstrap"
import ItemCard from "../ItemCard/ItemCard"
import "./ItemList.css"


function ItemList({ items, drinks, companions, dips, extras }) {



  return (items ?
    <CardGroup className="cards-container">
      {items.map((item) => {
        return <ItemCard
          picture={item.picture}
          title={item.name}
          description={item.description}
          price={item.price}
          key={item.id}
          id={item.id}
          drinks={drinks}
          size={item.size}
          companions={companions}
          dips={dips}
          extras={extras}
        />
      })}
    </CardGroup> :
    <Spinner />
  )
}

export default ItemList