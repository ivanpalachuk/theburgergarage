import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer">
      2023 - Made with <FontAwesomeIcon icon={faHeart} style={{ color: "#cb1515", }} />
      {" "}by <a href="mailto:ivan.palachuk@outlook.com" target="_blank" rel="noopener noreferrer">Zarseven Soft</a>
    </div>
  )
}

export default Footer




