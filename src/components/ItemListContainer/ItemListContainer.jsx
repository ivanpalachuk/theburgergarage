import { useEffect, useState, useContext } from "react"
import { Spinner } from "react-bootstrap"
import axios from "axios"
import ItemList from "../ItemList/ItemList"
import Category from "../Category/Category"
import { CartContext } from "../../context/CartContext"
import "./ItemListContainer.css"



function ItemListContainer() {

    const { place } = useContext(CartContext)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    const baseURL = "/data/menu.json"
    const branchURL = "/data/menu2.json"


    useEffect(() => {
        axios
            .get(place === "CONSTITUCION" ? branchURL : baseURL)
            .then(({ data: { categories } }) => {
                setItems(categories)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [place])

    return loading ? (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
        </Spinner>
    ) : (
        <>
            <Category categories={Object.keys(items)} />
            <div className="category-title" id="hamburguesas">HAMBURGUESAS</div>
            <ItemList items={items.hamburguesas} drinks={items.bebidas} companions={items.companion} dips={items.dips} extras={items.extras} />
            <div className="category-title" id="postres">POSTRES</div>
            <ItemList items={items.postres} drinks={items.bebidas} />
            <div className="category-title" id="companion">PARA PICAR</div>
            <ItemList items={items.companion} drinks={items.bebidas} />
        </>
    )
}

export default ItemListContainer
