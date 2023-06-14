import Container from 'react-bootstrap/Container';

import "./Header.css"

function Header() {

  return (
    <>
      <div className="navbar-header" >
        <Container className="d-flex justify-content-center p-1">
          <img
            className="logoB"
            src="/images/Foto_Perfil_1.png"
            width="100%"
            alt="Logo the box"
          />
        </Container>
      </div>
    </>
  )

}

export default Header
