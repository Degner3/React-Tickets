import style from "./Title.module.scss"


// H1 på alle pages
export const Title = (props) => {
    
    return (
        <h1 className={style.title}>{props.title} {props.user}</h1>
    )
}