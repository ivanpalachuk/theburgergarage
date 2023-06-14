import Dropdown from 'react-bootstrap/Dropdown';
import "./NotesToOrder.css"
import { Button } from 'react-bootstrap';

function NoteToOrder(props) {
  const { onNoteChange, note } = props;

  const handleNoteChange = (event) => {
    onNoteChange(event.target.value);
  };

  return (
    <Dropdown focusFirstItemOnShow="true" drop='up-centered' className='dropdown'>
      <Dropdown.Toggle variant='secondary'>Notas para el pedido</Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-note">
        <Dropdown.Item
          className="note-to-order"
          as="textarea"
          placeholder="Deja una nota para la orden"
          onChange={handleNoteChange}
          value={note}
        />
        <Dropdown.Item><Button className='btn-note-ok'>OK</Button></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NoteToOrder;
