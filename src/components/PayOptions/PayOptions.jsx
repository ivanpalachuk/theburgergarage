import { Button } from 'react-bootstrap'
import "./PayOptions.css"

const PayOptions = (props) => {


    return (
        <>
            <div className='pay-container'>
                <div className='pay-label'>
                    Forma de pago
                </div>
                <div className="pay-btn-container">
                    <Button
                        variant="dark"
                        className={`button-place ${props.selectedPay === "Efectivo" ? "active" : ""}`}
                        size="sm"
                        onClick={() => props.onChangeSelectedPay("Efectivo")}>
                        Efectivo
                    </Button>
                    <Button
                        variant="dark"
                        className={`button-place ${props.selectedPay === "Mercado Pago" ? "active" : ""}`}
                        size="sm"
                        onClick={() => props.onChangeSelectedPay("Mercado Pago")} >
                        Mercado Pago
                    </Button>
                    <Button
                        variant="dark"
                        className={`button-place ${props.selectedPay === "Cuenta DNI" ? "active" : ""}`}
                        size="sm"
                        onClick={() => props.onChangeSelectedPay("Cuenta DNI")} >
                        Cuenta DNI
                    </Button>
                </div>
            </div>
        </>
    )
}

export default PayOptions