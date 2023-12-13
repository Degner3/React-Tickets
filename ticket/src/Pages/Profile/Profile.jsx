import style from "./Profile.module.scss"
import { NavLink } from 'react-router-dom'
import { Title } from "../../Components/Title/Title"
import { SecendTitle } from "../../Components/SecendTitle/SecendTitle"
import { UserContext } from "../../Context/UserContext"
import { useContext } from "react"




export const Profile = () => {

    const {setIsLoggedIn, user, setUser} = useContext(UserContext)

    console.log(user)

    const handleLogout = () => {
        localStorage.clear("user");
        setIsLoggedIn(false);
        setUser()
      };


    return (
      <section className={style.profilecontainer}>
        {user ? (
          <div className={style.profile}>
            <Title title="Velkommen " user={user.name} />
            <article>
              <SecendTitle secendtitle="Dine informationer" />
              <p>Navn: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Tlf: {user.phone}</p>
            </article>
            <div className={style.btncontainer}>
              <NavLink className={style.eventbtn} to="/bookings">
                Dine events
              </NavLink>

              <button className={style.logout} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className={style.profile}>
            <Title title="Du er ikke logget ind" />
            <div className={style.btncontainer1}>
              <NavLink className={style.logind} to="/login">Log ind</NavLink>
            </div>
          </div>
        )}
      </section>
    );

}