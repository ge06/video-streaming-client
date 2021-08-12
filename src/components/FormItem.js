import '../css/FormItem.css'


const FormItem = ({input_field,icon,type,value,setValue,required}) =>{

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return(
        <div className="form-item">
            <img className="item-element icon" src={icon} alt={input_field}/>
            <input className="item-element input" type={type} placeholder={input_field} onChange= {(e) => handleChange(e)} required = {required}/>
        </div>
    )

}

export default FormItem;