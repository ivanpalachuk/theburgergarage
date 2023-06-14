import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

function DropdownAddOnsDips(props) {
    const { dips } = props;

    function handleChange(option) {
        props.onDipSelection(option);
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant='secondary'>¿Algún Dip para acompañar?</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Form className='text-center'>
                        {dips.map((option) => (
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



export default DropdownAddOnsDips
