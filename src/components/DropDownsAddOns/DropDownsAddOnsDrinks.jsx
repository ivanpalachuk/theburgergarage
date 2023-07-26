import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

function DropdownAddOnsDrinks(props) {

    const { drinks } = props;

    function handleChange(drink) {
        props.onDrinkSelection(drink);
    }

    return (
        <Dropdown className="d-inline mx-2">
            <Dropdown.Toggle id="dropdown-autoclose-true" variant="secondary">
                ¿Que Bebida Elegis?
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {drinks.map((category) => {
                    const categoryName = Object.keys(category)[0];
                    if (categoryName === "tragos") {
                        return null; // Si la categoría es "tragos", no renderizarla
                    }
                    return (
                        <div key={categoryName}>
                            <h6 className="dropdown-header">{categoryName}</h6>
                            <Form className="text-center">
                                {category[categoryName].map((drink) => (
                                    <div key={drink.id} className="mb-3">
                                        <Form.Check
                                            inline
                                            label={`${drink.name} (+$${drink.price})`}
                                            name="group1"
                                            type="radio"
                                            id={`addon-${drink.id}`}
                                            onChange={() => handleChange(drink)}
                                        />
                                    </div>
                                ))}
                            </Form>
                        </div>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropdownAddOnsDrinks