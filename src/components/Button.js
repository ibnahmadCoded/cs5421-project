import PropTypes from 'prop-types'

const Button = ({color, text, onClick, float}) => {
    return (
        <button 
            onClick={onClick} 
            style={{backgroundColor: color, float:float}} 
            className="btn"
        >
            {text}
        </button>)
}

Button.defaultProps = {
    color: "#ED6630",
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button