import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import "./DropDowns.css"

function DropdownAddOnsDrinksforPromos(props) {

    const { drinks } = props;
    const [selectedDrinks, setSelectedDrinks] = useState([]);

    function handleChange(drink) {
        const newDrink = {
            id: drink.id,
            name: drink.name,
            description: drink.description,
            price: 0
        };
        setSelectedDrinks([...selectedDrinks, newDrink]);
        props.onDrinkSelection(newDrink);
    }

    return (
        <>
            <div className='promo-drinks-container'>

                <Dropdown className="promo-gaseosas" >
                    <Dropdown.Toggle variant="secondary" style={{ width: "50%", fontSize: "13px" }} >
                        Gaseosa 1
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Form className='text-center'>
                            {drinks[0].gaseosas.map((option) => (
                                <div key={option.id} className="mb-3">
                                    <Form.Check
                                        inline
                                        label={`${option.name}`}
                                        name="group1"
                                        type="radio"
                                        id={`inline-radio-${option.id}`}
                                        onChange={() => handleChange(option)}
                                    />
                                </div>
                            ))}
                        </Form>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="promo-gaseosas" >
                    <Dropdown.Toggle variant="secondary" style={{ width: "50%", fontSize: "13px" }} >
                        Gaseosa 2
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Form className='text-center'>
                            {drinks[0].gaseosas.map((option) => (
                                <div key={option.id} className="mb-3">
                                    <Form.Check
                                        inline
                                        label={`${option.name}`}
                                        name="group1"
                                        type="radio"
                                        id={`inline-radio-${option.id}`}
                                        onChange={() => handleChange(option)}
                                    />
                                </div>
                            ))}
                        </Form>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown className="promo-cervezas">
                    <Dropdown.Toggle variant="secondary" style={{ width: "50%", fontSize: "13px" }} >
                        Cervezas
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Form className='text-center'>
                            {drinks[2].cervezas.slice(0, drinks[2].cervezas.length - 3).map((option) => (
                                <div key={option.id} className="mb-3">
                                    <Form.Check
                                        inline
                                        label={`${option.name}`}
                                        name="group1"
                                        type="radio"
                                        id={`inline-radio-${option.id}`}
                                        onChange={() => handleChange(option)}
                                    />
                                </div>
                            ))}
                        </Form>
                    </Dropdown.Menu>
                </Dropdown>


            </div>
        </>
    );
}

export default DropdownAddOnsDrinksforPromos;
