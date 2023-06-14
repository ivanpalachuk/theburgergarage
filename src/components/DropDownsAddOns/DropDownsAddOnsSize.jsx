import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';


function DropdownAddOnsSize(props) {
  const { size } = props;

  function handleChange(option) {
    props.onSizeSelection(option);
  }

  function handleSelect(event) {
    event.target.toggle();
  }


  return (
    <>
      <Dropdown className="d-inline mx-2" onSelect={handleSelect}>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          ¿Cuantos medallones querés?
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-center">
          <Form>
            {size.map((option, index) => (
              <div key={option.id} className="mb-3">
                <Form.Check
                  inline
                  label={`${option.name} (+$${option.price})`}
                  name="group1"
                  type="radio"
                  id={`inline-radio-${option.id}`}
                  onChange={() => handleChange(option)}
                  defaultChecked={index === 0}
                />
              </div>

            ))}
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default DropdownAddOnsSize;