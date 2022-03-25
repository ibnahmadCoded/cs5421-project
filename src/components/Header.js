import PropTypes from 'prop-types'
import logo from '../assets/logo.png'
import Button from './Button'
import { useNavigate } from "react-router-dom";

const Header = ({title}) => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate("/logout");
    }
    
    return (
        <header style={centerStyle}>
            <img src={logo} alt="logo" height="60" style={imageStyle}/>
            <h1 style={headingStyle}>{title}</h1>
            <Button color="#ED6630" text="logout" onClick={onClick}/>
        </header>
    )
}

Header.defaultProps = {
    title: "Query Evaluator",
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

const headingStyle = {
    color: "#104880",
    top: "18px",
    left: "10px",
    fontSize: "60px",
    paddingRight: "60px",
}

const imageStyle = {
    float: "left",
    paddingRight: "40px",
  }

const centerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: "50px",
  }

export default Header