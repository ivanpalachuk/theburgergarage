import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

function DropdownAddOnsCompanions(props) {
    const { companions } = props;

    function handleChange(option) {
        props.onCompanionSelection(option);
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant='secondary'>¿Sumás algo para picar?</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Form className='text-center'>
                        {companions.map((option) => (
                            <div key={option.id} className="mb-3">
                                <Form.Check
                                    inline
                                    label={`${option.name} (+$${option.price})`}
                                    name="group1"
                                    type="checkbox"
                                    id={`inline-radio-${option.id}`}
                                    onChange={() => handleChange(option)}

                                />
                            </div>
                        ))}
                    </Form>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

export default DropdownAddOnsCompanions;