import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

function DropdownAddOnsExtras(props) {
    const { extras } = props;

    function handleChange(option) {
        props.onExtraSelection(option);
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant='secondary'>¿Querés agregarle algo?</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Form className='text-center'>
                        {extras.map((option) => (
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

export default DropdownAddOnsExtras;