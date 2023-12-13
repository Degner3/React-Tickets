import style from "./Navigation.module.scss"
import { NavLink } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";


export const Navigation = () => {

    const navArray = [
        { Link: "/", page: "Oversigt" },
        { Link: "/bookings", page: "Bookings" },
        // { Link: "/create", page: "Opret ny event" },
        // { Link: "/login", page: "Login" },
        // { Link: "/signup", page: "Tilmeld" },
        // { Link: "/profile", page: "Profile" },
        { Link: "/login", page: <FaUserCircle /> },
        
      ];

    //   const activeStyle = ({isActive, isPending}) => {return {color: isActive ? "#D97852" : "", textDecoration: isActive ? "underline" : ""}}


    return (
      <nav className={style.nav}>
        <ul>
        {navArray.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.Link}
            //   style={activeStyle}
            >
              {item.page}
            </NavLink>
          </li>
        ))}
      </ul>
      </nav>
    );
}