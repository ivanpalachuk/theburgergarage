import { useState, useEffect } from "react"
import "./Counter.css"

function Counter(props) {

    const [count, setCount] = useState(1)

    const increase = () => { count < 5 && setCount(count + 1) }
    const decrease = () => { count > 1 && setCount(count - 1) }

    useEffect(() => {
        props.updateQuantity(count);
    }, [count, props]);

    return (
        <>
            <div className="counter-container">
                <div className="label-counter">Cantidad</div>
                <button className="btn-counter" onClick={decrease}>-</button>
                <span className="quantity-counter">{count}</span>
                <button className="btn-counter" onClick={increase}>+</button>
            </div>
        </>
    )
}

export default Counter