import style from "./InputField.module.scss"


/**
 * @param {*} props
 * @param props.label - label p
 * @param props.name - Input name
 * @param props.type - Input type
 * @param props.placholder Input text
 * @returns kommer med Label med input 
 */

export const InputField = (props) => {

    const handleChange = (event) => {
        if (props.onChange) {
            props.onChange(event);
        }
    };

    return (
        <label className={style.inputfield} htmlFor={props.label}>
            <p>{props.label}</p>
            <input
                autoComplete="on"
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                onChange={handleChange}
            />

        </label>
    )
}