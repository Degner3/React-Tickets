import style from "./Footer.module.scss"
import { NavLink } from 'react-router-dom'



export const Footer = () => {
   
   
    return (
        <footer className={style.footer}>
            <div className={style.footerwrapper}>
                <ul>
                    <li><p>Adresse: </p></li>
                    <li><p>Kongens alle 23</p></li>
                    <li><p>Valby</p></li>
                </ul>
                <ul>
                    <li><p>Links:</p></li>
                    <li><NavLink>booking.nu</NavLink></li>
                    <li><NavLink>koncertpladser.dk</NavLink></li>
                </ul>
                <ul>
                    <li><p>Kontakt:</p></li>
                    <li><p>Mail: <NavLink>booki@it.dk</NavLink></p></li>
                    <li><p>Tlf: <NavLink>22331122</NavLink></p></li>
                </ul>
            </div>

        </footer>
    )

}