import '../css/Button.css'

const Button = ({
    content,
    buttonStyle,
    onClick
                }) => {

    const STYLES = ['primary','secondary']

    const checkButtonStyle = () =>{
        return (STYLES.includes(buttonStyle) ? buttonStyle : "primary")
    }

    return(
        <button className={`button ${checkButtonStyle(buttonStyle)}`} onClick = {onClick}>
            {content}
        </button>
    )



}

export default Button;